/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Bold Edge
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Strong Brand Presence, Geometric, Confident
 * AESTHETIC: Navy dominance with sharp accent pops, architectural forms
 * BEST FOR: Tech companies, agencies, bold B2B brands
 *
 * FEATURES:
 * - Deep navy background commanding attention
 * - Geometric shapes creating visual tension
 * - Accent orange for energy and action
 * - Strong typographic hierarchy
 * - Grid-inspired layout with intentional asymmetry
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
  orange500: '#f65625',
  teal500: '#028393',
  lightBlue: '#98c1d9',
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

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: COLORS.navy800 }}
      aria-label="Hero section"
    >
      {/* Geometric background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large corner triangle */}
        <div
          className={`
            absolute -top-20 -right-20 w-[500px] h-[500px]
            rotate-45
            transition-all duration-1000 ease-out
            ${mounted ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-20 -translate-y-20'}
          `}
          style={{ backgroundColor: COLORS.navy700 }}
        />

        {/* Accent rectangle */}
        <div
          className={`
            absolute top-1/4 right-[15%] w-3 h-32
            transition-all duration-700 delay-300
            ${mounted ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}
          `}
          style={{ backgroundColor: COLORS.orange500, transformOrigin: 'top' }}
        />

        {/* Bottom geometric element */}
        <div
          className={`
            absolute bottom-0 left-0 w-1/3 h-24
            transition-all duration-700 delay-200
            ${mounted ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            background: `linear-gradient(to right, ${COLORS.navy900}, transparent)`,
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating accent square */}
        <div
          className={`
            absolute bottom-1/4 right-1/4 w-8 h-8
            border-2 rotate-12
            transition-all duration-1000 delay-500
            ${mounted ? 'opacity-100 rotate-12' : 'opacity-0 rotate-45'}
          `}
          style={{ borderColor: COLORS.orange500 }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            {/* Accent line + Eyebrow */}
            <div
              className={`
                flex items-center gap-4 mb-8
                transition-all duration-500
                ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
              `}
            >
              <div className="w-12 h-[2px]" style={{ backgroundColor: COLORS.orange500 }} />
              <span
                className="font-mono text-xs tracking-[0.25em] uppercase"
                style={{ color: COLORS.lightBlue }}
              >
                Strategic Partners
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`
                font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                text-white leading-[1.05] tracking-tight
                transition-all duration-700 delay-100
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              {headline.split(' ').map((word, i) => (
                <span
                  key={i}
                  style={i === headline.split(' ').length - 1 ? { color: COLORS.orange500 } : undefined}
                >
                  {word}{' '}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p
              className={`
                mt-8 font-sans text-lg md:text-xl text-gray-300
                max-w-xl leading-relaxed
                transition-all duration-700 delay-200
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              {subheadline}
            </p>

            {/* CTAs */}
            <div
              className={`
                mt-12 flex flex-col sm:flex-row gap-4
                transition-all duration-700 delay-300
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <a
                href={primaryCta.href}
                className="
                  group inline-flex items-center justify-center
                  px-8 py-4
                  text-white
                  font-heading text-sm tracking-wide uppercase font-semibold
                  transition-all duration-300
                "
                style={{
                  backgroundColor: COLORS.orange500,
                  transform: primaryHover ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: primaryHover ? `0 10px 25px -5px ${COLORS.orange500}40` : 'none',
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
                  border: `1px solid ${secondaryHover ? COLORS.orange500 : COLORS.orange500}80`,
                  backgroundColor: secondaryHover ? `${COLORS.orange500}15` : 'transparent',
                }}
                onMouseEnter={() => setSecondaryHover(true)}
                onMouseLeave={() => setSecondaryHover(false)}
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>

          {/* Right side decorative column */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div
              className={`
                relative w-48 h-80
                transition-all duration-1000 delay-400
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
            >
              {/* Stacked rectangles */}
              <div
                className="absolute top-0 right-0 w-32 h-48 backdrop-blur-sm"
                style={{ backgroundColor: `${COLORS.teal500}33` }}
              />
              <div
                className="absolute top-12 right-8 w-32 h-48"
                style={{ backgroundColor: `${COLORS.navy700}80` }}
              />
              <div
                className="absolute top-24 right-16 w-32 h-48 border-2"
                style={{ borderColor: `${COLORS.orange500}80` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom edge accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(to right, ${COLORS.orange500}, ${COLORS.teal500}, ${COLORS.orange500})`,
        }}
      />
    </section>
  )
}
