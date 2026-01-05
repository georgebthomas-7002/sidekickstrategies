import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import Link from 'next/link'

import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {podcastPagesSlugs, podcastQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: podcastPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: podcast} = await sanityFetch({
    query: podcastQuery,
    params,
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  // Use SEO ogImage if set, otherwise fall back to coverImage
  const ogImage = resolveOpenGraphImage(podcast?.seo?.ogImage || podcast?.coverImage)

  return {
    title: podcast?.seo?.metaTitle || podcast?.title,
    description: podcast?.seo?.metaDescription || podcast?.description,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
    ...(podcast?.seo?.noIndex && {robots: {index: false, follow: false}}),
  } satisfies Metadata
}

export default async function PodcastPage(props: Props) {
  const params = await props.params
  const [{data: podcast}] = await Promise.all([sanityFetch({query: podcastQuery, params})])

  if (!podcast?._id) {
    return notFound()
  }

  const episodeLabel = podcast.seasonNumber
    ? `Season ${podcast.seasonNumber}, Episode ${podcast.episodeNumber}`
    : podcast.episodeNumber
      ? `Episode ${podcast.episodeNumber}`
      : ''

  return (
    <div className="container py-12 lg:py-24">
      <Link
        href="/podcasts"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Podcasts
      </Link>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {episodeLabel && (
                <span className="text-sm font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded">
                  {episodeLabel}
                </span>
              )}
              {podcast.duration && (
                <span className="text-sm text-gray-500">{podcast.duration}</span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {podcast.title}
            </h1>
            {podcast.description && (
              <p className="text-xl text-gray-600">{podcast.description}</p>
            )}
          </div>

          {podcast.transistorUrl && (
            <div className="mb-12 bg-gray-100 rounded-lg p-4">
              <iframe
                src={podcast.transistorUrl}
                width="100%"
                height="180"
                frameBorder="0"
                scrolling="no"
                seamless
                className="rounded-lg"
                title={`Listen to ${podcast.title}`}
              />
            </div>
          )}

          {podcast.showNotes && podcast.showNotes.length > 0 && (
            <div className="prose prose-lg max-w-none">
              <h2>Show Notes</h2>
              <PortableText value={podcast.showNotes as PortableTextBlock[]} />
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          {podcast.coverImage?.asset?._ref && (
            <Image
              id={podcast.coverImage.asset._ref}
              alt={podcast.coverImage.alt || podcast.title}
              width={400}
              height={400}
              crop={podcast.coverImage.crop as any}
              mode="cover"
              className="w-full rounded-lg mb-6"
            />
          )}

          {((podcast.hosts && podcast.hosts.length > 0) || (podcast.guests && podcast.guests.length > 0)) && (
            <div className="bg-gray-50 rounded-lg p-6">
              {podcast.hosts && podcast.hosts.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Hosted by</h3>
                  <div className="space-y-3">
                    {podcast.hosts.map((host, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {host.picture?.asset?._ref && (
                          <Image
                            id={host.picture.asset._ref}
                            alt={`${host.firstName} ${host.lastName}`}
                            width={48}
                            height={48}
                            mode="cover"
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <span>{host.firstName} {host.lastName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {podcast.guests && podcast.guests.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Guests</h3>
                  <div className="space-y-3">
                    {podcast.guests.map((guest, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {guest.picture?.asset?._ref && (
                          <Image
                            id={guest.picture.asset._ref}
                            alt={`${guest.firstName} ${guest.lastName}`}
                            width={48}
                            height={48}
                            mode="cover"
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <span>{guest.firstName} {guest.lastName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {podcast.tags && podcast.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {podcast.tags?.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
