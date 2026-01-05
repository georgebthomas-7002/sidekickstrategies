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
  teal500: '#028393',
  teal600: '#026d7a',
  orange500: '#f65625',
  orange600: '#d9441a',
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
  } = block

  const isDark = stegaClean(theme) === 'dark'
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
