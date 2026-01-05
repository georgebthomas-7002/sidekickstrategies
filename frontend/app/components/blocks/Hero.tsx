'use client'

import {useEffect, useState} from 'react'
import {stegaClean} from '@sanity/client/stega'
import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type HeroProps = {
  block: ExtractPageBuilderType<'hero'>
  index: number
  pageType: string
  pageId: string
}

// Brand colors (inline for Tailwind v4 purge safety)
const COLORS = {
  navy800: '#142d63',
  navy900: '#0f2250',
  navy950: '#0a1633',
  teal400: '#1aabb9',
  teal500: '#028393',
  teal600: '#026d7a',
  orange500: '#f65625',
  orange600: '#d9441a',
  orangeHover: '#d9441a',
  peach: '#faaa68',
  lightBlue: '#98c1d9',
}

export default function Hero({block}: HeroProps) {
  const {
    eyebrow,
    heading,
    subheading,
    primaryButton,
    secondaryButton,
    backgroundImage,
    foregroundImage,
    size = 'large',
    alignment = 'center',
    theme = 'light',
    layout = 'centered',
  } = block

  const cleanTheme = stegaClean(theme)
  const cleanLayout = stegaClean(layout)

  // Use kinetic theme for the animated tech-style hero
  if (cleanTheme === 'kinetic') {
    return (
      <KineticHero
        eyebrow={eyebrow}
        heading={heading}
        subheading={subheading}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
        foregroundImage={foregroundImage}
      />
    )
  }

  const isDark = cleanTheme === 'dark'
  const cleanAlignment = stegaClean(alignment)
  const cleanSize = stegaClean(size)

  const sizeClasses = {
    large: 'min-h-[80vh] py-24',
    medium: 'min-h-[60vh] py-20',
    small: 'py-16',
  }

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  return (
    <section
      className={`relative flex items-center ${sizeClasses[cleanSize as keyof typeof sizeClasses] || sizeClasses.large}`}
      style={{
        backgroundColor: isDark ? COLORS.navy800 : '#ffffff',
        color: isDark ? '#ffffff' : COLORS.navy800,
      }}
    >
      {backgroundImage?.asset?._ref && (
        <div className="absolute inset-0 z-0">
          <Image
            id={backgroundImage.asset._ref}
            alt={backgroundImage.alt || ''}
            width={1920}
            crop={backgroundImage.crop}
            hotspot={backgroundImage.hotspot}
            mode="cover"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: isDark ? 'rgba(20, 45, 99, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            }}
          />
        </div>
      )}

      <div className="container relative z-10">
        <div
          className={`flex flex-col gap-6 max-w-4xl ${alignmentClasses[cleanAlignment as keyof typeof alignmentClasses] || alignmentClasses.center} ${cleanAlignment === 'center' ? 'mx-auto' : ''}`}
        >
          {eyebrow && (
            <span
              className="text-xs uppercase font-heading font-medium tracking-[0.25em]"
              style={{color: COLORS.teal500}}
            >
              {eyebrow}
            </span>
          )}

          {heading && (
            <h1
              className="font-serif text-4xl md:text-5xl lg:text-7xl leading-tight"
              style={{color: isDark ? '#ffffff' : COLORS.navy800}}
            >
              {heading}
            </h1>
          )}

          {subheading && (
            <p
              className="font-sans text-lg md:text-xl max-w-2xl leading-relaxed"
              style={{color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(20, 45, 99, 0.7)'}}
            >
              {subheading}
            </p>
          )}

          {(primaryButton?.buttonText || secondaryButton?.buttonText) && (
            <div
              className={`flex flex-wrap gap-4 mt-6 ${cleanAlignment === 'center' ? 'justify-center' : cleanAlignment === 'right' ? 'justify-end' : 'justify-start'}`}
            >
              {primaryButton?.buttonText && primaryButton?.link && (
                <ResolvedLink
                  link={primaryButton.link}
                  className="h-12 px-8 inline-flex items-center rounded-lg font-heading font-medium text-base text-white transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    backgroundColor: COLORS.orange500,
                  }}
                >
                  {primaryButton.buttonText}
                </ResolvedLink>
              )}
              {secondaryButton?.buttonText && secondaryButton?.link && (
                <ResolvedLink
                  link={secondaryButton.link}
                  className="h-12 px-8 inline-flex items-center rounded-lg font-heading font-medium text-base transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    backgroundColor: COLORS.teal500,
                    color: '#ffffff',
                  }}
                >
                  {secondaryButton.buttonText}
                </ResolvedLink>
              )}
            </div>
          )}
        </div>

        {foregroundImage?.asset?._ref && (
          <div className="mt-12">
            <Image
              id={foregroundImage.asset._ref}
              alt={foregroundImage.alt || ''}
              width={800}
              crop={foregroundImage.crop}
              hotspot={foregroundImage.hotspot}
              mode="cover"
              className="rounded-xl shadow-xl mx-auto"
            />
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * Kinetic Hero - Tech-forward animated hero with grid background
 * Matches the HeroKineticGrid style from the brand-bible page
 */
function KineticHero({
  eyebrow,
  heading,
  subheading,
  primaryButton,
  secondaryButton,
  foregroundImage,
}: {
  eyebrow?: string | null
  heading?: string | null
  subheading?: string | null
  primaryButton?: ExtractPageBuilderType<'hero'>['primaryButton']
  secondaryButton?: ExtractPageBuilderType<'hero'>['secondaryButton']
  foregroundImage?: ExtractPageBuilderType<'hero'>['foregroundImage']
}) {
  const [mounted, setMounted] = useState(false)
  const [primaryHover, setPrimaryHover] = useState(false)
  const [secondaryHover, setSecondaryHover] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{backgroundColor: COLORS.navy950}}
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
        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes orbitParticle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bracketPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes streamIn {
          0% { opacity: 0; transform: translateX(-100%); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(100%); }
        }
        @keyframes streamInV {
          0% { opacity: 0; transform: translateY(-100%); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(100%); }
        }
        @keyframes borderGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes holoSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes cornerDot {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 1; }
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

        {/* Second diagonal beam */}
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
                style={{color: COLORS.teal400}}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                <span className="w-1 h-1 rounded-full bg-current opacity-25" />
              </div>
              <span
                className="font-mono text-xs tracking-[0.25em] uppercase"
                style={{color: COLORS.teal400}}
              >
                {eyebrow || 'System Online'}
              </span>
            </div>

            {/* Headline */}
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
              {heading}
            </h1>

            {/* Technical divider */}
            <div
              className="my-6 flex items-center gap-2 transition-all duration-500"
              style={{
                opacity: mounted ? 1 : 0,
                transitionDelay: '250ms',
              }}
            >
              <div className="w-8 h-px" style={{backgroundColor: COLORS.orange500}} />
              <div className="w-2 h-2 rotate-45" style={{borderColor: COLORS.orange500, borderWidth: '1px'}} />
              <div className="w-16 h-px" style={{backgroundColor: `${COLORS.orange500}50`}} />
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
              {subheading}
            </p>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '400ms',
              }}
            >
              {primaryButton?.buttonText && primaryButton?.link && (
                <ResolvedLink
                  link={primaryButton.link}
                  className="group inline-flex items-center justify-center px-8 py-4 text-white font-mono text-sm tracking-wider uppercase transition-all duration-300"
                  style={{
                    backgroundColor: primaryHover ? COLORS.orangeHover : COLORS.orange500,
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    boxShadow: primaryHover ? `0 0 30px ${COLORS.orange500}50` : 'none',
                  }}
                >
                  <span
                    onMouseEnter={() => setPrimaryHover(true)}
                    onMouseLeave={() => setPrimaryHover(false)}
                    className="flex items-center"
                  >
                    <span className="mr-2">&gt;</span>
                    {primaryButton.buttonText}
                  </span>
                </ResolvedLink>
              )}

              {secondaryButton?.buttonText && secondaryButton?.link && (
                <ResolvedLink
                  link={secondaryButton.link}
                  className="inline-flex items-center justify-center px-8 py-4 text-white font-mono text-sm tracking-wider uppercase transition-all duration-300"
                  style={{
                    backgroundColor: secondaryHover ? COLORS.teal400 : COLORS.teal500,
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    boxShadow: secondaryHover ? `0 0 30px ${COLORS.teal500}50` : 'none',
                  }}
                >
                  <span
                    onMouseEnter={() => setSecondaryHover(true)}
                    onMouseLeave={() => setSecondaryHover(false)}
                  >
                    {secondaryButton.buttonText}
                  </span>
                </ResolvedLink>
              )}
            </div>
          </div>

          {/* Right side - Image with tech frame */}
          {foregroundImage?.asset?._ref && (
            <div
              className="hidden lg:flex lg:items-center lg:justify-center relative transition-all duration-1000"
              style={{
                opacity: mounted ? 1 : 0,
                transitionDelay: '500ms',
              }}
            >
              <div className="relative" style={{width: '420px', height: '420px'}}>
                {/* Outer rotating ring */}
                <div
                  className="absolute inset-[-60px] rounded-full"
                  style={{
                    border: `1px dashed ${COLORS.teal500}30`,
                    animation: mounted ? 'rotateRing 30s linear infinite' : 'none',
                  }}
                />

                {/* Pulsing glow rings */}
                <div
                  className="absolute inset-[-40px] rounded-full"
                  style={{
                    background: `radial-gradient(circle, transparent 60%, ${COLORS.teal500}10 70%, transparent 80%)`,
                    animation: mounted ? 'pulseGlow 4s ease-in-out infinite' : 'none',
                  }}
                />
                <div
                  className="absolute inset-[-25px] rounded-full"
                  style={{
                    background: `radial-gradient(circle, transparent 65%, ${COLORS.orange500}08 75%, transparent 85%)`,
                    animation: mounted ? 'pulseGlow 4s ease-in-out infinite 1s' : 'none',
                  }}
                />

                {/* Orbiting particles */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`orbit-${i}`}
                    className="absolute"
                    style={{
                      width: '100%',
                      height: '100%',
                      animation: mounted ? `orbitParticle ${12 + i * 2}s linear infinite ${i * 0.5}s` : 'none',
                    }}
                  >
                    <div
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        top: '-4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: i % 2 === 0 ? COLORS.orange500 : COLORS.teal400,
                        boxShadow: `0 0 ${8 + i * 2}px ${i % 2 === 0 ? COLORS.orange500 : COLORS.teal400}`,
                        opacity: 0.8 - i * 0.05,
                      }}
                    />
                  </div>
                ))}

                {/* Corner brackets */}
                <div className="absolute -top-8 -left-8">
                  <div
                    className="w-12 h-px"
                    style={{
                      backgroundColor: COLORS.orange500,
                      animation: mounted ? 'bracketPulse 2s ease-in-out infinite' : 'none',
                    }}
                  />
                  <div
                    className="w-px h-12"
                    style={{
                      backgroundColor: COLORS.orange500,
                      animation: mounted ? 'bracketPulse 2s ease-in-out infinite 0.2s' : 'none',
                    }}
                  />
                </div>
                <div className="absolute -top-8 -right-8 flex flex-col items-end">
                  <div
                    className="w-12 h-px"
                    style={{
                      backgroundColor: COLORS.teal400,
                      animation: mounted ? 'bracketPulse 2s ease-in-out infinite 0.5s' : 'none',
                    }}
                  />
                  <div
                    className="w-px h-12 self-end"
                    style={{
                      backgroundColor: COLORS.teal400,
                      animation: mounted ? 'bracketPulse 2s ease-in-out infinite 0.7s' : 'none',
                    }}
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 flex flex-col justify-end">
                  <div
                    className="w-px h-12"
                    style={{
                      backgroundColor: COLORS.teal400,
                      animation: mounted ? 'bracketPulse 2s ease-in-out infinite 1s' : 'none',
                    }}
                  />
                  <div
                    className="w-12 h-px"
                    style={{
                      backgroundColor: COLORS.teal400,
                      animation: mounted ? 'bracketPulse 2s ease-in-out infinite 1.2s' : 'none',
                    }}
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 flex flex-col items-end justify-end">
                  <div
                    className="w-px h-12 self-end"
                    style={{
                      backgroundColor: COLORS.orange500,
                      animation: mounted ? 'bracketPulse 2s ease-in-out infinite 1.5s' : 'none',
                    }}
                  />
                  <div
                    className="w-12 h-px"
                    style={{
                      backgroundColor: COLORS.orange500,
                      animation: mounted ? 'bracketPulse 2s ease-in-out infinite 1.7s' : 'none',
                    }}
                  />
                </div>

                {/* Data stream lines */}
                <div
                  className="absolute top-1/2 -left-20 w-16 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${COLORS.teal400})`,
                    animation: mounted ? 'streamIn 3s ease-in-out infinite' : 'none',
                  }}
                />
                <div
                  className="absolute top-1/3 -right-20 w-16 h-px"
                  style={{
                    background: `linear-gradient(-90deg, transparent, ${COLORS.orange500})`,
                    animation: mounted ? 'streamIn 3s ease-in-out infinite 1s' : 'none',
                  }}
                />
                <div
                  className="absolute -top-16 left-1/2 w-px h-12"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${COLORS.peach})`,
                    animation: mounted ? 'streamInV 3s ease-in-out infinite 0.5s' : 'none',
                  }}
                />
                <div
                  className="absolute -bottom-16 left-2/3 w-px h-12"
                  style={{
                    background: `linear-gradient(0deg, transparent, ${COLORS.lightBlue})`,
                    animation: mounted ? 'streamInV 3s ease-in-out infinite 1.5s' : 'none',
                  }}
                />

                {/* Inner glow */}
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: `inset 0 0 60px ${COLORS.teal500}15, 0 0 40px ${COLORS.navy950}`,
                  }}
                />

                {/* Glowing border */}
                <div
                  className="absolute -inset-1 rounded-lg blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.teal500}, ${COLORS.orange500})`,
                    opacity: 0.5,
                    animation: mounted ? 'borderGlow 3s ease-in-out infinite' : 'none',
                  }}
                />

                {/* Main image container */}
                <div
                  className="relative overflow-hidden h-full"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                    border: `1px solid ${COLORS.teal500}40`,
                  }}
                >
                  <Image
                    id={foregroundImage.asset._ref}
                    alt={foregroundImage.alt || ''}
                    width={420}
                    height={420}
                    crop={foregroundImage.crop}
                    hotspot={foregroundImage.hotspot}
                    mode="cover"
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'contrast(1.05) saturate(1.1)',
                    }}
                  />

                  {/* Scan line overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${COLORS.teal500}20 2px, ${COLORS.teal500}20 4px)`,
                    }}
                  />

                  {/* Holographic sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(105deg, transparent 40%, ${COLORS.teal400}15 45%, ${COLORS.orange500}10 50%, transparent 55%)`,
                      animation: mounted ? 'holoSweep 4s ease-in-out infinite' : 'none',
                    }}
                  />
                </div>

                {/* Corner energy dots */}
                <div className="absolute top-0 left-0 w-3 h-3">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: COLORS.orange500,
                      animation: mounted ? 'cornerDot 1.5s ease-in-out infinite' : 'none',
                    }}
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: COLORS.teal400,
                      animation: mounted ? 'cornerDot 1.5s ease-in-out infinite 0.75s' : 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          )}
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
