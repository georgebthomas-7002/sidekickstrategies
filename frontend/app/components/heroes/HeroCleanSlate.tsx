/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Clean Slate
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Minimalist, Typography-Focused
 * AESTHETIC: Restrained elegance through perfect proportions and whitespace
 * BEST FOR: Professional services, consulting, high-trust industries
 *
 * FEATURES:
 * - Generous whitespace with intentional breathing room
 * - Serif headline for timeless sophistication
 * - Single accent color used sparingly
 * - No decorative elements - typography IS the design
 * - Subtle entrance animation
 *
 * NOTE: Uses inline styles for brand colors to prevent Tailwind v4 purging
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

'use client'

import { useEffect, useState } from 'react'

// Brand color constants (prevents Tailwind purging)
const COLORS = {
  navy800: '#142d63',
  orange500: '#f65625',
  teal500: '#028393',
}

interface HeroCleanSlateProps {
  headline?: string
  subheadline?: string
  primaryCta?: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  showBadge?: boolean
}

export default function HeroCleanSlate({
  headline = "Strategy that moves you forward",
  subheadline = "We partner with ambitious organizations to solve complex challenges and unlock sustainable growth.",
  primaryCta = { label: "Start a conversation", href: "/contact" },
  secondaryCta = { label: "Our approach", href: "/about" },
  showBadge = true,
}: HeroCleanSlateProps) {
  const [mounted, setMounted] = useState(false)
  const [primaryHover, setPrimaryHover] = useState(false)
  const [secondaryHover, setSecondaryHover] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-white overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-20"
        style={{
          background: `linear-gradient(to right, transparent, ${COLORS.navy800}, transparent)`,
        }}
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          {showBadge && (
            <div
              className={`
                mb-8 transition-all duration-700 ease-out
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <span
                className="font-mono text-sm tracking-[0.2em] uppercase"
                style={{ color: COLORS.teal500 }}
              >
                Sidekick Strategies
              </span>
            </div>
          )}

          {/* Headline */}
          <h1
            className={`
              font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              leading-[1.1] tracking-tight
              transition-all duration-700 delay-100 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ color: COLORS.navy800 }}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={`
              mt-8 md:mt-10 font-sans text-lg md:text-xl text-gray-600
              max-w-2xl leading-relaxed
              transition-all duration-700 delay-200 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            {subheadline}
          </p>

          {/* CTAs */}
          <div
            className={`
              mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6
              transition-all duration-700 delay-300 ease-out
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            <a
              href={primaryCta.href}
              className="
                inline-flex items-center justify-center
                px-8 py-4
                text-white
                font-heading text-sm tracking-wide uppercase
                transition-all duration-300
              "
              style={{
                backgroundColor: COLORS.orange500,
                boxShadow: primaryHover ? `0 10px 25px -5px ${COLORS.orange500}40` : 'none',
              }}
              onMouseEnter={() => setPrimaryHover(true)}
              onMouseLeave={() => setPrimaryHover(false)}
            >
              {primaryCta.label}
            </a>

            <a
              href={secondaryCta.href}
              className="
                inline-flex items-center justify-center
                px-8 py-4
                font-heading text-sm tracking-wide uppercase
                transition-all duration-300
              "
              style={{
                color: COLORS.orange500,
                borderBottom: secondaryHover ? `2px solid ${COLORS.orange500}` : '2px solid transparent',
              }}
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
            >
              {secondaryCta.label}
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`
          absolute bottom-24 left-12 md:left-24 w-16 h-[1px]
          transition-all duration-1000 delay-500
          ${mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
        `}
        style={{ backgroundColor: COLORS.orange500, transformOrigin: 'left' }}
      />
    </section>
  )
}
