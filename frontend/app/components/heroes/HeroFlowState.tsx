/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Flow State
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Fluid, Gradient-Rich, Modern Movement
 * AESTHETIC: Organic flow with teal-to-navy gradients, floating orbs
 * BEST FOR: SaaS, innovation-focused companies, modern startups
 *
 * FEATURES:
 * - Beautiful teal-to-navy gradient background
 * - Floating glass-morphic orbs with subtle animation
 * - Smooth, continuous motion feel
 * - Modern, approachable energy
 * - Blurred backdrop elements for depth
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

'use client'

import { useEffect, useState } from 'react'

interface HeroFlowStateProps {
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

export default function HeroFlowState({
  headline = "Where strategy meets momentum",
  subheadline = "Navigate complexity with clarity. We help teams find their flow and accelerate toward meaningful outcomes.",
  primaryCta = { label: "Begin your journey", href: "/contact" },
  secondaryCta = { label: "Explore services", href: "/services" },
}: HeroFlowStateProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
      style={{
        background: 'linear-gradient(135deg, #028393 0%, #025762 25%, #142d63 60%, #0f2250 100%)',
      }}
    >
      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large primary orb */}
        <div
          className={`
            absolute -top-32 -right-32 w-[600px] h-[600px]
            rounded-full
            bg-gradient-to-br from-secondary-400/30 to-transparent
            blur-3xl
            transition-all duration-[2000ms] ease-out
            ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
          style={{
            animation: mounted ? 'float1 20s ease-in-out infinite' : 'none',
          }}
        />

        {/* Secondary orb */}
        <div
          className={`
            absolute top-1/2 -left-48 w-[400px] h-[400px]
            rounded-full
            bg-gradient-to-tr from-light-blue/20 to-transparent
            blur-2xl
            transition-all duration-[2000ms] delay-300 ease-out
            ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
          style={{
            animation: mounted ? 'float2 25s ease-in-out infinite' : 'none',
          }}
        />

        {/* Accent orb */}
        <div
          className={`
            absolute bottom-1/4 right-1/4 w-64 h-64
            rounded-full
            bg-gradient-to-br from-peach/15 to-accent-500/10
            blur-2xl
            transition-all duration-[2000ms] delay-500 ease-out
            ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
          `}
          style={{
            animation: mounted ? 'float3 18s ease-in-out infinite' : 'none',
          }}
        />

        {/* Small floating elements */}
        <div
          className={`
            absolute top-1/3 right-1/3 w-4 h-4
            rounded-full bg-white/20
            transition-all duration-1000 delay-700
            ${mounted ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            animation: mounted ? 'pulse 4s ease-in-out infinite' : 'none',
          }}
        />
        <div
          className={`
            absolute bottom-1/3 left-1/4 w-3 h-3
            rounded-full bg-peach/30
            transition-all duration-1000 delay-900
            ${mounted ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            animation: mounted ? 'pulse 5s ease-in-out infinite 1s' : 'none',
          }}
        />
      </div>

      {/* Glass card container */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24">
        <div
          className={`
            max-w-3xl mx-auto text-center
            p-8 md:p-12 lg:p-16
            rounded-3xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-2xl
            transition-all duration-1000
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
          {/* Floating badge */}
          <div
            className={`
              inline-flex items-center gap-2 mb-8
              px-4 py-2 rounded-full
              bg-white/10 backdrop-blur-sm
              border border-white/20
              transition-all duration-700 delay-200
              ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
            `}
          >
            <span className="w-2 h-2 rounded-full bg-peach animate-pulse" />
            <span className="font-mono text-xs tracking-wider text-white/80 uppercase">
              Strategic Consulting
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`
              font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              text-white leading-tight tracking-tight
              transition-all duration-700 delay-300
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={`
              mt-6 md:mt-8 font-sans text-base md:text-lg text-white/70
              max-w-xl mx-auto leading-relaxed
              transition-all duration-700 delay-400
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            {subheadline}
          </p>

          {/* CTAs */}
          <div
            className={`
              mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center
              transition-all duration-700 delay-500
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            <a
              href={primaryCta.href}
              className="
                group inline-flex items-center justify-center
                px-8 py-4
                bg-accent-500 text-white
                font-heading text-sm tracking-wide uppercase font-semibold
                rounded-full
                transition-all duration-300
                hover:bg-accent-500 hover:scale-105 hover:shadow-xl hover:shadow-accent-500/25
                focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-transparent
              "
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
                text-accent-500
                font-heading text-sm tracking-wide uppercase
                rounded-full
                border border-accent-500/50
                backdrop-blur-sm
                transition-all duration-300
                hover:bg-accent-500/10 hover:border-accent-500
                focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 focus:ring-offset-transparent
              "
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}
