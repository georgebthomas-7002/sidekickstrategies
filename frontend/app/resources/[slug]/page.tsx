import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import Link from 'next/link'

import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {downloadPagesSlugs, downloadQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import DownloadForm from './DownloadForm'

type Props = {
  params: Promise<{slug: string}>
}

const categoryLabels: Record<string, string> = {
  ebook: 'eBook',
  whitepaper: 'Whitepaper',
  template: 'Template',
  checklist: 'Checklist',
  guide: 'Guide',
  'case-study': 'Case Study',
  research: 'Research',
  toolkit: 'Toolkit',
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: downloadPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: download} = await sanityFetch({
    query: downloadQuery,
    params,
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(download?.thumbnail)

  return {
    title: download?.title,
    description: download?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function ResourcePage(props: Props) {
  const params = await props.params
  const [{data: download}] = await Promise.all([sanityFetch({query: downloadQuery, params})])

  if (!download?._id) {
    return notFound()
  }

  return (
    <div className="container py-12 lg:py-24">
      <Link
        href="/resources"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Resources
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="flex items-center gap-3 mb-4">
            {download.category && (
              <span className="text-sm font-mono uppercase text-gray-600 bg-gray-100 px-3 py-1 rounded">
                {categoryLabels[download.category] || download.category}
              </span>
            )}
            {download.fileType && (
              <span className="text-sm font-mono uppercase text-gray-500">
                {download.fileType.toUpperCase()}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {download.title}
          </h1>

          {download.excerpt && (
            <p className="text-xl text-gray-600 mb-8">{download.excerpt}</p>
          )}

          {download.thumbnail?.asset?._ref && (
            <Image
              id={download.thumbnail.asset._ref}
              alt={download.thumbnail.alt || download.title}
              width={600}
              height={400}
              crop={download.thumbnail.crop as any}
              hotspot={download.thumbnail.hotspot as any}
              mode="cover"
              className="w-full rounded-lg mb-8"
            />
          )}

          {download.description && download.description.length > 0 && (
            <div className="prose prose-lg max-w-none mb-8">
              <PortableText value={download.description as PortableTextBlock[]} />
            </div>
          )}

          {download.tags && download.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {download.tags?.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-8">
          <DownloadForm
            isGated={download.isGated || false}
            fileUrl={download.file || ''}
            fileType={download.fileType || undefined}
            formHeading={download.formHeading || undefined}
            formDescription={download.formDescription || undefined}
          />
        </div>
      </div>
    </div>
  )
}
