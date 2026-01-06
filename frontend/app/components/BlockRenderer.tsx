import React from 'react'

import Cta from '@/app/components/Cta'
import Info from '@/app/components/InfoSection'
import {SectionWrapper} from '@/app/components/SectionWrapper'
import {
  Hero,
  FeaturedArticles,
  FeaturedPodcasts,
  DownloadsGrid,
  Testimonial,
  TeamGrid,
  ContactForm,
  FAQAccordion,
  ServicesGrid,
} from '@/app/components/blocks'
import {dataAttr} from '@/sanity/lib/utils'
import {PageBuilderSection} from '@/sanity/lib/types'

type BlockProps = {
  index: number
  block: PageBuilderSection
  pageId: string
  pageType: string
}

type BlocksType = {
  [key: string]: React.FC<BlockProps>
}

// Using 'as unknown as BlocksType' to handle the variance between specific block types
// and the generic BlockProps. Runtime safety is preserved via the typeof check below.
const Blocks = {
  callToAction: Cta,
  infoSection: Info,
  hero: Hero,
  featuredArticles: FeaturedArticles,
  featuredPodcasts: FeaturedPodcasts,
  downloadsGrid: DownloadsGrid,
  testimonial: Testimonial,
  teamGrid: TeamGrid,
  contactForm: ContactForm,
  faqAccordion: FAQAccordion,
  servicesGrid: ServicesGrid,
} as unknown as BlocksType

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 * Wraps each block with SectionWrapper for consistent styling support.
 */
export default function BlockRenderer({block, index, pageId, pageType}: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== 'undefined') {
    // Extract section settings from block (if available)
    const blockWithSettings = block as PageBuilderSection & {
      sectionSettings?: unknown
      stylePreset?: unknown
    }

    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        <SectionWrapper
          settings={blockWithSettings.sectionSettings as Parameters<typeof SectionWrapper>[0]['settings']}
          preset={blockWithSettings.stylePreset as Parameters<typeof SectionWrapper>[0]['preset']}
          blockType={block._type}
          blockKey={block._key}
        >
          {React.createElement(Blocks[block._type], {
            key: block._key,
            block: block,
            index: index,
            pageId: pageId,
            pageType: pageType,
          })}
        </SectionWrapper>
      </div>
    )
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    {key: block._key},
  )
}
