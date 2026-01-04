'use client'

import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'

/**
 * Portal Layout - Separate from main site layout
 * No main site header/footer - uses portal-specific navigation
 */
export default function PortalLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname()

  // Public routes don't show sidebar (login, verify)
  const isPublicRoute = pathname === '/portal/login' || pathname?.startsWith('/portal/verify')

  if (isPublicRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 via-white to-brand-secondary/5">
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Portal Header */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-gray-200">
        <div className="flex h-full items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/portal/dashboard" className="flex items-center gap-2">
              <Image
                src="/images/sidekick-logo-2026.png"
                alt="Sidekick Strategies"
                width={160}
                height={40}
                className="h-8 w-auto"
              />
              <span className="hidden sm:inline-block text-sm font-medium text-gray-500 border-l border-gray-300 pl-4 ml-2">
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
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto hidden lg:block">
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
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${isActive
                ? 'bg-brand-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {item.icon}
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

function PortalUserMenu() {
  return (
    <div className="flex items-center gap-3">
      <form action="/api/portal/auth/logout" method="POST">
        <button
          type="submit"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Sign Out
        </button>
      </form>
      <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-medium">
        ?
      </div>
    </div>
  )
}

function MobileNav() {
  const pathname = usePathname()

  const mobileNavItems = [
    { name: 'Home', href: '/portal/dashboard', icon: 'M2.25 12l8.954-8.955...' },
    { name: 'Help', href: '/portal/help', icon: 'M9.879 7.519...' },
    { name: 'Projects', href: '/portal/projects', icon: 'M9 12h3.75...' },
    { name: 'Billing', href: '/portal/billing', icon: 'M2.25 8.25...' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around py-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 text-xs
                ${isActive ? 'text-brand-primary' : 'text-gray-500'}
              `}
            >
              <div className="w-6 h-6 rounded-full bg-current/10 flex items-center justify-center">
                <span className="text-xs">{item.name[0]}</span>
              </div>
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
