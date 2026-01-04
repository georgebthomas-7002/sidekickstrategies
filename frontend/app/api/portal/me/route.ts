import {NextResponse} from 'next/server'
import {getPortalSession} from '@/app/lib/portal/auth'

export async function GET() {
  try {
    const session = await getPortalSession()

    if (!session) {
      return NextResponse.json({error: 'Not authenticated'}, {status: 401})
    }

    return NextResponse.json({
      email: session.email,
      firstName: session.firstName,
      lastName: session.lastName,
      companyName: session.companyName,
      companyId: session.companyId,
      contactId: session.contactId,
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json({error: 'Failed to get user'}, {status: 500})
  }
}
