import Link from 'next/link'
import Image from '@/app/components/SanityImage'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type FeaturedPodcastsProps = {
  block: ExtractPageBuilderType<'featuredPodcasts'>
  index: number
  pageType: string
  pageId: string
}

export default function FeaturedPodcasts({block}: FeaturedPodcastsProps) {
  const {
    heading,
    subheading,
    episodes,
    layout = 'grid-3',
    showButton,
    buttonText = 'View All Episodes',
  } = block

  const gridClasses = {
    'grid-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    'grid-2': 'grid-cols-1 md:grid-cols-2',
    list: 'grid-cols-1',
    featured: 'grid-cols-1 lg:grid-cols-3',
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          )}
          {subheading && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        <div
          className={`grid gap-8 ${gridClasses[layout as keyof typeof gridClasses] || gridClasses['grid-3']}`}
        >
          {episodes?.map((episode: any, idx: number) => (
            <PodcastCard key={episode._key || idx} episode={episode} />
          ))}
        </div>

        {showButton && (
          <div className="text-center mt-12">
            <Link
              href="/podcasts"
              className="inline-block rounded-full font-mono text-sm bg-black text-white hover:bg-gray-800 py-3 px-8 transition-colors duration-200"
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

function PodcastCard({episode}: {episode: any}) {
  const title = episode.title || 'Untitled Episode'
  const slug = episode.slug?.current || episode.slug
  const coverImage = episode.coverImage
  const description = episode.description
  const duration = episode.duration
  const episodeNumber = episode.episodeNumber

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
      <div className="flex gap-4 p-4">
        {coverImage?.asset?._ref ? (
          <Link href={`/podcasts/${slug}`} className="flex-shrink-0">
            <Image
              id={coverImage.asset._ref}
              alt={coverImage.alt || title}
              width={120}
              height={120}
              crop={coverImage.crop}
              mode="cover"
              className="w-24 h-24 rounded-lg object-cover"
            />
          </Link>
        ) : (
          <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-10 h-10 text-gray-400"
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
          <div className="flex items-center gap-2 mb-1">
            {episodeNumber && (
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                EP {episodeNumber}
              </span>
            )}
            {duration && (
              <span className="text-xs text-gray-500">{duration}</span>
            )}
          </div>
          <h3 className="font-semibold mb-2 line-clamp-2">
            <Link href={`/podcasts/${slug}`} className="hover:text-gray-600">
              {title}
            </Link>
          </h3>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </article>
  )
}
