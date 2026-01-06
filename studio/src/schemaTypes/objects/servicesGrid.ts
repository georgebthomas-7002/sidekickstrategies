import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

/**
 * Services Grid block for page builder.
 * Displays a grid of service offerings with categories.
 */

export const servicesGrid = defineType({
  name: 'servicesGrid',
  title: 'Services Grid',
  type: 'object',
  icon: BulbOutlineIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'display', title: 'Display'},
    {name: 'section', title: 'Section Settings'},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      group: 'content',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'serviceItem',
          title: 'Service',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              description: 'Group services by category (e.g., "HubSpot Operations", "Content Services")',
            }),
            defineField({
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Icon identifier (e.g., "hubspot", "content", "strategy")',
            }),
            defineField({
              name: 'ctaText',
              title: 'CTA Button Text',
              type: 'string',
            }),
            defineField({
              name: 'ctaLink',
              title: 'CTA Link',
              type: 'url',
              validation: (rule) =>
                rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              category: 'category',
            },
            prepare({title, category}) {
              return {
                title: title || 'Untitled Service',
                subtitle: category || 'No category',
              }
            },
          },
        },
      ],
    }),
    // Display options
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid (4 columns)', value: 'grid-4'},
          {title: 'Grid (3 columns)', value: 'grid-3'},
          {title: 'Grid (2 columns)', value: 'grid-2'},
          {title: 'List with Categories', value: 'categorized'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid-4',
      group: 'display',
    }),
    defineField({
      name: 'showCategories',
      title: 'Show Category Headers',
      type: 'boolean',
      description: 'Display category headers to group services',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Card Style',
      type: 'string',
      options: {
        list: [
          {title: 'Elevated (with shadow)', value: 'elevated'},
          {title: 'Bordered', value: 'bordered'},
          {title: 'Minimal', value: 'minimal'},
        ],
        layout: 'radio',
      },
      initialValue: 'bordered',
      group: 'display',
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
      title: 'heading',
      services: 'services',
    },
    prepare({title, services}) {
      const count = services?.length || 0
      return {
        title: title || 'Services Grid',
        subtitle: `Services Grid • ${count} service${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
