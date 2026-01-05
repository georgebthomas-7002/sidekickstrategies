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
    params: {slug: 'home-page'},
    stega: false,
  })

  return {
    title: page?.name || 'Sidekick Strategies',
  } satisfies Metadata
}

export default async function HomePage() {
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: 'home-page'},
  })

  if (!page?._id) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Sidekick Strategies</h1>
        <p className="text-gray-600 mb-8">
          Create a page in Sanity with slug &quot;home&quot; to customize this page.
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

  return <PageBuilderPage page={page as GetPageQueryResult} />
}
