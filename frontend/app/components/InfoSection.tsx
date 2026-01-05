import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import {InfoSection} from '@/sanity.types'

type InfoProps = {
  block: InfoSection
  index: number
  pageId: string
  pageType: string
}

// Brand colors (inline for Tailwind v4 purge safety)
const COLORS = {
  navy800: '#142d63',
  teal500: '#028393',
}

export default function Info({block}: InfoProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {block?.heading && (
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight"
              style={{color: COLORS.navy800}}
            >
              {block.heading}
            </h2>
          )}
          {block?.subheading && (
            <span
              className="block mt-4 mb-8 text-xs uppercase font-heading font-medium tracking-[0.25em]"
              style={{color: COLORS.teal500}}
            >
              {block.subheading}
            </span>
          )}
          <div className="mt-6">
            {block?.content?.length && (
              <div
                className="prose prose-lg max-w-none font-sans leading-relaxed"
                style={{color: 'rgba(20, 45, 99, 0.7)'}}
              >
                <PortableText value={block.content as PortableTextBlock[]} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
