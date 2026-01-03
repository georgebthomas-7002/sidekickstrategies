import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

/**
 * Featured Podcasts block for page builder.
 * Displays a grid of selected or latest podcast episodes.
 */

export const featuredPodcasts = defineType({
  name: 'featuredPodcasts',
  title: 'Featured Podcasts',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Latest Episodes',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          {title: 'Latest Episodes', value: 'latest'},
          {title: 'Selected Episodes', value: 'selected'},
        ],
        layout: 'radio',
      },
      initialValue: 'latest',
    }),
    defineField({
      name: 'episodes',
      title: 'Selected Episodes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'podcast'}]}],
      hidden: ({parent}) => parent?.displayMode !== 'selected',
      validation: (rule) =>
        rule.custom((episodes, context) => {
          const parent = context.parent as {displayMode?: string}
          if (parent?.displayMode === 'selected' && (!episodes || episodes.length === 0)) {
            return 'Please select at least one episode'
          }
          return true
        }),
    }),
    defineField({
      name: 'limit',
      title: 'Number of Episodes',
      type: 'number',
      description: 'How many episodes to display (for Latest mode)',
      initialValue: 3,
      hidden: ({parent}) => parent?.displayMode !== 'latest',
      validation: (rule) => rule.min(1).max(12),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid (3 columns)', value: 'grid-3'},
          {title: 'Grid (2 columns)', value: 'grid-2'},
          {title: 'List with Player', value: 'list'},
          {title: 'Featured Episode + List', value: 'featured'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid-3',
    }),
    defineField({
      name: 'showButton',
      title: 'Show View All Button',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'View All Episodes',
      hidden: ({parent}) => !parent?.showButton,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      displayMode: 'displayMode',
    },
    prepare({title, displayMode}) {
      return {
        title: title || 'Featured Podcasts',
        subtitle: `Featured Podcasts • ${displayMode === 'latest' ? 'Latest' : 'Selected'}`,
      }
    },
  },
})
