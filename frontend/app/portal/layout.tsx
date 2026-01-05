'use client'

import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'

// Brand colors as constants to prevent Tailwind purging
const COLORS = {
  navy800: '#142d63',
  navy700: '#1e3561',
  navy600: '#2a4578',
  navy900: '#0f2250',
  teal500: '#028393',
  teal600: '#026d7a',
  orange500: '#f65625',
  peach: '#faaa68',
  cream: '#e0fbfc',
}

/**
 * Portal Layout - Premium Sidekick Brand Design
 * Navy sidebar, refined header, professional dashboard experience
 */
export default function PortalLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname()

  // Public routes don't show sidebar (login, verify)
  const isPublicRoute = pathname === '/portal/login' || pathname?.startsWith('/portal/verify')

  if (isPublicRoute) {
    return (
      <div className="min-h-screen" style={{background: `linear-gradient(135deg, ${COLORS.cream} 0%, white 50%, rgba(2, 131, 147, 0.05) 100%)`}}>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Portal Header - Clean white with subtle shadow */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white shadow-sm">
        <div className="flex h-full items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/portal/dashboard" className="flex items-center gap-3">
              <Image
                src="/images/sidekick-logo-2026.png"
                alt="Sidekick Strategies"
                width={180}
                height={45}
                className="h-9 w-auto"
                priority
              />
              <span className="hidden sm:inline-flex items-center text-xs font-heading font-medium uppercase tracking-widest border-l pl-4 ml-1" style={{color: COLORS.teal500, borderColor: '#e5e7eb'}}>
                Client Portal
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <PortalUserMenu />
          </div>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex pt-16">
        {/* Sidebar - Navy branded */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 overflow-y-auto hidden lg:block" style={{backgroundColor: COLORS.navy800}}>
          <PortalSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-[calc(100vh-4rem)]">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}

function PortalSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Dashboard',
      href: '/portal/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      name: 'Ask for Help',
      href: '/portal/help',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      ),
    },
    {
      name: 'Projects',
      href: '/portal/projects',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
      ),
    },
    {
      name: 'Billing',
      href: '/portal/billing',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>
      ),
    },
    {
      name: 'Schedule Meeting',
      href: '/portal/meetings',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="p-4 space-y-1">
      {/* Portal branding in sidebar */}
      <div className="px-3 py-4 mb-4 border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        <p className="text-xs font-heading font-medium uppercase tracking-widest" style={{color: COLORS.peach}}>
          Navigation
        </p>
      </div>

      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-heading font-medium transition-all duration-200"
            style={{
              backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
              borderLeft: isActive ? `3px solid ${COLORS.orange500}` : '3px solid transparent',
            }}
          >
            <span style={{color: isActive ? COLORS.peach : 'rgba(255,255,255,0.5)'}}>
              {item.icon}
            </span>
            {item.name}
          </Link>
        )
      })}

      {/* Help section at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        <div className="rounded-lg p-4" style={{backgroundColor: 'rgba(255,255,255,0.05)'}}>
          <p className="text-xs font-heading font-medium mb-2" style={{color: 'rgba(255,255,255,0.9)'}}>
            Need assistance?
          </p>
          <p className="text-xs mb-3" style={{color: 'rgba(255,255,255,0.5)'}}>
            Our team is here to help.
          </p>
          <a
            href="mailto:george@georgebthomas.com"
            className="inline-flex items-center gap-2 text-xs font-heading font-medium transition-colors"
            style={{color: COLORS.peach}}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </nav>
  )
}

function PortalUserMenu() {
  return (
    <div className="flex items-center gap-4">
      <form action="/api/portal/auth/logout" method="POST">
        <button
          type="submit"
          className="text-sm font-heading font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
          style={{color: COLORS.navy800}}
        >
          Sign Out
        </button>
      </form>
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-heading font-semibold text-white shadow-md" style={{backgroundColor: COLORS.teal500}}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </div>
    </div>
  )
}

function MobileNav() {
  const pathname = usePathname()

  const mobileNavItems = [
    {
      name: 'Home',
      href: '/portal/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      name: 'Help',
      href: '/portal/help',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      ),
    },
    {
      name: 'Projects',
      href: '/portal/projects',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
      ),
    },
    {
      name: 'Billing',
      href: '/portal/billing',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg">
      <div className="flex justify-around py-2 px-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors"
              style={{
                color: isActive ? COLORS.navy800 : '#9ca3af',
                backgroundColor: isActive ? 'rgba(20, 45, 99, 0.05)' : 'transparent',
              }}
            >
              <span style={{color: isActive ? COLORS.teal500 : '#9ca3af'}}>
                {item.icon}
              </span>
              <span className="text-xs font-heading font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
