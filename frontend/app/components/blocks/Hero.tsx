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
      className={`relative flex items-center ${sizeClasses[cleanSize as keyof typeof sizeClasses] || sizeClasses.large} ${isDark ? 'text-white' : 'text-gray-900'}`}
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
            className={`absolute inset-0 ${isDark ? 'bg-gray-900/70' : 'bg-white/70'}`}
          />
        </div>
      )}

      <div className="container relative z-10">
        <div
          className={`flex flex-col gap-6 max-w-4xl ${alignmentClasses[cleanAlignment as keyof typeof alignmentClasses] || alignmentClasses.center} ${cleanAlignment === 'center' ? 'mx-auto' : ''}`}
        >
          {eyebrow && (
            <span
              className={`text-sm uppercase font-mono tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {eyebrow}
            </span>
          )}

          {heading && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {heading}
            </h1>
          )}

          {subheading && (
            <p
              className={`text-lg md:text-xl max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {subheading}
            </p>
          )}

          {(primaryButton?.buttonText || secondaryButton?.buttonText) && (
            <div
              className={`flex flex-wrap gap-4 mt-4 ${cleanAlignment === 'center' ? 'justify-center' : cleanAlignment === 'right' ? 'justify-end' : 'justify-start'}`}
            >
              {primaryButton?.buttonText && primaryButton?.link && (
                <ResolvedLink
                  link={primaryButton.link}
                  className="rounded-full font-mono text-sm whitespace-nowrap bg-accent-500 text-white hover:bg-accent-600 py-3 px-8 transition-colors duration-200"
                >
                  {primaryButton.buttonText}
                </ResolvedLink>
              )}
              {secondaryButton?.buttonText && secondaryButton?.link && (
                <ResolvedLink
                  link={secondaryButton.link}
                  className={`rounded-full font-mono text-sm whitespace-nowrap border-2 py-3 px-8 transition-colors duration-200 ${isDark ? 'border-white text-white hover:bg-white hover:text-brand-800' : 'border-brand-800 text-brand-800 hover:bg-brand-800 hover:text-white'}`}
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
              className="rounded-lg shadow-xl mx-auto"
            />
          </div>
        )}
      </div>
    </section>
  )
}
