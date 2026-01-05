import {PortableTextBlock} from 'next-sanity'

import ResolvedLink from '@/app/components/ResolvedLink'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {stegaClean} from '@sanity/client/stega'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type CtaProps = {
  block: ExtractPageBuilderType<'callToAction'>
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
  cream: '#e0fbfc',
}

export default function CTA({block, index}: CtaProps) {
  const {heading, eyebrow, body = [], button, image, theme, contentAlignment} = block

  const isDark = stegaClean(theme) === 'dark'
  const isImageFirst = stegaClean(contentAlignment) === 'imageFirst'

  // Alternate backgrounds for visual rhythm
  const isEven = index % 2 === 0

  return (
    <section
      className="relative py-16 lg:py-24"
      style={{
        backgroundColor: isDark ? COLORS.navy800 : (isEven ? '#ffffff' : COLORS.cream),
      }}
    >
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`${isImageFirst && image ? 'row-start-2 lg:row-start-1 lg:col-start-2' : ''} flex flex-col gap-4`}
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
              <h2
                className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight"
                style={{color: isDark ? '#ffffff' : COLORS.navy800}}
              >
                {heading}
              </h2>
            )}
            {body && (
              <div
                className="mt-2 prose prose-lg max-w-none"
                style={{color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(20, 45, 99, 0.7)'}}
              >
                <PortableText value={body as PortableTextBlock[]} className={isDark ? 'prose-invert' : ''} />
              </div>
            )}

            {button?.buttonText && button?.link && (
              <div className="flex mt-6">
                <ResolvedLink
                  link={button?.link}
                  className="h-12 px-8 inline-flex items-center rounded-lg font-heading font-medium text-base text-white transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    backgroundColor: COLORS.orange500,
                  }}
                >
                  {button?.buttonText}
                </ResolvedLink>
              </div>
            )}
          </div>

          {image?.asset?._ref && (
            <div className={`${isImageFirst ? '' : 'lg:order-last'}`}>
              <Image
                id={image.asset._ref}
                alt={heading || 'Section image'}
                width={704}
                crop={image.crop}
                hotspot={image.hotspot}
                mode="cover"
                className="rounded-xl shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
