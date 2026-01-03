import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

/**
 * FAQ Accordion block for page builder.
 * Expandable Q&A section.
 */

export const faqAccordion = defineType({
  name: 'faqAccordion',
  title: 'FAQ Accordion',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          icon: HelpCircleIcon,
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: (rule) => rule.required(),
            },
            {
              name: 'answer',
              type: 'blockContent',
              title: 'Answer',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
            },
            prepare({title}) {
              return {
                title: title || 'Untitled Question',
              }
            },
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Single Column', value: 'single'},
          {title: 'Two Columns', value: 'two-column'},
        ],
        layout: 'radio',
      },
      initialValue: 'single',
    }),
    defineField({
      name: 'expandFirst',
      title: 'Expand First Item',
      type: 'boolean',
      description: 'Automatically expand the first FAQ item on page load',
      initialValue: true,
    }),
    defineField({
      name: 'allowMultiple',
      title: 'Allow Multiple Open',
      type: 'boolean',
      description: 'Allow multiple FAQ items to be open at once',
      initialValue: false,
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      items: 'items',
    },
    prepare({title, items}) {
      const count = items?.length || 0
      return {
        title: title || 'FAQ Accordion',
        subtitle: `FAQ Accordion • ${count} question${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
