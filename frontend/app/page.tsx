import type {Metadata} from 'next'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'

/**
 * Generate metadata for the home page.
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: 'home'},
    stega: false,
  })

  return {
    title: page?.name || 'Home',
    description: page?.heading,
  } satisfies Metadata
}

export default async function HomePage() {
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: 'home'},
  })

  if (!page?._id) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Sidekick Strategies</h1>
        <p className="text-gray-600 mb-8">
          Create a page in Sanity with slug "home" to customize this page.
        </p>
        <a
          href="https://sidekick-strategies.sanity.studio/"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Sanity Studio
        </a>
      </div>
    )
  }

  return (
    <div>
      {/* Optional: Show heading/subheading at top */}
      {page.heading && (
        <div className="container py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl">{page.heading}</h1>
            {page.subheading && (
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                {page.subheading}
              </p>
            )}
          </div>
        </div>
      )}
      <PageBuilderPage page={page as GetPageQueryResult} />
    </div>
  )
}
