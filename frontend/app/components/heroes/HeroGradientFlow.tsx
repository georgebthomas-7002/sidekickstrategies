/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESET: Gradient Flow
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STYLE: Fluid Gradient Motion - Living Color
 * AESTHETIC: 3-color animated gradient (navy → teal → peach) with floating orbs
 * BEST FOR: SaaS, innovation companies, modern startups, creative agencies
 *
 * DESIGN PHILOSOPHY:
 * "Color in motion" - The gradient itself is alive, slowly shifting and
 * morphing. Combined with floating glass-morphic elements, this creates
 * a sense of perpetual forward motion and innovation.
 *
 * FEATURES:
 * - Animated 3-color gradient background that shifts positions
 * - Floating glass-morphic orbs with CSS animations
 * - Centered glass card with content
 * - Pulse animations on decorative elements
 * - Rounded, approachable button styles
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

interface HeroGradientFlowProps {
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

export default function HeroGradientFlow({
  headline = "Where strategy meets momentum",
  subheadline = "Navigate complexity with clarity. We help teams find their flow and accelerate toward meaningful outcomes.",
  primaryCta = { label: "Begin your journey", href: "/contact" },
  secondaryCta = { label: "Explore services", href: "/services" },
}: HeroGradientFlowProps) {
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
    >
      {/* CSS Keyframes for gradient and orb animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.05); }
          50% { transform: translate(-20px, -60px) scale(0.95); }
          75% { transform: translate(40px, -20px) scale(1.02); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.1); }
          66% { transform: translate(30px, -40px) scale(0.9); }
        }
        @keyframes floatOrb3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            135deg,
            ${COLORS.teal500} 0%,
            ${COLORS.navy800} 25%,
            ${COLORS.navy900} 50%,
            ${COLORS.navy800} 75%,
            ${COLORS.peach}40 100%
          )`,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      />

      {/* Secondary gradient layer for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at 30% 20%,
            ${COLORS.teal400}30 0%,
            transparent 50%
          ), radial-gradient(
            ellipse at 70% 80%,
            ${COLORS.peach}20 0%,
            transparent 50%
          )`,
        }}
      />

      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large primary orb */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${COLORS.teal400}40 0%, transparent 70%)`,
            animation: mounted ? 'floatOrb1 25s ease-in-out infinite' : 'none',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 2s ease-out',
          }}
        />

        {/* Secondary orb - left side */}
        <div
          className="absolute top-1/2 -left-48 w-[450px] h-[450px] rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${COLORS.lightBlue}25 0%, transparent 70%)`,
            animation: mounted ? 'floatOrb2 20s ease-in-out infinite' : 'none',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 2s ease-out 300ms',
          }}
        />

        {/* Warm accent orb - bottom */}
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${COLORS.peach}30 0%, ${COLORS.orange500}10 50%, transparent 70%)`,
            animation: mounted ? 'floatOrb3 18s ease-in-out infinite' : 'none',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 2s ease-out 500ms',
          }}
        />

        {/* Small floating particles */}
        <div
          className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full"
          style={{
            backgroundColor: 'rgba(255,255,255,0.3)',
            animation: mounted ? 'pulse 4s ease-in-out infinite' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full"
          style={{
            backgroundColor: COLORS.peach,
            animation: mounted ? 'pulse 5s ease-in-out infinite 1s' : 'none',
            opacity: mounted ? 0.5 : 0,
          }}
        />
        <div
          className="absolute top-1/2 right-1/5 w-2 h-2 rounded-full"
          style={{
            backgroundColor: COLORS.lightBlue,
            animation: mounted ? 'pulse 6s ease-in-out infinite 2s' : 'none',
            opacity: mounted ? 0.6 : 0,
          }}
        />
      </div>

      {/* Glass card container */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24">
        <div
          className="max-w-3xl mx-auto text-center p-8 md:p-12 lg:p-16 rounded-3xl transition-all duration-1000"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          {/* Floating badge */}
          <div
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full transition-all duration-700"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(1)' : 'scale(0.9)',
              transitionDelay: '200ms',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: COLORS.peach,
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            <span className="font-mono text-xs tracking-[0.15em] text-white/80 uppercase">
              Strategic Consulting
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif leading-tight tracking-tight text-white transition-all duration-700"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '300ms',
            }}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className="mt-6 md:mt-8 font-sans text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '400ms',
            }}
          >
            {subheadline}
          </p>

          {/* CTAs */}
          <div
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '500ms',
            }}
          >
            {/* Primary CTA - Rounded pill style */}
            <a
              href={primaryCta.href}
              className="group inline-flex items-center justify-center px-8 py-4 text-white font-heading text-sm tracking-wide uppercase font-semibold rounded-full transition-all duration-300"
              style={{
                backgroundColor: primaryHover ? COLORS.orangeHover : COLORS.orange500,
                transform: primaryHover ? 'scale(1.05)' : 'scale(1)',
                boxShadow: primaryHover
                  ? `0 20px 40px -10px ${COLORS.orange500}60`
                  : `0 10px 30px -10px ${COLORS.orange500}40`,
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

            {/* Secondary CTA - Glass pill */}
            <a
              href={secondaryCta.href}
              className="inline-flex items-center justify-center px-8 py-4 font-heading text-sm tracking-wide uppercase rounded-full transition-all duration-300"
              style={{
                color: secondaryHover ? 'white' : COLORS.peach,
                border: `1px solid ${secondaryHover ? COLORS.peach : COLORS.peach}60`,
                backgroundColor: secondaryHover ? `${COLORS.peach}20` : 'transparent',
              }}
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.teal500}50, ${COLORS.peach}50, transparent)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s linear infinite',
        }}
      />
    </section>
  )
}
