import {SignJWT, jwtVerify} from 'jose'
import {nanoid} from 'nanoid'
import {cookies} from 'next/headers'
import {createClient} from 'next-sanity'

// Portal JWT payload type
export interface PortalSession {
  contactId: string
  companyId: string
  email: string
  firstName: string
  lastName: string
  companyName: string
  clickupFolderId: string
  clickupListId: string
}

// Environment variables
const JWT_SECRET = process.env.PORTAL_JWT_SECRET || 'default-dev-secret-change-me'
const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3000/portal'

// Sanity client for portal session management (lazy-loaded to avoid build-time errors)
let _portalSanityClient: ReturnType<typeof createClient> | null = null

function getPortalSanityClient() {
  if (!_portalSanityClient) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

    if (!projectId || !dataset) {
      throw new Error('Sanity configuration missing: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET are required')
    }

    _portalSanityClient = createClient({
      projectId,
      dataset,
      apiVersion: '2025-09-25',
      useCdn: false, // Need fresh data for auth
      token: process.env.SANITY_API_READ_TOKEN,
    })
  }
  return _portalSanityClient
}

/**
 * Generate a magic link token and store it in Sanity
 */
export async function createMagicLinkToken(email: string, contactId: string, companyId: string): Promise<string> {
  const token = nanoid(32)
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

  // Store token in Sanity
  await getPortalSanityClient().create({
    _type: 'portalSession',
    token,
    email,
    contactId,
    companyId,
    expiresAt: expiresAt.toISOString(),
    used: false,
    createdAt: new Date().toISOString(),
  })

  return token
}

/**
 * Verify a magic link token from Sanity
 */
export async function verifyMagicLinkToken(token: string): Promise<{
  valid: boolean
  session?: {email: string; contactId: string; companyId: string}
  error?: string
}> {
  // Find the token in Sanity
  const query = `*[_type == "portalSession" && token == $token][0]{
    _id, email, contactId, companyId, expiresAt, used
  }`
  type SessionResult = {
    _id: string
    email: string
    contactId: string
    companyId: string
    expiresAt: string
    used: boolean
  } | null

  // Using type assertion to handle Sanity client's strict typing
  const params = {token} as Record<string, string>
  const session = await getPortalSanityClient().fetch<SessionResult>(query, params)

  if (!session) {
    return {valid: false, error: 'Invalid token'}
  }

  if (session.used) {
    return {valid: false, error: 'Token already used'}
  }

  if (new Date(session.expiresAt) < new Date()) {
    return {valid: false, error: 'Token expired'}
  }

  // Mark token as used
  await getPortalSanityClient().patch(session._id).set({used: true}).commit()

  return {
    valid: true,
    session: {
      email: session.email,
      contactId: session.contactId,
      companyId: session.companyId,
    },
  }
}

/**
 * Lookup HubSpot contact by email
 */
export async function lookupHubSpotContact(email: string): Promise<{
  found: boolean
  contact?: {
    id: string
    email: string
    firstName: string
    lastName: string
    portalEnabled: boolean
  }
  error?: string
}> {
  try {
    const res = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: email,
            }],
          }],
          properties: ['email', 'firstname', 'lastname', 'portal_enabled'],
        }),
      }
    )

    if (!res.ok) {
      return {found: false, error: 'HubSpot API error'}
    }

    const data = await res.json()

    if (data.total === 0) {
      return {found: false, error: 'Contact not found'}
    }

    const contact = data.results[0]
    const portalEnabled = contact.properties.portal_enabled === 'true'

    return {
      found: true,
      contact: {
        id: contact.id,
        email: contact.properties.email,
        firstName: contact.properties.firstname || '',
        lastName: contact.properties.lastname || '',
        portalEnabled,
      },
    }
  } catch {
    return {found: false, error: 'Network error'}
  }
}

/**
 * Get HubSpot company associated with a contact
 */
export async function getContactCompany(contactId: string): Promise<{
  found: boolean
  company?: {
    id: string
    name: string
    portalEnabled: boolean
    clickupFolderId: string
    clickupListId: string
  }
  error?: string
}> {
  try {
    // First get associations
    const assocRes = await fetch(
      `https://api.hubapi.com/crm/v4/objects/contacts/${contactId}/associations/companies`,
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
        },
      }
    )

    if (!assocRes.ok) {
      return {found: false, error: 'Could not fetch company associations'}
    }

    const assocData = await assocRes.json()

    if (!assocData.results || assocData.results.length === 0) {
      return {found: false, error: 'No company associated with this contact'}
    }

    const companyId = assocData.results[0].toObjectId

    // Get company details
    const compRes = await fetch(
      `https://api.hubapi.com/crm/v3/objects/companies/${companyId}?properties=name,portal_enabled,clickup_folder_id,clickup_list_id`,
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
        },
      }
    )

    if (!compRes.ok) {
      return {found: false, error: 'Could not fetch company details'}
    }

    const company = await compRes.json()
    const portalEnabled = company.properties.portal_enabled === 'true'

    return {
      found: true,
      company: {
        id: company.id,
        name: company.properties.name,
        portalEnabled,
        clickupFolderId: company.properties.clickup_folder_id || '',
        clickupListId: company.properties.clickup_list_id || '',
      },
    }
  } catch {
    return {found: false, error: 'Network error'}
  }
}

/**
 * Create a JWT for the portal session
 */
export async function createPortalJWT(session: PortalSession): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET)

  const jwt = await new SignJWT({
    ...session,
    iat: Math.floor(Date.now() / 1000),
  })
    .setProtectedHeader({alg: 'HS256'})
    .setExpirationTime('7d') // Token valid for 7 days
    .setIssuedAt()
    .sign(secret)

  return jwt
}

/**
 * Verify and decode a portal JWT
 */
export async function verifyPortalJWT(token: string): Promise<PortalSession | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const {payload} = await jwtVerify(token, secret)

    return payload as unknown as PortalSession
  } catch {
    return null
  }
}

/**
 * Get the current portal session from cookies
 */
export async function getPortalSession(): Promise<PortalSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('portal_session')?.value

  if (!token) {
    return null
  }

  return verifyPortalJWT(token)
}

/**
 * Set the portal session cookie
 */
export async function setPortalSessionCookie(jwt: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('portal_session', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  })
}

/**
 * Clear the portal session cookie
 */
export async function clearPortalSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('portal_session')
}

/**
 * Update last login timestamp in HubSpot
 */
export async function updateLastLogin(contactId: string): Promise<void> {
  try {
    await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            portal_last_login: new Date().toISOString().split('T')[0], // Just the date
          },
        }),
      }
    )
  } catch {
    // Non-critical, just log
    console.error('Failed to update last login')
  }
}

/**
 * Generate the magic link URL
 */
export function getMagicLinkUrl(token: string): string {
  return `${PORTAL_URL}/verify?token=${token}`
}
