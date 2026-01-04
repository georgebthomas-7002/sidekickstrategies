import {redirect} from 'next/navigation'
import Link from 'next/link'
import {getPortalSession} from '@/app/lib/portal/auth'

export default async function BillingPage() {
  const session = await getPortalSession()

  if (!session) {
    redirect('/portal/login')
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/portal/dashboard"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Invoices</h1>
        <p className="text-gray-600">
          View your invoices, payment history, and account details.
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Billing Coming Soon</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We're working on bringing your billing information directly to the portal.
          In the meantime, please contact us for any billing inquiries.
        </p>
        <a
          href="mailto:hello@sidekickstrategies.com?subject=Billing Inquiry - {session.companyName}"
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white
            bg-brand-primary hover:bg-brand-primary/90 transition-colors
          "
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          Contact About Billing
        </a>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Need an Invoice?</h4>
          <p className="text-gray-600 text-sm">
            We can send you a copy of any invoice. Just reach out and let us know which ones you need.
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Payment Questions?</h4>
          <p className="text-gray-600 text-sm">
            For questions about payments, payment methods, or payment plans, please contact our team.
          </p>
        </div>
      </div>
    </div>
  )
}
