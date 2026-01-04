import {NextRequest, NextResponse} from 'next/server'
import {
  verifyMagicLinkToken,
  lookupHubSpotContact,
  getContactCompany,
  createPortalJWT,
  setPortalSessionCookie,
  updateLastLogin,
  PortalSession,
} from '@/app/lib/portal/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token')

    if (!token) {
      return NextResponse.json({error: 'Token is required'}, {status: 400})
    }

    // 1. Verify the magic link token
    const tokenResult = await verifyMagicLinkToken(token)

    if (!tokenResult.valid || !tokenResult.session) {
      return NextResponse.json({error: tokenResult.error || 'Invalid token'}, {status: 400})
    }

    // 2. Fetch fresh contact and company data from HubSpot
    const contactResult = await lookupHubSpotContact(tokenResult.session.email)

    if (!contactResult.found || !contactResult.contact) {
      return NextResponse.json({error: 'Contact not found'}, {status: 400})
    }

    if (!contactResult.contact.portalEnabled) {
      return NextResponse.json({error: 'Portal access not enabled for this contact'}, {status: 403})
    }

    const companyResult = await getContactCompany(contactResult.contact.id)

    if (!companyResult.found || !companyResult.company) {
      return NextResponse.json({error: 'No company associated with this contact'}, {status: 400})
    }

    if (!companyResult.company.portalEnabled) {
      return NextResponse.json({error: 'Portal access not enabled for this company'}, {status: 403})
    }

    if (!companyResult.company.clickupFolderId) {
      return NextResponse.json({error: 'Company not fully configured for portal access'}, {status: 400})
    }

    // 3. Create session payload
    const sessionData: PortalSession = {
      contactId: contactResult.contact.id,
      companyId: companyResult.company.id,
      email: contactResult.contact.email,
      firstName: contactResult.contact.firstName,
      lastName: contactResult.contact.lastName,
      companyName: companyResult.company.name,
      clickupFolderId: companyResult.company.clickupFolderId,
      clickupListId: companyResult.company.clickupListId,
    }

    // 4. Create JWT and set cookie
    const jwt = await createPortalJWT(sessionData)
    await setPortalSessionCookie(jwt)

    // 5. Update last login timestamp (non-blocking)
    updateLastLogin(contactResult.contact.id).catch(console.error)

    return NextResponse.json({
      success: true,
      user: {
        email: sessionData.email,
        firstName: sessionData.firstName,
        lastName: sessionData.lastName,
        companyName: sessionData.companyName,
      },
    })
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json({error: 'Verification failed'}, {status: 500})
  }
}
