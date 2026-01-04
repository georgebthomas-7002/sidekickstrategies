/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Kinetic Grid
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Tech-Forward Architecture - Precision in Motion
 * AESTHETIC: Navy background with animated grid lines that pulse and flow
 * BEST FOR: Tech companies, engineering firms, data-driven brands
 *
 * DESIGN PHILOSOPHY:
 * "The beauty of structure" - A precise grid system comes alive with
 * flowing energy. Lines pulse and glow, creating a sense of data moving
 * through networks, systems communicating, technology at work.
 *
 * FEATURES:
 * - Animated grid with flowing highlight lines
 * - Intersection points that pulse
 * - Diagonal energy beams crossing the grid
 * - Technical-feeling typography treatment
 * - Precise, sharp button styles
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
  orangeHover: '#d9441a',
  teal500: '#028393',
  teal400: '#1aabb9',
  lightBlue: '#98c1d9',
  peach: '#faaa68',
}

interface HeroKineticGridProps {
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
  tertiaryCta?: {
    label: string
    href: string
  }
  image?: {
    src: string
    alt: string
  }
  eyebrowText?: string
}

export default function HeroKineticGrid({
  headline = "Systems designed for scale",
  subheadline = "We engineer strategic frameworks that grow with your ambition. Precision planning meets adaptive execution.",
  primaryCta = { label: "Initialize", href: "/contact" },
  secondaryCta = { label: "View architecture", href: "/services" },
  tertiaryCta,
  image,
  eyebrowText = "System Online",
}: HeroKineticGridProps) {
  const [mounted, setMounted] = useState(false)
  const [primaryHover, setPrimaryHover] = useState(false)
  const [secondaryHover, setSecondaryHover] = useState(false)
  const [tertiaryHover, setTertiaryHover] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: COLORS.navy950 }}
      aria-label="Hero section"
    >
      {/* CSS Keyframes for grid animations */}
      <style jsx>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.12; }
        }
        @keyframes flowHorizontal {
          0% { transform: translateX(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        @keyframes flowVertical {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        @keyframes nodeGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes diagonalBeam {
          0% { transform: translateX(-100%) translateY(-100%); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateX(200%) translateY(200%); opacity: 0; }
        }
        @keyframes dataFlow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
      `}</style>

      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${COLORS.teal500}15 1px, transparent 1px),
              linear-gradient(90deg, ${COLORS.teal500}15 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: mounted ? 'gridPulse 4s ease-in-out infinite' : 'none',
          }}
        />

        {/* Secondary finer grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${COLORS.teal500}08 1px, transparent 1px),
              linear-gradient(90deg, ${COLORS.teal500}08 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Horizontal flowing highlight lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 h-px"
            style={{
              top: `${15 + i * 20}%`,
              width: '150px',
              background: `linear-gradient(90deg, transparent, ${COLORS.teal400}, transparent)`,
              animation: mounted ? `flowHorizontal ${8 + i * 2}s linear infinite ${i * 1.5}s` : 'none',
              opacity: mounted ? 1 : 0,
            }}
          />
        ))}

        {/* Vertical flowing highlight lines */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 w-px"
            style={{
              left: `${20 + i * 25}%`,
              height: '120px',
              background: `linear-gradient(180deg, transparent, ${COLORS.orange500}80, transparent)`,
              animation: mounted ? `flowVertical ${10 + i * 2}s linear infinite ${i * 2}s` : 'none',
              opacity: mounted ? 1 : 0,
            }}
          />
        ))}

        {/* Grid intersection nodes that pulse */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`node-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: `${20 + (i % 4) * 25}%`,
              left: `${15 + Math.floor(i / 4) * 30}%`,
              backgroundColor: i % 3 === 0 ? COLORS.orange500 : COLORS.teal400,
              boxShadow: `0 0 10px ${i % 3 === 0 ? COLORS.orange500 : COLORS.teal400}`,
              animation: mounted ? `nodeGlow ${3 + (i % 3)}s ease-in-out infinite ${i * 0.3}s` : 'none',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.5s ease-out',
            }}
          />
        ))}

        {/* Diagonal energy beam */}
        <div
          className="absolute w-[400px] h-px rotate-45"
          style={{
            top: '30%',
            left: '-10%',
            background: `linear-gradient(90deg, transparent, ${COLORS.peach}60, transparent)`,
            animation: mounted ? 'diagonalBeam 12s linear infinite' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        />

        {/* Second diagonal beam - opposite direction */}
        <div
          className="absolute w-[300px] h-px -rotate-45"
          style={{
            bottom: '40%',
            right: '-5%',
            background: `linear-gradient(90deg, transparent, ${COLORS.lightBlue}40, transparent)`,
            animation: mounted ? 'diagonalBeam 15s linear infinite 3s' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, ${COLORS.navy950} 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Technical eyebrow */}
            <div
              className="mb-8 flex items-center gap-4 transition-all duration-500"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
              }}
            >
              <div
                className="flex items-center gap-1"
                style={{ color: COLORS.teal400 }}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                <span className="w-1 h-1 rounded-full bg-current opacity-25" />
              </div>
              <span
                className="font-mono text-xs tracking-[0.25em] uppercase"
                style={{ color: COLORS.teal400 }}
              >
                {eyebrowText}
              </span>
            </div>

            {/* Headline - technical feel */}
            <h1
              className="font-serif leading-[1.1] tracking-tight transition-all duration-700"
              style={{
                color: 'white',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '100ms',
              }}
            >
              {headline}
            </h1>

            {/* Technical divider */}
            <div
              className="my-6 flex items-center gap-2 transition-all duration-500"
              style={{
                opacity: mounted ? 1 : 0,
                transitionDelay: '250ms',
              }}
            >
              <div className="w-8 h-px" style={{ backgroundColor: COLORS.orange500 }} />
              <div className="w-2 h-2 rotate-45" style={{ borderColor: COLORS.orange500, borderWidth: '1px' }} />
              <div className="w-16 h-px" style={{ backgroundColor: `${COLORS.orange500}50` }} />
            </div>

            {/* Subheadline */}
            <p
              className="font-sans text-base md:text-lg leading-relaxed max-w-lg transition-all duration-700"
              style={{
                color: 'rgba(255,255,255,0.6)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '300ms',
              }}
            >
              {subheadline}
            </p>

            {/* CTAs - technical/sharp style */}
            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '400ms',
              }}
            >
              {/* Primary CTA - sharp corners, technical feel */}
              <a
                href={primaryCta.href}
                className="group inline-flex items-center justify-center px-8 py-4 text-white font-mono text-sm tracking-wider uppercase transition-all duration-300"
                style={{
                  backgroundColor: primaryHover ? COLORS.orangeHover : COLORS.orange500,
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  boxShadow: primaryHover ? `0 0 30px ${COLORS.orange500}50` : 'none',
                }}
                onMouseEnter={() => setPrimaryHover(true)}
                onMouseLeave={() => setPrimaryHover(false)}
              >
                <span className="mr-2">&gt;</span>
                {primaryCta.label}
              </a>

              {/* Secondary CTA - teal solid style */}
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center px-8 py-4 text-white font-mono text-sm tracking-wider uppercase transition-all duration-300"
                style={{
                  backgroundColor: secondaryHover ? COLORS.teal400 : COLORS.teal500,
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  boxShadow: secondaryHover ? `0 0 30px ${COLORS.teal500}50` : 'none',
                }}
                onMouseEnter={() => setSecondaryHover(true)}
                onMouseLeave={() => setSecondaryHover(false)}
              >
                {secondaryCta.label}
              </a>

              {/* Tertiary CTA - text link style */}
              {tertiaryCta && (
                <a
                  href={tertiaryCta.href}
                  className="inline-flex items-center justify-center px-4 py-4 font-mono text-sm tracking-wider uppercase transition-all duration-300"
                  style={{
                    color: tertiaryHover ? COLORS.peach : 'rgba(255,255,255,0.5)',
                  }}
                  onMouseEnter={() => setTertiaryHover(true)}
                  onMouseLeave={() => setTertiaryHover(false)}
                >
                  {tertiaryCta.label}
                  <svg
                    className="ml-2 w-4 h-4 transition-transform duration-300"
                    style={{ transform: tertiaryHover ? 'translateX(4px)' : 'translateX(0)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Right side - Image or Data visualization */}
          <div
            className="hidden lg:flex lg:items-center lg:justify-center relative transition-all duration-1000"
            style={{
              opacity: mounted ? 1 : 0,
              transitionDelay: '500ms',
            }}
          >
            {image ? (
              /* Custom image with tech-styled frame */
              <div className="relative">
                {/* Glowing border effect */}
                <div
                  className="absolute -inset-1 rounded-lg opacity-50 blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.teal500}, ${COLORS.orange500})`,
                  }}
                />
                {/* Image container with tech corners */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                    border: `1px solid ${COLORS.teal500}40`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto max-w-[400px] object-cover"
                    style={{
                      filter: 'contrast(1.05) saturate(1.1)',
                    }}
                  />
                  {/* Scan line overlay effect */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${COLORS.teal500}20 2px, ${COLORS.teal500}20 4px)`,
                    }}
                  />
                </div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-px" style={{ backgroundColor: COLORS.orange500 }} />
                <div className="absolute top-0 left-0 w-px h-4" style={{ backgroundColor: COLORS.orange500 }} />
                <div className="absolute bottom-0 right-0 w-4 h-px" style={{ backgroundColor: COLORS.teal400 }} />
                <div className="absolute bottom-0 right-0 w-px h-4" style={{ backgroundColor: COLORS.teal400 }} />
              </div>
            ) : (
              /* Default decorative circuit-like element */
              <div className="relative h-80 w-full">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320">
                  {/* Circuit paths */}
                  <path
                    d="M50,160 L150,160 L180,100 L280,100 L310,160 L380,160"
                    fill="none"
                    stroke={COLORS.teal500}
                    strokeWidth="1"
                    strokeDasharray="100"
                    style={{
                      animation: mounted ? 'dataFlow 4s linear infinite' : 'none',
                    }}
                  />
                  <path
                    d="M50,200 L120,200 L150,250 L250,250 L280,200 L380,200"
                    fill="none"
                    stroke={COLORS.orange500}
                    strokeWidth="1"
                    strokeDasharray="100"
                    strokeOpacity="0.5"
                    style={{
                      animation: mounted ? 'dataFlow 5s linear infinite 1s' : 'none',
                    }}
                  />
                  {/* Node points */}
                  <circle cx="150" cy="160" r="4" fill={COLORS.teal400} />
                  <circle cx="280" cy="100" r="4" fill={COLORS.teal400} />
                  <circle cx="180" cy="100" r="3" fill={COLORS.orange500} />
                  <circle cx="250" cy="250" r="3" fill={COLORS.peach} />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.teal500}30, ${COLORS.orange500}30, transparent)`,
        }}
      />
    </section>
  )
}
