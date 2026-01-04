import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import Link from 'next/link'

import Avatar from '@/app/components/Avatar'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: postPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: post} = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  // Use SEO ogImage if set, otherwise fall back to coverImage
  const ogImage = resolveOpenGraphImage(post?.seo?.ogImage || post?.coverImage)

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{name: `${post.author.firstName} ${post.author.lastName}`}]
        : [],
    title: post?.seo?.metaTitle || post?.title,
    description: post?.seo?.metaDescription || post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
    ...(post?.seo?.noIndex && {robots: {index: false, follow: false}}),
  } satisfies Metadata
}

export default async function ArticlePage(props: Props) {
  const params = await props.params
  const [{data: post}] = await Promise.all([sanityFetch({query: postQuery, params})])

  if (!post?._id) {
    return notFound()
  }

  return (
    <div className="container py-12 lg:py-24">
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Articles
      </Link>

      <article className="max-w-3xl">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          {post.author && post.author.firstName && post.author.lastName && (
            <div className="flex items-center gap-4">
              <Avatar person={post.author as any} date={post.date} />
            </div>
          )}
        </header>

        {post?.coverImage?.asset?._ref && (
          <Image
            id={post.coverImage.asset._ref}
            alt={post.coverImage.alt || ''}
            className="rounded-lg w-full mb-8"
            width={1024}
            height={538}
            mode="cover"
            hotspot={post.coverImage.hotspot as any}
            crop={post.coverImage.crop as any}
          />
        )}

        {post.content?.length && (
          <div className="prose prose-lg max-w-none">
            <PortableText
              className="prose-headings:font-medium prose-headings:tracking-tight"
              value={post.content as PortableTextBlock[]}
            />
          </div>
        )}
      </article>
    </div>
  )
}
