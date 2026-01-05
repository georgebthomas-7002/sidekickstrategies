import Link from 'next/link'
import Image from '@/app/components/SanityImage'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import {format, parseISO} from 'date-fns'
import type {Post} from '@/sanity.types'

type ArticleItem = Post

type FeaturedArticlesProps = {
  block: ExtractPageBuilderType<'featuredArticles'>
  index: number
  pageType: string
  pageId: string
}

export default function FeaturedArticles({block}: FeaturedArticlesProps) {
  const {
    heading,
    subheading,
    articles,
    layout = 'grid-3',
    showButton,
    buttonText = 'View All Articles',
  } = block

  // In a real implementation, you'd fetch articles here or pass them via the query
  // For now, we'll render the structure and rely on the GROQ query to expand references

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
          {articles?.map((article, idx) => (
            <ArticleCard key={article._id || idx} article={article as unknown as ArticleItem} />
          ))}
        </div>

        {showButton && (
          <div className="text-center mt-12">
            <Link
              href="/articles"
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

function ArticleCard({article}: {article: ArticleItem}) {
  // Handle both expanded references and basic references
  const title = article.title || 'Untitled'
  const slug = article.slug?.current || article.slug
  const coverImage = article.coverImage
  const excerpt = article.excerpt
  const date = article.date

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {coverImage?.asset?._ref && (
        <Link href={`/articles/${slug}`}>
          <Image
            id={coverImage.asset._ref}
            alt={coverImage.alt || title}
            width={400}
            height={250}
            crop={coverImage.crop as any}
            mode="cover"
            className="w-full h-48 object-cover"
          />
        </Link>
      )}
      <div className="p-6">
        {date && (
          <time className="text-sm text-gray-500 font-mono">
            {format(parseISO(date), 'MMM d, yyyy')}
          </time>
        )}
        <h3 className="text-xl font-semibold mt-2 mb-3">
          <Link href={`/articles/${slug}`} className="hover:text-gray-600">
            {title}
          </Link>
        </h3>
        {excerpt && (
          <p className="text-gray-600 line-clamp-3">{excerpt}</p>
        )}
      </div>
    </article>
  )
}
