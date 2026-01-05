/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Executive Suite
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Ultra-Premium Luxury - Refined Opulence
 * AESTHETIC: Deep dark elegance with peach/gold accents, bespoke details
 * BEST FOR: Executive services, luxury brands, high-end consulting, finance
 *
 * DESIGN PHILOSOPHY:
 * "Understated excellence" - Every detail whispers quality. The dark
 * background provides gravitas while warm peach/gold accents suggest
 * prosperity and success. This is a hero for those who have arrived.
 *
 * FEATURES:
 * - Deep navy-black gradient background
 * - Sophisticated peach/gold accent system
 * - Corner accent lines with elegant animation
 * - Premium testimonial card with glass effect
 * - Trust indicators (Fortune 500, Value Created, Years)
 * - Ultra-refined typography with generous tracking
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
  navy1000: '#060d1a',
  orange500: '#f65625',
  orangeHover: '#d9441a',
  teal500: '#028393',
  peach: '#faaa68',
  gold: '#d4a84b',
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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Standard hydration safety pattern
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
      style={{
        background: `linear-gradient(180deg, ${COLORS.navy1000} 0%, ${COLORS.navy950} 30%, ${COLORS.navy900} 70%, ${COLORS.navy950} 100%)`,
      }}
    >
      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Sophisticated pattern overlay - subtle diamond grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23faaa68' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${COLORS.navy1000}60 100%)`,
        }}
      />

      {/* Golden accent lines - corner decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left corner */}
        <div
          className="absolute top-0 left-0 w-40 h-px transition-all duration-1000"
          style={{
            background: `linear-gradient(90deg, ${COLORS.peach} 0%, transparent 100%)`,
            opacity: mounted ? 0.4 : 0,
            transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transitionDelay: '500ms',
          }}
        />
        <div
          className="absolute top-0 left-0 w-px h-40 transition-all duration-1000"
          style={{
            background: `linear-gradient(180deg, ${COLORS.peach} 0%, transparent 100%)`,
            opacity: mounted ? 0.4 : 0,
            transform: mounted ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transitionDelay: '500ms',
          }}
        />

        {/* Bottom right corner */}
        <div
          className="absolute bottom-0 right-0 w-56 h-px transition-all duration-1000"
          style={{
            background: `linear-gradient(270deg, ${COLORS.peach}60 0%, transparent 100%)`,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transitionDelay: '700ms',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-px h-56 transition-all duration-1000"
          style={{
            background: `linear-gradient(0deg, ${COLORS.peach}60 0%, transparent 100%)`,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'bottom',
            transitionDelay: '700ms',
          }}
        />

        {/* Floating golden orb - very subtle */}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] transition-all duration-[2000ms]"
          style={{
            backgroundColor: `${COLORS.peach}08`,
            opacity: mounted ? 1 : 0,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Refined eyebrow */}
            <div
              className="flex items-center gap-6 mb-12 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.peach }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${COLORS.peach}60` }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${COLORS.peach}30` }} />
              </div>
              <span
                className="font-mono text-xs tracking-[0.25em] uppercase"
                style={{ color: `${COLORS.peach}cc` }}
              >
                Sidekick Strategies
              </span>
            </div>

            {/* Premium headline - words that contain punctuation get peach color */}
            <h1
              className="font-serif leading-[1.05] tracking-tight transition-all duration-1000"
              style={{
                color: 'white',
                fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: '100ms',
              }}
            >
              {headline.split(' ').map((word, i) => (
                <span
                  key={i}
                  style={{
                    color: word.includes(',') || word.includes('.') ? COLORS.peach : 'white',
                  }}
                >
                  {word}{' '}
                </span>
              ))}
            </h1>

            {/* Elegant divider */}
            <div
              className="mt-10 flex items-center gap-4 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transitionDelay: '300ms',
              }}
            >
              <div
                className="w-16 h-px"
                style={{ background: `linear-gradient(90deg, ${COLORS.peach} 0%, ${COLORS.peach}30 100%)` }}
              />
              <div
                className="w-1.5 h-1.5 rotate-45"
                style={{ border: `1px solid ${COLORS.peach}60` }}
              />
            </div>

            {/* Subheadline */}
            <p
              className="mt-8 font-sans text-lg md:text-xl leading-relaxed max-w-xl transition-all duration-700"
              style={{
                color: 'rgba(255,255,255,0.55)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '400ms',
              }}
            >
              {subheadline}
            </p>

            {/* Premium CTAs */}
            <div
              className="mt-14 flex flex-col sm:flex-row gap-6 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '500ms',
              }}
            >
              {/* Primary CTA - elegant orange with generous padding */}
              <a
                href={primaryCta.href}
                className="group inline-flex items-center justify-center px-10 py-5 text-white font-heading text-sm tracking-[0.15em] uppercase transition-all duration-500"
                style={{
                  backgroundColor: primaryHover ? COLORS.orangeHover : COLORS.orange500,
                  boxShadow: primaryHover
                    ? `0 20px 50px -10px ${COLORS.orange500}50`
                    : `0 10px 30px -10px ${COLORS.orange500}30`,
                }}
                onMouseEnter={() => setPrimaryHover(true)}
                onMouseLeave={() => setPrimaryHover(false)}
              >
                {primaryCta.label}
              </a>

              {/* Secondary CTA - refined text link */}
              <a
                href={secondaryCta.href}
                className="group inline-flex items-center gap-3 px-2 py-5 font-heading text-sm tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  color: secondaryHover ? COLORS.peach : COLORS.orange500,
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

          {/* Right side - Premium testimonial card */}
          <div className="hidden lg:block lg:col-span-5">
            <div
              className="relative transition-all duration-1000"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(48px)',
                transitionDelay: '600ms',
              }}
            >
              {/* Premium card */}
              <div
                className="relative p-10"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)`,
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-px" style={{ backgroundColor: `${COLORS.peach}50` }} />
                <div className="absolute top-0 left-0 h-6 w-px" style={{ backgroundColor: `${COLORS.peach}50` }} />
                <div className="absolute bottom-0 right-0 w-6 h-px" style={{ backgroundColor: `${COLORS.peach}50` }} />
                <div className="absolute bottom-0 right-0 h-6 w-px" style={{ backgroundColor: `${COLORS.peach}50` }} />

                {/* Quote mark */}
                <div className="mb-6">
                  <svg
                    className="w-10 h-10"
                    style={{ color: `${COLORS.peach}40` }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial text */}
                <blockquote
                  className="font-serif text-xl leading-relaxed italic"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  &ldquo;Their strategic insight transformed our approach entirely. A true partnership.&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="mt-8 flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.peach}25 0%, ${COLORS.teal500}15 100%)`,
                    }}
                  >
                    <span className="font-serif text-lg" style={{ color: COLORS.peach }}>JM</span>
                  </div>
                  <div>
                    <div className="font-heading text-sm text-white tracking-wide">James Mitchell</div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-wider"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      CEO, Apex Holdings
                    </div>
                  </div>
                </div>

                {/* Trust indicators */}
                <div
                  className="mt-10 pt-8"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="font-serif text-2xl" style={{ color: COLORS.peach }}>50+</div>
                      <div
                        className="font-mono text-[9px] uppercase tracking-widest mt-1"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        Fortune 500
                      </div>
                    </div>
                    <div className="w-px h-10" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
                    <div className="text-center">
                      <div className="font-serif text-2xl" style={{ color: COLORS.peach }}>$2B+</div>
                      <div
                        className="font-mono text-[9px] uppercase tracking-widest mt-1"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        Value Created
                      </div>
                    </div>
                    <div className="w-px h-10" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
                    <div className="text-center">
                      <div className="font-serif text-2xl" style={{ color: COLORS.peach }}>20</div>
                      <div
                        className="font-mono text-[9px] uppercase tracking-widest mt-1"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        Years
                      </div>
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
        <div
          className="h-px"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${COLORS.peach}25 50%, transparent 100%)` }}
        />
        <div
          className="h-16"
          style={{ background: `linear-gradient(180deg, transparent 0%, ${COLORS.navy1000}40 100%)` }}
        />
      </div>
    </section>
  )
}
