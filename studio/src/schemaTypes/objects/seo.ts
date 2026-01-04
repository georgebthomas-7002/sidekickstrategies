import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

/**
 * SEO Object Schema
 * Reusable SEO fields for pages, posts, podcasts, and downloads
 * Includes meta title, description, and Open Graph image for social sharing
 */

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Sharing',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the default page title for search engines and social sharing. Leave blank to use the page/post title.',
      validation: (rule) => rule.max(60).warning('Keep under 60 characters for best results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for search engines and social sharing. Leave blank to use excerpt or default.',
      validation: (rule) => rule.max(160).warning('Keep under 160 characters for best results'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Image displayed when shared on social media. Recommended size: 1200x630px.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Describe the image for accessibility',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              const parent = context.parent as {asset?: {_ref?: string}}
              if (parent?.asset?._ref && !alt) {
                return 'Alt text is required when an image is set'
              }
              return true
            })
          },
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Enable to prevent this page from appearing in search results',
      initialValue: false,
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})
