import type {Metadata} from 'next'
import Link from 'next/link'

import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {allDownloadsQuery} from '@/sanity/lib/queries'
import type {AllDownloadsQueryResult} from '@/sanity.types'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Download free guides, templates, and resources',
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

export default async function ResourcesPage() {
  const {data: downloads} = await sanityFetch({
    query: allDownloadsQuery,
  })

  return (
    <div className="container py-12 lg:py-24">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
        <p className="text-lg text-gray-600">
          Download free guides, templates, eBooks, and other resources to help you succeed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloads?.map((download) => (
          <DownloadCard key={download._id} download={download} />
        ))}

        {(!downloads || downloads.length === 0) && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No resources available yet. Check back soon!
          </div>
        )}
      </div>
    </div>
  )
}

function DownloadCard({download}: {download: AllDownloadsQueryResult[number]}) {
  const {title, slug, thumbnail, excerpt, category, fileType, isGated} = download

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {thumbnail?.asset?._ref && (
        <Link href={`/resources/${slug}`}>
          <Image
            id={thumbnail.asset._ref}
            alt={thumbnail.alt || title}
            width={400}
            height={200}
            crop={thumbnail.crop as any}
            mode="cover"
            className="w-full h-48 object-cover"
          />
        </Link>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          {category && (
            <span className="text-xs font-mono uppercase text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {categoryLabels[category] || category}
            </span>
          )}
          {fileType && (
            <span className="text-xs font-mono uppercase text-gray-500">
              {fileType.toUpperCase()}
            </span>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-3">
          <Link href={`/resources/${slug}`} className="hover:text-gray-600">
            {title}
          </Link>
        </h2>
        {excerpt && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{excerpt}</p>
        )}
        <Link
          href={`/resources/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 mt-auto"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {isGated ? 'Get Free Download' : 'Download Now'}
        </Link>
      </div>
    </article>
  )
}
