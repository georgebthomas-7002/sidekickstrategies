import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const podcastFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  description,
  coverImage,
  transistorUrl,
  transistorEpisodeId,
  duration,
  episodeNumber,
  seasonNumber,
  "publishedAt": coalesce(publishedAt, _updatedAt),
  "guests": guests[]->{firstName, lastName, picture},
  "hosts": hosts[]->{firstName, lastName, picture},
  tags,
`

const downloadFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  thumbnail,
  "file": file.asset->url,
  fileType,
  category,
  isGated,
  formHeading,
  formDescription,
  "publishedAt": coalesce(publishedAt, _updatedAt),
  tags,
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      _type == "hero" => {
        ...,
        primaryButton {
          ...,
          ${linkFields}
        },
        secondaryButton {
          ...,
          ${linkFields}
        }
      },
      _type == "featuredArticles" => {
        ...,
        "articles": select(
          displayMode == "selected" => articles[]->{${postFields}},
          displayMode == "latest" => *[_type == "post" && defined(slug.current)] | order(date desc) [0...12] {${postFields}}
        )
      },
      _type == "featuredPodcasts" => {
        ...,
        "episodes": select(
          displayMode == "selected" => episodes[]->{${podcastFields}},
          displayMode == "latest" => *[_type == "podcast" && defined(slug.current)] | order(publishedAt desc) [0...12] {${podcastFields}}
        )
      },
      _type == "downloadsGrid" => {
        ...,
        "downloads": select(
          displayMode == "selected" => downloads[]->{${downloadFields}},
          displayMode == "category" => *[_type == "download" && defined(slug.current) && category == ^.category] | order(publishedAt desc) [0...12] {${downloadFields}},
          displayMode == "latest" => *[_type == "download" && defined(slug.current)] | order(publishedAt desc) [0...12] {${downloadFields}}
        )
      },
      _type == "teamGrid" => {
        ...,
        "members": select(
          displayMode == "selected" => members[]->{firstName, lastName, picture},
          displayMode == "all" => *[_type == "person"] {firstName, lastName, picture}
        )
      },
      _type == "faqAccordion" => {
        ...,
        items[]{
          ...,
          answer[]{
            ...,
            markDefs[]{
              ...,
              ${linkReference}
            }
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...5] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// Podcast queries
export const allPodcastsQuery = defineQuery(`
  *[_type == "podcast" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc) {
    ${podcastFields}
  }
`)

export const podcastQuery = defineQuery(`
  *[_type == "podcast" && slug.current == $slug] [0] {
    ${podcastFields}
    showNotes[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    }
  }
`)

export const podcastPagesSlugs = defineQuery(`
  *[_type == "podcast" && defined(slug.current)]
  {"slug": slug.current}
`)

// Download queries
export const allDownloadsQuery = defineQuery(`
  *[_type == "download" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc) {
    ${downloadFields}
  }
`)

export const downloadQuery = defineQuery(`
  *[_type == "download" && slug.current == $slug] [0] {
    ${downloadFields}
    description[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    }
  }
`)

export const downloadPagesSlugs = defineQuery(`
  *[_type == "download" && defined(slug.current)]
  {"slug": slug.current}
`)
