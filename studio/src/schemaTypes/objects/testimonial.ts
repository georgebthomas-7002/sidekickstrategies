import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons'

/**
 * Testimonial block for page builder.
 * Displays customer quotes with attribution.
 */

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string',
      description: 'e.g., "CEO at Company"',
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      description: 'Optional company or organization logo',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Optional star rating (1-5)',
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Accent', value: 'accent'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'authorName',
      media: 'authorImage',
    },
    prepare({quote, author, media}) {
      const truncatedQuote = quote?.length > 50 ? `${quote.substring(0, 50)}...` : quote
      return {
        title: truncatedQuote || 'Untitled Testimonial',
        subtitle: `Testimonial • ${author || 'Unknown author'}`,
        media,
      }
    },
  },
})
