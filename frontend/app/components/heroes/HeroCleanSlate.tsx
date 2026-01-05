/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Clean Slate
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Editorial Minimalism - Typography as Art
 * AESTHETIC: Ultra-refined restraint, magazine-quality whitespace
 * BEST FOR: Professional services, consulting, high-trust luxury brands
 *
 * DESIGN PHILOSOPHY:
 * "The confidence of emptiness" - This hero says everything by showing
 * almost nothing. Every element is intentional, every pixel of whitespace
 * is designed. The typography IS the design.
 *
 * FEATURES:
 * - Palatino Linotype H1 at commanding scale
 * - Generous asymmetric whitespace
 * - Single animated accent line (the only decorative element)
 * - Staggered entrance with sophisticated easing
 * - Offset layout breaking conventional centering
 * - Refined micro-interactions on CTAs
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
  orange500: '#f65625',
  orangeHover: '#d9441a',
  teal500: '#028393',
  gray600: '#4b5563',
  gray400: '#9ca3af',
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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Standard hydration safety pattern
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-white overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle top border - appears on scroll */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${COLORS.navy800}15 50%, transparent 100%)`,
        }}
      />

      {/* The single decorative accent - a vertical line */}
      <div
        className="absolute top-0 bottom-0 hidden lg:block"
        style={{ left: '8%' }}
      >
        <div
          className="w-px h-full transition-all duration-[1500ms] ease-out"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${COLORS.orange500}20 30%, ${COLORS.orange500}40 50%, ${COLORS.orange500}20 70%, transparent 100%)`,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
          }}
        />
      </div>

      {/* Horizontal accent line - bottom left */}
      <div
        className="absolute bottom-32 left-0 h-px transition-all duration-1000 delay-700"
        style={{
          width: mounted ? '120px' : '0px',
          background: `linear-gradient(90deg, ${COLORS.orange500} 0%, transparent 100%)`,
          marginLeft: '10%',
        }}
      />

      {/* Small decorative dot */}
      <div
        className="absolute hidden lg:block transition-all duration-700 delay-1000"
        style={{
          bottom: '128px',
          left: 'calc(10% + 130px)',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: COLORS.orange500,
          opacity: mounted ? 0.6 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0)',
        }}
      />

      {/* Main content - offset to the left for asymmetry */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-4xl lg:max-w-3xl">
          {/* Eyebrow - ultra minimal */}
          {showBadge && (
            <div
              className="mb-10 md:mb-12 transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              }}
            >
              <span
                className="font-mono text-xs tracking-[0.25em] uppercase"
                style={{ color: COLORS.teal500 }}
              >
                Sidekick Strategies
              </span>
            </div>
          )}

          {/* Headline - the star of the show */}
          <h1
            className="font-serif leading-[1.08] tracking-[-0.02em] transition-all duration-1000 ease-out"
            style={{
              color: COLORS.navy800,
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '100ms',
            }}
          >
            {headline}
          </h1>

          {/* Subtle divider - just a thin line */}
          <div
            className="my-8 md:my-10 transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transitionDelay: '300ms',
            }}
          >
            <div
              className="h-px w-16"
              style={{
                background: `linear-gradient(90deg, ${COLORS.navy800}30 0%, transparent 100%)`,
              }}
            />
          </div>

          {/* Subheadline - restrained, readable */}
          <p
            className="font-sans text-lg md:text-xl leading-relaxed max-w-xl transition-all duration-700 ease-out"
            style={{
              color: COLORS.gray600,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '400ms',
            }}
          >
            {subheadline}
          </p>

          {/* CTAs - clean, confident */}
          <div
            className="mt-12 md:mt-14 flex flex-col sm:flex-row items-start gap-6 transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '500ms',
            }}
          >
            {/* Primary CTA - Orange solid */}
            <a
              href={primaryCta.href}
              className="group inline-flex items-center justify-center px-8 py-4 text-white font-heading text-sm tracking-[0.05em] uppercase font-semibold transition-all duration-300"
              style={{
                backgroundColor: primaryHover ? COLORS.orangeHover : COLORS.orange500,
                boxShadow: primaryHover
                  ? `0 20px 40px -10px ${COLORS.orange500}40`
                  : `0 10px 30px -10px ${COLORS.orange500}30`,
                transform: primaryHover ? 'translateY(-2px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setPrimaryHover(true)}
              onMouseLeave={() => setPrimaryHover(false)}
            >
              {primaryCta.label}
            </a>

            {/* Secondary CTA - Text link with animated underline */}
            <a
              href={secondaryCta.href}
              className="group inline-flex items-center gap-2 py-4 px-1 font-heading text-sm tracking-[0.05em] uppercase font-medium transition-all duration-300"
              style={{
                color: secondaryHover ? COLORS.orange500 : COLORS.navy800,
              }}
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
            >
              <span className="relative">
                {secondaryCta.label}
                {/* Animated underline */}
                <span
                  className="absolute left-0 bottom-0 h-px transition-all duration-300"
                  style={{
                    width: secondaryHover ? '100%' : '0%',
                    backgroundColor: COLORS.orange500,
                  }}
                />
              </span>
              <svg
                className="w-4 h-4 transition-transform duration-300"
                style={{
                  transform: secondaryHover ? 'translateX(4px)' : 'translateX(0)',
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Right side decorative element - subtle geometric */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block"
        style={{
          width: '1px',
          height: '200px',
          background: `linear-gradient(180deg, transparent 0%, ${COLORS.navy800}10 50%, transparent 100%)`,
          marginRight: '12%',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1s ease-out 800ms',
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.8) 100%)',
        }}
      />
    </section>
  )
}
