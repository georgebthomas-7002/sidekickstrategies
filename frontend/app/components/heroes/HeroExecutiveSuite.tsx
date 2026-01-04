/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Executive Suite
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Ultra-Premium, Sophisticated, Luxurious
 * AESTHETIC: Dark elegance with peach/gold accents, refined details
 * BEST FOR: Executive services, luxury brands, high-end consulting, finance
 *
 * FEATURES:
 * - Deep dark background with subtle texture
 * - Peach/gold accents for warmth and luxury
 * - Ultra-refined typography with generous spacing
 * - Subtle pattern overlays
 * - Elegant micro-interactions
 * - Border accents and fine lines
 * - Premium card elements with soft shadows
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
  navy900: '#0f2250',
  navy950: '#0a1633',
  orange500: '#f65625',
  teal500: '#028393',
  peach: '#faaa68',
}

interface HeroExecutiveSuiteProps {
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
}

export default function HeroExecutiveSuite({
  headline = "Excellence, delivered",
  subheadline = "Trusted by industry leaders to navigate complexity with discretion and precision. Your success is our legacy.",
  primaryCta = { label: "Schedule a consultation", href: "/contact" },
  secondaryCta = { label: "Our expertise", href: "/services" },
}: HeroExecutiveSuiteProps) {
  const [mounted, setMounted] = useState(false)
  const [primaryHover, setPrimaryHover] = useState(false)
  const [secondaryHover, setSecondaryHover] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
      style={{
        background: 'linear-gradient(180deg, #0a1633 0%, #142d63 50%, #0f2250 100%)',
      }}
    >
      {/* Sophisticated pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23faaa68' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,22,51,0.4) 100%)',
        }}
      />

      {/* Golden accent lines */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left corner accent */}
        <div
          className={`
            absolute top-0 left-0 w-32 h-[1px]
            bg-gradient-to-r from-peach to-transparent
            transition-all duration-1000 delay-500
            ${mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
          `}
          style={{ transformOrigin: 'left' }}
        />
        <div
          className={`
            absolute top-0 left-0 w-[1px] h-32
            bg-gradient-to-b from-peach to-transparent
            transition-all duration-1000 delay-500
            ${mounted ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}
          `}
          style={{ transformOrigin: 'top' }}
        />

        {/* Bottom right corner accent */}
        <div
          className={`
            absolute bottom-0 right-0 w-48 h-[1px]
            bg-gradient-to-l from-peach/60 to-transparent
            transition-all duration-1000 delay-700
            ${mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
          `}
          style={{ transformOrigin: 'right' }}
        />
        <div
          className={`
            absolute bottom-0 right-0 w-[1px] h-48
            bg-gradient-to-t from-peach/60 to-transparent
            transition-all duration-1000 delay-700
            ${mounted ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}
          `}
          style={{ transformOrigin: 'bottom' }}
        />

        {/* Floating golden orb - very subtle */}
        <div
          className={`
            absolute top-1/4 right-1/4 w-96 h-96
            rounded-full
            bg-peach/5
            blur-[100px]
            transition-all duration-[2000ms]
            ${mounted ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Refined eyebrow */}
            <div
              className={`
                flex items-center gap-6 mb-12
                transition-all duration-700
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-peach" />
                <div className="w-1 h-1 rounded-full bg-peach/50" />
                <div className="w-1 h-1 rounded-full bg-peach/30" />
              </div>
              <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-peach/80">
                Sidekick Strategies
              </span>
            </div>

            {/* Premium headline */}
            <h1
              className={`
                font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                text-white leading-[1.05] tracking-tight
                transition-all duration-1000 delay-100
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              {headline.split(' ').map((word, i) => (
                <span
                  key={i}
                  className={`
                    inline-block
                    ${word.includes(',') ? 'text-peach' : ''}
                  `}
                >
                  {word}{' '}
                </span>
              ))}
            </h1>

            {/* Elegant divider */}
            <div
              className={`
                mt-10 flex items-center gap-4
                transition-all duration-700 delay-300
                ${mounted ? 'opacity-100' : 'opacity-0'}
              `}
            >
              <div className="w-16 h-[1px] bg-gradient-to-r from-peach to-peach/30" />
              <div className="w-1.5 h-1.5 rotate-45 border border-peach/50" />
            </div>

            {/* Subheadline */}
            <p
              className={`
                mt-8 font-sans text-lg md:text-xl text-gray-400
                max-w-xl leading-relaxed
                transition-all duration-700 delay-400
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              {subheadline}
            </p>

            {/* Premium CTAs */}
            <div
              className={`
                mt-14 flex flex-col sm:flex-row gap-6
                transition-all duration-700 delay-500
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              <a
                href={primaryCta.href}
                className="
                  group relative inline-flex items-center justify-center
                  px-10 py-5
                  overflow-hidden
                  font-heading text-sm tracking-[0.15em] uppercase
                  text-white
                  transition-all duration-500
                "
                style={{
                  backgroundColor: COLORS.orange500,
                  boxShadow: primaryHover ? `0 10px 25px -5px ${COLORS.orange500}40` : 'none',
                }}
                onMouseEnter={() => setPrimaryHover(true)}
                onMouseLeave={() => setPrimaryHover(false)}
              >
                <span className="relative z-10">{primaryCta.label}</span>
              </a>

              <a
                href={secondaryCta.href}
                className="
                  group inline-flex items-center gap-3
                  px-2 py-5
                  font-heading text-sm tracking-[0.15em] uppercase
                  transition-all duration-300
                "
                style={{
                  color: COLORS.orange500,
                  opacity: secondaryHover ? 1 : 0.9,
                }}
                onMouseEnter={() => setSecondaryHover(true)}
                onMouseLeave={() => setSecondaryHover(false)}
              >
                {secondaryCta.label}
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right side - Premium testimonial/trust card */}
          <div className="hidden lg:block lg:col-span-5">
            <div
              className={`
                relative
                transition-all duration-1000 delay-600
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
            >
              {/* Premium card */}
              <div
                className="
                  relative p-10
                  bg-gradient-to-br from-white/[0.03] to-transparent
                  border border-white/[0.08]
                  backdrop-blur-sm
                "
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-[1px] bg-peach/40" />
                <div className="absolute top-0 left-0 h-6 w-[1px] bg-peach/40" />
                <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-peach/40" />
                <div className="absolute bottom-0 right-0 h-6 w-[1px] bg-peach/40" />

                {/* Quote mark */}
                <div className="mb-6">
                  <svg
                    className="w-10 h-10 text-peach/30"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial text */}
                <blockquote className="font-serif text-xl text-white/80 leading-relaxed italic">
                  "Their strategic insight transformed our approach entirely. A true partnership."
                </blockquote>

                {/* Attribution */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-peach/20 to-secondary-500/20 flex items-center justify-center">
                    <span className="font-serif text-lg text-peach">JM</span>
                  </div>
                  <div>
                    <div className="font-heading text-sm text-white tracking-wide">James Mitchell</div>
                    <div className="font-mono text-[10px] text-gray-500 tracking-wider uppercase">CEO, Apex Holdings</div>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="mt-10 pt-8 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="font-serif text-2xl text-peach">50+</div>
                      <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">Fortune 500</div>
                    </div>
                    <div className="w-[1px] h-10 bg-white/[0.06]" />
                    <div className="text-center">
                      <div className="font-serif text-2xl text-peach">$2B+</div>
                      <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">Value Created</div>
                    </div>
                    <div className="w-[1px] h-10 bg-white/[0.06]" />
                    <div className="text-center">
                      <div className="font-serif text-2xl text-peach">20</div>
                      <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">Years</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium bottom bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-peach/20 to-transparent" />
        <div className="h-12 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </section>
  )
}
