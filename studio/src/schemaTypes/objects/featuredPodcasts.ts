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
      initialValue: 'Latest Episodes',
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
          {title: 'Latest Episodes', value: 'latest'},
          {title: 'Selected Episodes', value: 'selected'},
        ],
        layout: 'radio',
      },
      initialValue: 'latest',
      group: 'content',
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
      group: 'content',
    }),
    defineField({
      name: 'limit',
      title: 'Number of Episodes',
      type: 'number',
      description: 'How many episodes to display (for Latest mode)',
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
          {title: 'List with Player', value: 'list'},
          {title: 'Featured Episode + List', value: 'featured'},
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
      initialValue: 'View All Episodes',
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
        title: title || 'Featured Podcasts',
        subtitle: `Featured Podcasts • ${displayMode === 'latest' ? 'Latest' : 'Selected'}`,
      }
    },
  },
})
