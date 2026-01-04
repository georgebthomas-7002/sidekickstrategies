import {NextRequest, NextResponse} from 'next/server'
import {Resend} from 'resend'
import {
  lookupHubSpotContact,
  getContactCompany,
  createMagicLinkToken,
  getMagicLinkUrl,
} from '@/app/lib/portal/auth'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const {email} = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({error: 'Email is required'}, {status: 400})
    }

    const normalizedEmail = email.toLowerCase().trim()

    // 1. Look up contact in HubSpot
    const contactResult = await lookupHubSpotContact(normalizedEmail)

    if (!contactResult.found || !contactResult.contact) {
      // Don't reveal if email exists - always show same message
      return NextResponse.json({
        message: 'If this email is registered, you will receive a login link shortly.',
      })
    }

    // 2. Check if portal is enabled for this contact
    if (!contactResult.contact.portalEnabled) {
      // Don't reveal that portal is disabled
      return NextResponse.json({
        message: 'If this email is registered, you will receive a login link shortly.',
      })
    }

    // 3. Get associated company and check company portal access
    const companyResult = await getContactCompany(contactResult.contact.id)

    if (!companyResult.found || !companyResult.company) {
      // No company associated
      return NextResponse.json({
        message: 'If this email is registered, you will receive a login link shortly.',
      })
    }

    if (!companyResult.company.portalEnabled) {
      // Company doesn't have portal enabled
      return NextResponse.json({
        message: 'If this email is registered, you will receive a login link shortly.',
      })
    }

    // 4. Create magic link token
    const token = await createMagicLinkToken(
      normalizedEmail,
      contactResult.contact.id,
      companyResult.company.id
    )

    const magicLinkUrl = getMagicLinkUrl(token)

    // 5. Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Sidekick Strategies <george@georgebthomas.com>',
          to: normalizedEmail,
          subject: 'Your Sidekick Strategies Portal Login Link',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://sidekickstrategies.com/images/sidekick-logo-2026.png" alt="Sidekick Strategies" style="height: 50px; width: auto;">
              </div>

              <h1 style="color: #142d63; font-size: 24px; text-align: center; margin-bottom: 20px;">
                Sign in to Your Portal
              </h1>

              <p style="margin-bottom: 20px;">
                Hi ${contactResult.contact.firstName || 'there'},
              </p>

              <p style="margin-bottom: 30px;">
                Click the button below to sign in to your Sidekick Strategies client portal. This link will expire in 15 minutes.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${magicLinkUrl}" style="display: inline-block; background-color: #142d63; color: white; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: 600;">
                  Sign In to Portal
                </a>
              </div>

              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                If you didn't request this login link, you can safely ignore this email.
              </p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

              <p style="color: #999; font-size: 12px; text-align: center;">
                &copy; ${new Date().getFullYear()} Sidekick Strategies. All rights reserved.
              </p>
            </body>
            </html>
          `,
        })
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        return NextResponse.json({error: 'Failed to send login email. Please try again.'}, {status: 500})
      }
    } else {
      // Development mode - log the magic link
      console.log('\n========================================')
      console.log('MAGIC LINK (dev mode):')
      console.log(magicLinkUrl)
      console.log('========================================\n')
    }

    return NextResponse.json({
      message: 'If this email is registered, you will receive a login link shortly.',
    })
  } catch (error) {
    console.error('Magic link request error:', error)
    return NextResponse.json({error: 'Something went wrong. Please try again.'}, {status: 500})
  }
}
