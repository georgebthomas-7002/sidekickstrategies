import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

/**
 * Featured Articles block for page builder.
 * Displays a grid of selected or latest articles.
 */

export const featuredArticles = defineType({
  name: 'featuredArticles',
  title: 'Featured Articles',
  type: 'object',
  icon: DocumentsIcon,
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
      initialValue: 'Latest Articles',
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          {title: 'Latest Articles', value: 'latest'},
          {title: 'Selected Articles', value: 'selected'},
        ],
        layout: 'radio',
      },
      initialValue: 'latest',
      group: 'content',
    }),
    defineField({
      name: 'articles',
      title: 'Selected Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      hidden: ({parent}) => parent?.displayMode !== 'selected',
      validation: (rule) =>
        rule.custom((articles, context) => {
          const parent = context.parent as {displayMode?: string}
          if (parent?.displayMode === 'selected' && (!articles || articles.length === 0)) {
            return 'Please select at least one article'
          }
          return true
        }),
      group: 'content',
    }),
    defineField({
      name: 'limit',
      title: 'Number of Articles',
      type: 'number',
      description: 'How many articles to display (for Latest mode)',
      initialValue: 3,
      hidden: ({parent}) => parent?.displayMode !== 'latest',
      validation: (rule) => rule.min(1).max(12),
      group: 'content',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid (3 columns)', value: 'grid-3'},
          {title: 'Grid (2 columns)', value: 'grid-2'},
          {title: 'List', value: 'list'},
          {title: 'Featured + Grid', value: 'featured'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid-3',
      group: 'display',
    }),
    defineField({
      name: 'showButton',
      title: 'Show View All Button',
      type: 'boolean',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'View All Articles',
      hidden: ({parent}) => !parent?.showButton,
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
      displayMode: 'displayMode',
    },
    prepare({title, displayMode}) {
      return {
        title: title || 'Featured Articles',
        subtitle: `Featured Articles • ${displayMode === 'latest' ? 'Latest' : 'Selected'}`,
      }
    },
  },
})
