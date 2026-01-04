import Link from 'next/link'
import Image from 'next/image'
import BackToTop from './BackToTop'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <BackToTop />
      <footer style={{backgroundColor: '#142d63'}}>
        <div className="container">
          {/* Main Footer Content */}
          <div className="py-16 border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              {/* Logo & Tagline */}
              <div className="flex flex-col gap-4">
                <Link href="/" className="inline-block">
                  <Image
                    src="/images/sidekick-logo-2026.png"
                    alt="Sidekick Strategies"
                    width={200}
                    height={50}
                    className="h-10 w-auto brightness-0 invert"
                  />
                </Link>
                <p
                  className="font-serif text-lg max-w-xs"
                  style={{color: 'rgba(255, 255, 255, 0.7)'}}
                >
                  Your sidekick in the HubSpot journey.
                </p>
              </div>

              {/* Quick Links - Placeholder for future expansion */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
                <div>
                  <h4
                    className="font-heading text-xs uppercase tracking-widest mb-4"
                    style={{color: '#f65625'}}
                  >
                    Connect
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="mailto:hello@sidekickstrategies.com"
                        className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-200"
                      >
                        hello@sidekickstrategies.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="font-mono text-xs"
              style={{color: 'rgba(255, 255, 255, 0.5)'}}
            >
              © {currentYear} Sidekick Strategies. All rights reserved.
            </p>
            <p
              className="font-mono text-xs"
              style={{color: 'rgba(255, 255, 255, 0.3)'}}
            >
              Value First Humans
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
