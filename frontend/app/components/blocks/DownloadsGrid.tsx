import Link from 'next/link'
import Image from '@/app/components/SanityImage'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type DownloadsGridProps = {
  block: ExtractPageBuilderType<'downloadsGrid'>
  index: number
  pageType: string
  pageId: string
}

export default function DownloadsGrid({block}: DownloadsGridProps) {
  const {
    heading,
    subheading,
    downloads,
    layout = 'grid-3',
    showButton,
    buttonText = 'View All Resources',
  } = block

  const gridClasses = {
    'grid-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    'grid-2': 'grid-cols-1 md:grid-cols-2',
    list: 'grid-cols-1',
  }

  return (
    <section className="py-16 bg-gray-50">
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
          className={`grid gap-6 ${gridClasses[layout as keyof typeof gridClasses] || gridClasses['grid-3']}`}
        >
          {downloads?.map((download: any, idx: number) => (
            <DownloadCard key={download._key || idx} download={download} />
          ))}
        </div>

        {showButton && (
          <div className="text-center mt-12">
            <Link
              href="/resources"
              className="inline-block rounded-full font-mono text-sm bg-accent-500 text-white hover:bg-accent-600 py-3 px-8 transition-colors duration-200"
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

function DownloadCard({download}: {download: any}) {
  const title = download.title || 'Untitled'
  const slug = download.slug?.current || download.slug
  const thumbnail = download.thumbnail
  const excerpt = download.excerpt
  const category = download.category
  const fileType = download.fileType
  const isGated = download.isGated

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

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {thumbnail?.asset?._ref && (
        <Link href={`/resources/${slug}`}>
          <Image
            id={thumbnail.asset._ref}
            alt={thumbnail.alt || title}
            width={400}
            height={200}
            crop={thumbnail.crop}
            mode="cover"
            className="w-full h-40 object-cover"
          />
        </Link>
      )}
      <div className="p-5">
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
          {isGated && (
            <span className="text-xs font-mono text-blue-600 ml-auto">
              Free with email
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2">
          <Link href={`/resources/${slug}`} className="hover:text-gray-600">
            {title}
          </Link>
        </h3>
        {excerpt && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{excerpt}</p>
        )}
        <Link
          href={`/resources/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600"
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
          {isGated ? 'Get Download' : 'Download Now'}
        </Link>
      </div>
    </article>
  )
}
