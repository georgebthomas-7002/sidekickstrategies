/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Aurora Pulse
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Ethereal Aurora - Mesmerizing Movement
 * AESTHETIC: Dark background with animated aurora/northern lights effect
 * BEST FOR: Premium brands, innovation leaders, visionary companies
 *
 * DESIGN PHILOSOPHY:
 * "Light dancing in darkness" - Inspired by the aurora borealis, this hero
 * features slowly morphing gradient blobs that create a sense of wonder
 * and infinite possibility. The effect is hypnotic but not distracting.
 *
 * FEATURES:
 * - Deep space-like dark background
 * - Multiple animated gradient blobs creating aurora effect
 * - Subtle star-like particles
 * - Elegant left-aligned content with generous spacing
 * - Premium button treatments with glow effects
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
  teal400: '#1aabb9',
  lightBlue: '#98c1d9',
  peach: '#faaa68',
}

interface HeroAuroraPulseProps {
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

export default function HeroAuroraPulse({
  headline = "Illuminate your path forward",
  subheadline = "In a landscape of uncertainty, we bring clarity. Our strategic guidance lights the way to sustainable growth and lasting impact.",
  primaryCta = { label: "Discover possibilities", href: "/contact" },
  secondaryCta = { label: "Our vision", href: "/about" },
}: HeroAuroraPulseProps) {
  const [mounted, setMounted] = useState(false)
  const [primaryHover, setPrimaryHover] = useState(false)
  const [secondaryHover, setSecondaryHover] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: COLORS.navy1000 }}
      aria-label="Hero section"
    >
      {/* CSS Keyframes for aurora animations */}
      <style jsx>{`
        @keyframes aurora1 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          25% {
            transform: translate(100px, -50px) scale(1.2) rotate(10deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(50px, 50px) scale(0.9) rotate(-5deg);
            opacity: 0.5;
          }
          75% {
            transform: translate(-50px, -30px) scale(1.1) rotate(5deg);
            opacity: 0.7;
          }
        }
        @keyframes aurora2 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.5;
          }
          33% {
            transform: translate(-80px, 40px) scale(1.15) rotate(-10deg);
            opacity: 0.7;
          }
          66% {
            transform: translate(60px, -60px) scale(0.85) rotate(15deg);
            opacity: 0.4;
          }
        }
        @keyframes aurora3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-40px, -40px) scale(1.3);
            opacity: 0.6;
          }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Aurora gradient layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${COLORS.navy950} 0%, ${COLORS.navy1000} 100%)`,
          }}
        />

        {/* Aurora blob 1 - Teal/Cyan */}
        <div
          className="absolute top-0 right-1/4 w-[800px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(ellipse, ${COLORS.teal500}50 0%, ${COLORS.teal400}20 40%, transparent 70%)`,
            animation: mounted ? 'aurora1 30s ease-in-out infinite' : 'none',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 2s ease-out',
          }}
        />

        {/* Aurora blob 2 - Peach/Orange warm accent */}
        <div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(ellipse, ${COLORS.peach}30 0%, ${COLORS.orange500}15 40%, transparent 70%)`,
            animation: mounted ? 'aurora2 25s ease-in-out infinite' : 'none',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 2s ease-out 300ms',
          }}
        />

        {/* Aurora blob 3 - Light blue subtle */}
        <div
          className="absolute top-1/3 left-0 w-[500px] h-[400px] rounded-full blur-[80px]"
          style={{
            background: `radial-gradient(ellipse, ${COLORS.lightBlue}25 0%, transparent 60%)`,
            animation: mounted ? 'aurora3 20s ease-in-out infinite' : 'none',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 2s ease-out 500ms',
          }}
        />

        {/* Aurora blob 4 - Deep navy accent for depth */}
        <div
          className="absolute bottom-0 right-0 w-[700px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(ellipse, ${COLORS.navy800}60 0%, transparent 60%)`,
            animation: mounted ? 'aurora1 35s ease-in-out infinite reverse' : 'none',
            opacity: mounted ? 0.8 : 0,
            transition: 'opacity 2s ease-out 700ms',
          }}
        />

        {/* Star-like particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: mounted ? 0.3 + Math.random() * 0.5 : 0,
              animation: mounted ? `twinkle ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 3}s` : 'none',
              transition: 'opacity 1s ease-out',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-3xl">
          {/* Eyebrow with glow effect */}
          <div
            className="mb-10 transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <span
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase"
              style={{ color: COLORS.teal400 }}
            >
              <span
                className="w-8 h-px"
                style={{ backgroundColor: COLORS.teal500 }}
              />
              Sidekick Strategies
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif leading-[1.1] tracking-tight text-white transition-all duration-1000"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '100ms',
              textShadow: `0 0 80px ${COLORS.teal500}30`,
            }}
          >
            {headline}
          </h1>

          {/* Decorative line */}
          <div
            className="my-8 transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transitionDelay: '250ms',
            }}
          >
            <div
              className="h-px w-24"
              style={{
                background: `linear-gradient(90deg, ${COLORS.teal500} 0%, ${COLORS.peach} 100%)`,
              }}
            />
          </div>

          {/* Subheadline */}
          <p
            className="font-sans text-lg md:text-xl leading-relaxed max-w-xl transition-all duration-700"
            style={{
              color: 'rgba(255,255,255,0.6)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '300ms',
            }}
          >
            {subheadline}
          </p>

          {/* CTAs */}
          <div
            className="mt-12 flex flex-col sm:flex-row gap-5 transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '400ms',
            }}
          >
            {/* Primary CTA with glow */}
            <a
              href={primaryCta.href}
              className="group inline-flex items-center justify-center px-8 py-4 text-white font-heading text-sm tracking-wide uppercase font-semibold rounded-lg transition-all duration-300"
              style={{
                backgroundColor: primaryHover ? COLORS.teal400 : COLORS.teal500,
                boxShadow: primaryHover
                  ? `0 0 40px ${COLORS.teal500}60, 0 20px 40px -10px ${COLORS.teal500}40`
                  : `0 0 20px ${COLORS.teal500}30`,
                transform: primaryHover ? 'translateY(-2px)' : 'translateY(0)',
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

            {/* Secondary CTA - subtle glow text */}
            <a
              href={secondaryCta.href}
              className="group inline-flex items-center gap-2 px-4 py-4 font-heading text-sm tracking-wide uppercase font-medium transition-all duration-300"
              style={{
                color: secondaryHover ? COLORS.peach : 'rgba(255,255,255,0.7)',
              }}
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
            >
              {secondaryCta.label}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom accent glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.teal500}50, ${COLORS.peach}50, transparent)`,
          boxShadow: `0 0 30px ${COLORS.teal500}30`,
        }}
      />
    </section>
  )
}
