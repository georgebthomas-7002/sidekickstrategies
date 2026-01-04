/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Bold Edge
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Architectural Geometry - Confident & Commanding
 * AESTHETIC: Deep navy with animated geometric shapes, bold brand presence
 * BEST FOR: Tech companies, agencies, B2B brands that want to project strength
 *
 * DESIGN PHILOSOPHY:
 * "Architecture in motion" - Bold geometric forms create visual tension.
 * The navy background commands respect while animated elements add energy.
 * This hero says: "We're serious, but we're not boring."
 *
 * FEATURES:
 * - Deep navy background (#142d63) with layered geometric shapes
 * - CSS keyframe animations for floating/rotating elements
 * - Grid pattern overlay with subtle pulse
 * - Accent orange rectangle that animates in
 * - Strong typographic hierarchy with last word highlighted
 * - Stacked decorative rectangles creating depth
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
  navy700: '#1e3561',
  navy900: '#0f2250',
  navy950: '#0a1633',
  orange500: '#f65625',
  orangeHover: '#d9441a',
  teal500: '#028393',
  lightBlue: '#98c1d9',
  peach: '#faaa68',
}

interface HeroBoldEdgeProps {
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

export default function HeroBoldEdge({
  headline = "Build strategies that dominate",
  subheadline = "We don't just consult—we architect competitive advantages that reshape markets.",
  primaryCta = { label: "Get started", href: "/contact" },
  secondaryCta = { label: "View case studies", href: "/work" },
}: HeroBoldEdgeProps) {
  const [mounted, setMounted] = useState(false)
  const [primaryHover, setPrimaryHover] = useState(false)
  const [secondaryHover, setSecondaryHover] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Split headline to highlight last word
  const words = headline.split(' ')
  const lastWord = words.pop()
  const restOfHeadline = words.join(' ')

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: COLORS.navy800 }}
      aria-label="Hero section"
    >
      {/* CSS Keyframes for animations */}
      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-15px) rotate(15deg); }
        }
        @keyframes pulseGrid {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }
        @keyframes expandLine {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        @keyframes slideIn {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Geometric background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large corner triangle - animated float */}
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px]"
          style={{
            backgroundColor: COLORS.navy700,
            transform: 'rotate(45deg)',
            animation: mounted ? 'floatSlow 20s ease-in-out infinite' : 'none',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1s ease-out',
          }}
        />

        {/* Secondary floating shape */}
        <div
          className="absolute top-1/3 -right-16 w-[300px] h-[300px]"
          style={{
            backgroundColor: `${COLORS.navy900}80`,
            transform: 'rotate(12deg)',
            animation: mounted ? 'floatMedium 15s ease-in-out infinite' : 'none',
            opacity: mounted ? 0.6 : 0,
            transition: 'opacity 1s ease-out 200ms',
          }}
        />

        {/* Accent vertical rectangle - animated expand */}
        <div
          className="absolute top-1/4 right-[15%] w-3 h-40"
          style={{
            backgroundColor: COLORS.orange500,
            transformOrigin: 'top',
            animation: mounted ? 'expandLine 0.8s ease-out forwards' : 'none',
            opacity: mounted ? 1 : 0,
            transitionDelay: '300ms',
          }}
        />

        {/* Second accent line */}
        <div
          className="absolute top-[35%] right-[12%] w-1.5 h-24"
          style={{
            backgroundColor: COLORS.teal500,
            transformOrigin: 'top',
            animation: mounted ? 'expandLine 0.8s ease-out 0.2s forwards' : 'none',
            opacity: mounted ? 0.7 : 0,
          }}
        />

        {/* Bottom geometric element */}
        <div
          className="absolute bottom-0 left-0 w-1/3 h-32"
          style={{
            background: `linear-gradient(to right, ${COLORS.navy950}, transparent)`,
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.7s ease-out 200ms',
          }}
        />

        {/* Grid pattern overlay - with pulse animation */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: mounted ? 'pulseGrid 8s ease-in-out infinite' : 'none',
          }}
        />

        {/* Floating accent square - animated rotation */}
        <div
          className="absolute bottom-1/4 right-1/4 w-10 h-10 border-2"
          style={{
            borderColor: COLORS.orange500,
            transform: 'rotate(12deg)',
            animation: mounted ? 'floatMedium 12s ease-in-out infinite' : 'none',
            opacity: mounted ? 0.8 : 0,
            transition: 'opacity 0.7s ease-out 500ms',
          }}
        />

        {/* Small decorative dot */}
        <div
          className="absolute top-1/2 right-[20%] w-2 h-2 rounded-full"
          style={{
            backgroundColor: COLORS.peach,
            opacity: mounted ? 0.6 : 0,
            transition: 'opacity 0.7s ease-out 600ms',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            {/* Accent line + Eyebrow */}
            <div
              className="flex items-center gap-4 mb-8 transition-all duration-500"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
              }}
            >
              <div
                className="w-12 h-[2px]"
                style={{ backgroundColor: COLORS.orange500 }}
              />
              <span
                className="font-mono text-xs tracking-[0.25em] uppercase"
                style={{ color: COLORS.lightBlue }}
              >
                Strategic Partners
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif leading-[1.05] tracking-tight transition-all duration-700"
              style={{
                color: 'white',
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: '100ms',
              }}
            >
              {restOfHeadline}{' '}
              <span style={{ color: COLORS.orange500 }}>{lastWord}</span>
            </h1>

            {/* Subheadline */}
            <p
              className="mt-8 font-sans text-lg md:text-xl leading-relaxed max-w-xl transition-all duration-700"
              style={{
                color: 'rgba(255,255,255,0.7)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '200ms',
              }}
            >
              {subheadline}
            </p>

            {/* CTAs */}
            <div
              className="mt-12 flex flex-col sm:flex-row gap-4 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '300ms',
              }}
            >
              {/* Primary CTA */}
              <a
                href={primaryCta.href}
                className="group inline-flex items-center justify-center px-8 py-4 text-white font-heading text-sm tracking-wide uppercase font-semibold transition-all duration-300"
                style={{
                  backgroundColor: primaryHover ? COLORS.orangeHover : COLORS.orange500,
                  transform: primaryHover ? 'scale(1.02) translateY(-2px)' : 'scale(1)',
                  boxShadow: primaryHover ? `0 20px 40px -10px ${COLORS.orange500}50` : 'none',
                }}
                onMouseEnter={() => setPrimaryHover(true)}
                onMouseLeave={() => setPrimaryHover(false)}
              >
                {primaryCta.label}
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Secondary CTA - Ghost style */}
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center px-8 py-4 font-heading text-sm tracking-wide uppercase transition-all duration-300"
                style={{
                  color: COLORS.orange500,
                  border: `1px solid ${secondaryHover ? COLORS.orange500 : COLORS.orange500}60`,
                  backgroundColor: secondaryHover ? `${COLORS.orange500}15` : 'transparent',
                }}
                onMouseEnter={() => setSecondaryHover(true)}
                onMouseLeave={() => setSecondaryHover(false)}
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>

          {/* Right side decorative column - stacked rectangles */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div
              className="relative w-48 h-80 transition-all duration-1000"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(48px)',
                transitionDelay: '400ms',
              }}
            >
              {/* Back rectangle - glass effect */}
              <div
                className="absolute top-0 right-0 w-32 h-48 backdrop-blur-sm"
                style={{ backgroundColor: `${COLORS.teal500}25` }}
              />
              {/* Middle rectangle */}
              <div
                className="absolute top-12 right-8 w-32 h-48"
                style={{ backgroundColor: `${COLORS.navy700}90` }}
              />
              {/* Front rectangle - outline only */}
              <div
                className="absolute top-24 right-16 w-32 h-48 border-2"
                style={{ borderColor: `${COLORS.orange500}70` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom edge accent - gradient bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${COLORS.orange500}, ${COLORS.teal500}, ${COLORS.orange500})`,
        }}
      />
    </section>
  )
}
