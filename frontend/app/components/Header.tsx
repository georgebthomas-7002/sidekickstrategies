import Link from 'next/link'
import Image from 'next/image'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <Image
              src="/images/sidekick-logo-2026.png"
              alt={settings?.title || 'Sidekick Strategies'}
              width={320}
              height={80}
              className="h-14 sm:h-18 w-auto"
              priority
            />
          </Link>

          <Link
            href="/portal/login"
            className="rounded-full font-mono text-sm bg-secondary-500 text-white hover:bg-secondary-600 py-2.5 px-6 transition-colors duration-200"
          >
            Client Portal
          </Link>
        </div>
      </div>
    </header>
  )
}
