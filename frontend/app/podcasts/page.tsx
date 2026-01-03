import type {Metadata} from 'next'
import Link from 'next/link'

import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {allPodcastsQuery} from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Podcasts',
  description: 'Listen to our latest podcast episodes',
}

export default async function PodcastsPage() {
  const {data: podcasts} = await sanityFetch({
    query: allPodcastsQuery,
  })

  return (
    <div className="container py-12 lg:py-24">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Podcasts</h1>
        <p className="text-lg text-gray-600">
          Listen to our latest episodes and stay up to date with the latest insights.
        </p>
      </div>

      <div className="grid gap-6">
        {podcasts?.map((podcast: any) => (
          <PodcastCard key={podcast._id} podcast={podcast} />
        ))}

        {(!podcasts || podcasts.length === 0) && (
          <div className="text-center py-12 text-gray-500">
            No podcast episodes yet. Check back soon!
          </div>
        )}
      </div>
    </div>
  )
}

function PodcastCard({podcast}: {podcast: any}) {
  const {
    title,
    slug,
    description,
    coverImage,
    duration,
    episodeNumber,
    seasonNumber,
    publishedAt,
  } = podcast

  const episodeLabel = seasonNumber
    ? `S${seasonNumber}E${episodeNumber}`
    : episodeNumber
      ? `Episode ${episodeNumber}`
      : ''

  return (
    <article className="flex gap-6 p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      {coverImage?.asset?._ref ? (
        <Link href={`/podcasts/${slug}`} className="flex-shrink-0">
          <Image
            id={coverImage.asset._ref}
            alt={coverImage.alt || title}
            width={160}
            height={160}
            crop={coverImage.crop}
            mode="cover"
            className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover"
          />
        </Link>
      ) : (
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          {episodeLabel && (
            <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {episodeLabel}
            </span>
          )}
          {duration && <span className="text-sm text-gray-500">{duration}</span>}
        </div>
        <h2 className="text-xl md:text-2xl font-semibold mb-3">
          <Link href={`/podcasts/${slug}`} className="hover:text-gray-600">
            {title}
          </Link>
        </h2>
        {description && (
          <p className="text-gray-600 line-clamp-2 mb-4">{description}</p>
        )}
        <Link
          href={`/podcasts/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          Listen Now
        </Link>
      </div>
    </article>
  )
}
