import {redirect} from 'next/navigation'

/**
 * Portal root - redirects to dashboard (which will redirect to login if not authenticated)
 */
export default function PortalPage() {
  redirect('/portal/dashboard')
}
