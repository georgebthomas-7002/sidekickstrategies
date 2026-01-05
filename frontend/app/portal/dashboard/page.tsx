import {redirect} from 'next/navigation'
import Link from 'next/link'
import {getPortalSession} from '@/app/lib/portal/auth'

export default async function PortalDashboardPage() {
  const session = await getPortalSession()

  if (!session) {
    redirect('/portal/login')
  }

  // Get first name for greeting
  const firstName = session.firstName || 'there'

  // Get current time for dynamic greeting
  const hour = new Date().getHours()
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <>
      <style>{`
        .action-card {
          background: white;
          border-radius: 0.75rem;
          padding: 1.5rem;
          border: 2px solid transparent;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .action-card:hover {
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.08);
        }
        .action-card.orange:hover { border-color: #f65625; }
        .action-card.teal:hover { border-color: #028393; }
        .action-card.peach:hover { border-color: #faaa68; }
        .action-card.navy:hover { border-color: #142d63; }
        .action-card .arrow {
          transition: transform 0.2s ease;
        }
        .action-card:hover .arrow {
          transform: translateX(4px);
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-10">
          <p style={{fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#028393', fontFamily: 'Montserrat, sans-serif', fontWeight: 500}}>
            {timeGreeting}
          </p>
          <h1 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem', fontFamily: '"Palatino Linotype", Palatino, Georgia, serif', color: '#142d63', lineHeight: 1.1}}>
            Welcome back, {firstName}
          </h1>
          <p style={{fontSize: '1.125rem', fontFamily: '"PT Sans", sans-serif', color: '#3d5a80', lineHeight: 1.6}}>
            Here&apos;s an overview of your partnership with Sidekick Strategies.
          </p>
        </div>

        {/* Company Badge */}
        <div className="rounded-2xl p-8 mb-10 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #142d63 0%, #1e3561 100%)'}}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{background: '#faaa68', opacity: 0.1, transform: 'translate(30%, -30%)'}} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full" style={{background: '#028393', opacity: 0.1, transform: 'translate(-30%, 30%)'}} />

          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{backgroundColor: 'rgba(255,255,255,0.15)'}}>
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>
                {session.companyName}
              </h2>
              <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontFamily: '"PT Sans", sans-serif'}}>
                {session.email}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Ask for Help Card */}
          <Link href="/portal/help" className="action-card orange block">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{backgroundColor: '#fff5f0'}}>
                <svg className="w-7 h-7" style={{color: '#f65625'}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 style={{fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem', fontFamily: 'Montserrat, sans-serif', color: '#142d63'}}>
                  Ask for Help
                </h3>
                <p style={{fontSize: '0.875rem', lineHeight: 1.6, fontFamily: '"PT Sans", sans-serif', color: '#3d5a80'}}>
                  Need assistance? Submit a request and our team will get back to you.
                </p>
              </div>
              <svg className="w-5 h-5 arrow" style={{color: '#f65625'}} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Link>

          {/* View Projects Card */}
          <Link href="/portal/projects" className="action-card teal block">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{backgroundColor: '#e6f7f9'}}>
                <svg className="w-7 h-7" style={{color: '#028393'}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 style={{fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem', fontFamily: 'Montserrat, sans-serif', color: '#142d63'}}>
                  View Projects
                </h3>
                <p style={{fontSize: '0.875rem', lineHeight: 1.6, fontFamily: '"PT Sans", sans-serif', color: '#3d5a80'}}>
                  See the status of your projects and track progress in real-time.
                </p>
              </div>
              <svg className="w-5 h-5 arrow" style={{color: '#028393'}} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Link>

          {/* Billing Card */}
          <Link href="/portal/billing" className="action-card peach block">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{backgroundColor: '#fef3e6'}}>
                <svg className="w-7 h-7" style={{color: '#faaa68'}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 style={{fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem', fontFamily: 'Montserrat, sans-serif', color: '#142d63'}}>
                  Billing & Invoices
                </h3>
                <p style={{fontSize: '0.875rem', lineHeight: 1.6, fontFamily: '"PT Sans", sans-serif', color: '#3d5a80'}}>
                  View your invoices, payment history, and account details.
                </p>
              </div>
              <svg className="w-5 h-5 arrow" style={{color: '#faaa68'}} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Link>

          {/* Schedule Meeting Card */}
          <Link href="/portal/meetings" className="action-card navy block">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{backgroundColor: '#f0f4fa'}}>
                <svg className="w-7 h-7" style={{color: '#142d63'}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 style={{fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem', fontFamily: 'Montserrat, sans-serif', color: '#142d63'}}>
                  Schedule Meeting
                </h3>
                <p style={{fontSize: '0.875rem', lineHeight: 1.6, fontFamily: '"PT Sans", sans-serif', color: '#3d5a80'}}>
                  Book time with the Sidekick team for a call or strategy session.
                </p>
              </div>
              <svg className="w-5 h-5 arrow" style={{color: '#142d63'}} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-8 border border-gray-100" style={{boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
          <div className="flex items-center justify-between mb-6">
            <h3 style={{fontSize: '1.25rem', fontWeight: 600, fontFamily: 'Montserrat, sans-serif', color: '#142d63'}}>
              Recent Activity
            </h3>
            <span style={{fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: '#e0fbfc', color: '#028393', fontFamily: 'Montserrat, sans-serif', fontWeight: 500}}>
              Coming Soon
            </span>
          </div>
          <div className="text-center py-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#e0fbfc'}}>
              <svg className="w-8 h-8" style={{color: '#028393'}} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <p style={{fontSize: '1rem', marginBottom: '0.5rem', fontFamily: '"PT Sans", sans-serif', color: '#142d63'}}>
              No recent activity to show
            </p>
            <p style={{fontSize: '0.875rem', fontFamily: '"PT Sans", sans-serif', color: '#3d5a80'}}>
              Activity will appear here once you start using the portal.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
