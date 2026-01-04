/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Dynamic Impact
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Energetic, Diagonal, Asymmetric
 * AESTHETIC: High-energy with bold diagonals, overlapping layers, accent bursts
 * BEST FOR: Creative agencies, sports/fitness, action-oriented brands
 *
 * FEATURES:
 * - Dramatic diagonal slashes creating movement
 * - Overlapping color blocks with transparency
 * - Asymmetric layout breaking the grid
 * - Accent orange as the hero color
 * - Bold, unapologetic typography
 * - Staggered entrance animations
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

'use client'

import { useEffect, useState } from 'react'

interface HeroDynamicImpactProps {
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

export default function HeroDynamicImpact({
  headline = "Ignite your potential",
  subheadline = "Bold strategies for teams ready to break barriers and redefine what's possible.",
  primaryCta = { label: "Let's go", href: "/contact" },
  secondaryCta = { label: "See the work", href: "/portfolio" },
}: HeroDynamicImpactProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center bg-gray-50 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Dynamic diagonal background elements */}
      <div className="absolute inset-0">
        {/* Main diagonal slash */}
        <div
          className={`
            absolute -top-1/2 -right-1/4 w-[150%] h-[200%]
            bg-brand-800 origin-center
            transition-all duration-1000 ease-out
            ${mounted ? 'opacity-100 -rotate-12 translate-x-0' : 'opacity-0 -rotate-6 translate-x-full'}
          `}
        />

        {/* Accent diagonal overlay */}
        <div
          className={`
            absolute -top-1/4 right-0 w-1/2 h-[150%]
            bg-accent-500 origin-top-right
            transition-all duration-1000 delay-150 ease-out
            ${mounted ? 'opacity-90 -rotate-12' : 'opacity-0 rotate-0'}
          `}
        />

        {/* Secondary color strip */}
        <div
          className={`
            absolute top-0 right-[30%] w-24 h-full
            bg-secondary-500 -skew-x-12
            transition-all duration-700 delay-300
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
          `}
        />

        {/* Thin accent lines */}
        <div
          className={`
            absolute top-1/4 left-[10%] w-[1px] h-48
            bg-accent-500 -rotate-12
            transition-all duration-500 delay-500
            ${mounted ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}
          `}
          style={{ transformOrigin: 'top' }}
        />
        <div
          className={`
            absolute bottom-1/4 left-[15%] w-[1px] h-32
            bg-brand-800 -rotate-12
            transition-all duration-500 delay-600
            ${mounted ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}
          `}
          style={{ transformOrigin: 'top' }}
        />
      </div>

      {/* Content - positioned on the left, away from diagonals */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative z-10">
            {/* Oversized number accent */}
            <div
              className={`
                absolute -top-20 -left-8 font-serif text-[200px] leading-none
                text-brand-800/5 select-none pointer-events-none
                transition-all duration-1000
                ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
              `}
              aria-hidden="true"
            >
              01
            </div>

            {/* Eyebrow with slash */}
            <div
              className={`
                flex items-center gap-3 mb-6
                transition-all duration-500 delay-200
                ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
              `}
            >
              <div className="w-8 h-[3px] bg-accent-500 -skew-x-12" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-800">
                Strategic Impact
              </span>
            </div>

            {/* Headline with staggered word animation */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-800 leading-[0.95] tracking-tight">
              {headline.split(' ').map((word, i) => (
                <span
                  key={i}
                  className={`
                    inline-block mr-4
                    transition-all duration-700
                    ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  `}
                  style={{
                    transitionDelay: `${300 + i * 100}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p
              className={`
                mt-8 font-sans text-lg md:text-xl text-gray-600
                max-w-md leading-relaxed
                transition-all duration-700 delay-500
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              {subheadline}
            </p>

            {/* CTAs with diagonal styling */}
            <div
              className={`
                mt-12 flex flex-col sm:flex-row gap-4
                transition-all duration-700 delay-600
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <a
                href={primaryCta.href}
                className="
                  group relative inline-flex items-center justify-center
                  px-10 py-5
                  bg-accent-500 text-white
                  font-heading text-sm tracking-widest uppercase font-bold
                  -skew-x-6
                  transition-all duration-300
                  hover:bg-accent-600 hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
                "
              >
                <span className="skew-x-6">{primaryCta.label}</span>
                <svg
                  className="ml-3 w-5 h-5 skew-x-6 transition-transform group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href={secondaryCta.href}
                className="
                  group inline-flex items-center justify-center
                  px-10 py-5
                  text-brand-800
                  font-heading text-sm tracking-widest uppercase font-bold
                  border-2 border-brand-800
                  -skew-x-6
                  transition-all duration-300
                  hover:bg-brand-800 hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2
                "
              >
                <span className="skew-x-6">{secondaryCta.label}</span>
              </a>
            </div>
          </div>

          {/* Right side - stats or feature callouts */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className={`
                relative
                transition-all duration-1000 delay-400
                ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
              `}
            >
              {/* Floating stat cards */}
              <div className="relative w-64 h-80">
                <div
                  className="
                    absolute top-0 left-0
                    p-6 bg-white shadow-2xl -skew-x-6
                  "
                >
                  <span className="block font-serif text-5xl text-accent-500 skew-x-6">98%</span>
                  <span className="block mt-2 font-mono text-xs text-gray-500 uppercase tracking-wider skew-x-6">
                    Client satisfaction
                  </span>
                </div>
                <div
                  className="
                    absolute top-24 left-16
                    p-6 bg-brand-800 shadow-2xl -skew-x-6
                  "
                >
                  <span className="block font-serif text-5xl text-white skew-x-6">250+</span>
                  <span className="block mt-2 font-mono text-xs text-light-blue uppercase tracking-wider skew-x-6">
                    Projects delivered
                  </span>
                </div>
                <div
                  className="
                    absolute top-48 left-8
                    p-6 bg-secondary-500 shadow-2xl -skew-x-6
                  "
                >
                  <span className="block font-serif text-5xl text-white skew-x-6">15+</span>
                  <span className="block mt-2 font-mono text-xs text-white/80 uppercase tracking-wider skew-x-6">
                    Years experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-800 via-accent-500 to-secondary-500" />
    </section>
  )
}
