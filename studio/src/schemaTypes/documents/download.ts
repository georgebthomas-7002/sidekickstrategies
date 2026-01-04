import {DownloadIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

/**
 * Download schema. Define and edit the fields for downloadable resources.
 * Supports both gated (email required) and ungated downloads.
 */

export const download = defineType({
  name: 'download',
  title: 'Download',
  icon: DownloadIcon,
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'file', title: 'File'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
      options: {
        canvasApp: {
          purpose: 'Resource title - clear value proposition',
        },
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for this download',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Detailed description of the download',
      group: 'content',
      options: {
        canvasApp: {
          purpose: 'Resource description explaining what users will learn',
        },
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief description for listings',
      group: 'content',
      options: {
        canvasApp: {
          purpose: 'Brief summary for resource listings (150-200 chars)',
        },
      },
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      description: 'The downloadable file (PDF, eBook, etc.)',
      options: {
        accept: '.pdf,.epub,.mobi,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip',
      },
      validation: (rule) => rule.required(),
      group: 'file',
    }),
    defineField({
      name: 'fileType',
      title: 'File Type Label',
      type: 'string',
      description: 'Display label for the file type',
      options: {
        list: [
          {title: 'PDF', value: 'pdf'},
          {title: 'eBook', value: 'ebook'},
          {title: 'Whitepaper', value: 'whitepaper'},
          {title: 'Template', value: 'template'},
          {title: 'Checklist', value: 'checklist'},
          {title: 'Guide', value: 'guide'},
          {title: 'Spreadsheet', value: 'spreadsheet'},
          {title: 'Presentation', value: 'presentation'},
          {title: 'Other', value: 'other'},
        ],
      },
      group: 'file',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'eBook', value: 'ebook'},
          {title: 'Whitepaper', value: 'whitepaper'},
          {title: 'Template', value: 'template'},
          {title: 'Checklist', value: 'checklist'},
          {title: 'Guide', value: 'guide'},
          {title: 'Case Study', value: 'case-study'},
          {title: 'Research Report', value: 'research'},
          {title: 'Toolkit', value: 'toolkit'},
        ],
      },
      group: 'settings',
    }),
    defineField({
      name: 'isGated',
      title: 'Require Email',
      type: 'boolean',
      description: 'If enabled, users must provide their email to download',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
      description: 'Heading shown above the email capture form',
      hidden: ({parent}) => !parent?.isGated,
      group: 'settings',
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Description',
      type: 'text',
      rows: 2,
      description: 'Text shown below the form heading',
      hidden: ({parent}) => !parent?.isGated,
      group: 'settings',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'settings',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        canvasApp: {
          purpose: 'SEO keywords for search visibility and categorization',
        },
      },
      group: 'settings',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
      description: 'Configure how this resource appears in search results and social media. Leave blank to use thumbnail and excerpt.',
      group: 'settings',
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      isGated: 'isGated',
      date: 'publishedAt',
      media: 'thumbnail',
    },
    prepare({title, category, isGated, date, media}) {
      const subtitles = [
        category && category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
        isGated ? 'Gated' : 'Free',
        date && format(parseISO(date), 'LLL d, yyyy'),
      ].filter(Boolean)

      return {
        title,
        media,
        subtitle: subtitles.join(' • '),
      }
    },
  },
})
