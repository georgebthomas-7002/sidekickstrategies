import {redirect} from 'next/navigation'
import Link from 'next/link'
import {getPortalSession} from '@/app/lib/portal/auth'
import BillingContent from './BillingContent'

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
          View your deals, payment history, and account details for {session.companyName}.
        </p>
      </div>

      {/* Billing Content */}
      <BillingContent />

      {/* Help Section */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Have a billing question?</h3>
            <p className="text-gray-600 text-sm mb-3">
              Need a copy of an invoice, have payment questions, or want to discuss payment plans?
            </p>
            <a
              href={`mailto:hello@sidekickstrategies.com?subject=Billing Inquiry - ${session.companyName}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-primary/80"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Contact Our Team
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
