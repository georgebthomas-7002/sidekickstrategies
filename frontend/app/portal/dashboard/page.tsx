import {redirect} from 'next/navigation'
import Link from 'next/link'
import {getPortalSession} from '@/app/lib/portal/auth'

export default async function PortalDashboardPage() {
  const session = await getPortalSession()

  if (!session) {
    redirect('/portal/login')
  }

  // Get first name for greeting
  const greeting = session.firstName ? `Welcome back, ${session.firstName}!` : 'Welcome back!'

  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{greeting}</h1>
        <p className="text-gray-600">
          Here&apos;s an overview of your account with Sidekick Strategies.
        </p>
      </div>

      {/* Company Badge */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{session.companyName}</h2>
            <p className="text-white/80 text-sm">{session.email}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Ask for Help Card */}
        <Link
          href="/portal/help"
          className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-brand-primary hover:shadow-lg transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-accent/10 text-brand-accent rounded-lg flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Ask for Help</h3>
              <p className="text-gray-600 text-sm">
                Need assistance? Submit a request and our team will get back to you.
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </Link>

        {/* View Projects Card */}
        <Link
          href="/portal/projects"
          className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-brand-primary hover:shadow-lg transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-secondary/10 text-brand-secondary rounded-lg flex items-center justify-center group-hover:bg-brand-secondary group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">View Projects</h3>
              <p className="text-gray-600 text-sm">
                See the status of your projects and track progress.
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </Link>

        {/* Billing Card */}
        <Link
          href="/portal/billing"
          className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-brand-primary hover:shadow-lg transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Billing & Invoices</h3>
              <p className="text-gray-600 text-sm">
                View your invoices, payment history, and account details.
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </Link>

        {/* Schedule Meeting Card */}
        <Link
          href="/portal/meetings"
          className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-brand-primary hover:shadow-lg transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Schedule Meeting</h3>
              <p className="text-gray-600 text-sm">
                Book time with the Sidekick team for a call or consultation.
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Recent Activity (placeholder) */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <p>No recent activity to show.</p>
          <p className="text-sm mt-1">Activity will appear here once you start using the portal.</p>
        </div>
      </div>
    </div>
  )
}
