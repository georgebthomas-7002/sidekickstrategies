import type {Metadata} from 'next'
import Link from 'next/link'

import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {allPostsQuery} from '@/sanity/lib/queries'
import {format, parseISO} from 'date-fns'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Read our latest articles and insights',
}

export default async function ArticlesPage() {
  const {data: posts} = await sanityFetch({
    query: allPostsQuery,
  })

  return (
    <div className="container py-12 lg:py-24">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles</h1>
        <p className="text-lg text-gray-600">
          Insights, guides, and thoughts from our team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post: any) => (
          <ArticleCard key={post._id} post={post} />
        ))}

        {(!posts || posts.length === 0) && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No articles yet. Check back soon!
          </div>
        )}
      </div>
    </div>
  )
}

function ArticleCard({post}: {post: any}) {
  const {title, slug, coverImage, excerpt, date, author} = post

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {coverImage?.asset?._ref && (
        <Link href={`/articles/${slug}`}>
          <Image
            id={coverImage.asset._ref}
            alt={coverImage.alt || title}
            width={400}
            height={250}
            crop={coverImage.crop}
            mode="cover"
            className="w-full h-48 object-cover"
          />
        </Link>
      )}
      <div className="p-6 flex-1 flex flex-col">
        {date && (
          <time className="text-sm text-gray-500 font-mono mb-2">
            {format(parseISO(date), 'MMMM d, yyyy')}
          </time>
        )}
        <h2 className="text-xl font-semibold mb-3">
          <Link href={`/articles/${slug}`} className="hover:text-gray-600">
            {title}
          </Link>
        </h2>
        {excerpt && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{excerpt}</p>
        )}
        {author && (
          <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
            {author.picture?.asset?._ref && (
              <Image
                id={author.picture.asset._ref}
                alt={`${author.firstName} ${author.lastName}`}
                width={32}
                height={32}
                mode="cover"
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-600">
              {author.firstName} {author.lastName}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
