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
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'design', title: 'Design'},
    {name: 'section', title: 'Section Settings'},
  ],
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string',
      description: 'e.g., "CEO at Company"',
      group: 'content',
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      description: 'Optional company or organization logo',
      group: 'content',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Optional star rating (1-5)',
      validation: (rule) => rule.min(1).max(5),
      group: 'content',
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
      group: 'design',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Card Style', value: 'card'},
          {title: 'Large Quote', value: 'large-quote'},
          {title: 'Minimal', value: 'minimal'},
          {title: 'With Photo Left', value: 'photo-left'},
          {title: 'With Photo Right', value: 'photo-right'},
        ],
        layout: 'radio',
      },
      initialValue: 'card',
      group: 'design',
    }),
    // Section Settings
    defineField({
      name: 'stylePreset',
      title: 'Style Preset',
      type: 'reference',
      to: [{type: 'stylePreset'}],
      description: 'Apply a saved style preset, or customize below',
      group: 'section',
    }),
    defineField({
      name: 'sectionSettings',
      title: 'Custom Section Settings',
      type: 'sectionSettings',
      description: 'Override preset settings or customize from scratch',
      group: 'section',
      options: {
        collapsible: true,
        collapsed: true,
      },
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
