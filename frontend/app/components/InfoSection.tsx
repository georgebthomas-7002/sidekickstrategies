'use client'

import {type PortableTextBlock} from 'next-sanity'
import {stegaClean} from '@sanity/client/stega'

import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
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
  navy950: '#0a1633',
  teal500: '#028393',
  teal400: '#1aabb9',
  orange500: '#f65625',
}

/**
 * Extract YouTube video ID from various URL formats
 */
function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

/**
 * Extract Vimeo video ID from URL
 */
function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : null
}

/**
 * Video player component supporting YouTube, Vimeo, and uploaded files
 */
function VideoPlayer({
  video,
}: {
  video: NonNullable<InfoSection['video']>
}) {
  const source = stegaClean(video.source)
  const url = video.url ? stegaClean(video.url) : null
  const autoplay = video.autoplay ?? false
  const loop = video.loop ?? false

  // YouTube embed
  if (source === 'youtube' && url) {
    const videoId = getYouTubeId(url)
    if (!videoId) return null

    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      ...(autoplay && {autoplay: '1', mute: '1'}),
      ...(loop && {loop: '1', playlist: videoId}),
    })

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{border: 'none'}}
        />
      </div>
    )
  }

  // Vimeo embed
  if (source === 'vimeo' && url) {
    const videoId = getVimeoId(url)
    if (!videoId) return null

    const params = new URLSearchParams({
      ...(autoplay && {autoplay: '1', muted: '1'}),
      ...(loop && {loop: '1'}),
    })

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?${params.toString()}`}
          title="Video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{border: 'none'}}
        />
      </div>
    )
  }

  // Uploaded file - placeholder for now (requires Sanity file URL resolution)
  if (source === 'file' && video.file?.asset?._ref) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Video file uploaded (player coming soon)</p>
      </div>
    )
  }

  return null
}

/**
 * Placeholder for video - shown when video type is selected but no video is configured
 */
function VideoPlaceholder() {
  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl flex items-center justify-center"
      style={{
        backgroundColor: COLORS.navy950,
        border: `2px dashed ${COLORS.teal500}40`,
      }}
    >
      {/* Play button icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: `${COLORS.orange500}20`,
          border: `2px solid ${COLORS.orange500}`,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill={COLORS.orange500}
          className="ml-1"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      {/* Decorative elements */}
      <div
        className="absolute top-4 left-4 w-8 h-px"
        style={{backgroundColor: COLORS.teal400}}
      />
      <div
        className="absolute top-4 left-4 w-px h-8"
        style={{backgroundColor: COLORS.teal400}}
      />
      <div
        className="absolute bottom-4 right-4 w-8 h-px"
        style={{backgroundColor: COLORS.teal400}}
      />
      <div
        className="absolute bottom-4 right-4 w-px h-8"
        style={{backgroundColor: COLORS.teal400}}
      />
      {/* Label */}
      <span
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono tracking-wider uppercase"
        style={{color: `${COLORS.teal400}80`}}
      >
        Video Coming Soon
      </span>
    </div>
  )
}

export default function Info({block}: InfoProps) {
  const mediaType = stegaClean(block?.mediaType) || 'none'
  const mediaPosition = stegaClean(block?.mediaPosition) || 'left'
  const hasMedia = mediaType !== 'none'

  // Determine if we have actual media content
  const hasImage = mediaType === 'image' && block?.image?.asset?._ref
  const hasVideo = mediaType === 'video' && (
    block?.video?.url ||
    block?.video?.file?.asset?._ref
  )
  const showPlaceholder = mediaType === 'video' && !hasVideo

  // Content block
  const ContentBlock = (
    <div className={hasMedia ? '' : 'max-w-3xl mx-auto'}>
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
  )

  // Media block
  const MediaBlock = hasMedia && (
    <div className="flex items-center">
      {hasImage && block.image?.asset?._ref && (
        <Image
          id={block.image.asset._ref}
          alt={block.image.alt || ''}
          width={600}
          crop={block.image.crop as any}
          hotspot={block.image.hotspot as any}
          mode="cover"
          className="rounded-xl shadow-lg w-full"
        />
      )}
      {hasVideo && block.video && (
        <VideoPlayer video={block.video} />
      )}
      {showPlaceholder && <VideoPlaceholder />}
    </div>
  )

  // Layout without media - centered text
  if (!hasMedia) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container">
          {ContentBlock}
        </div>
      </section>
    )
  }

  // Layout with media - two column grid
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {mediaPosition === 'left' ? (
            <>
              <div>{MediaBlock}</div>
              <div>{ContentBlock}</div>
            </>
          ) : (
            <>
              <div>{ContentBlock}</div>
              <div>{MediaBlock}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
