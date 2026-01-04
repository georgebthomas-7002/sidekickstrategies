import {defineField, defineType} from 'sanity'
import {DownloadIcon} from '@sanity/icons'

/**
 * Downloads Grid block for page builder.
 * Displays a grid of downloadable resources.
 */

export const downloadsGrid = defineType({
  name: 'downloadsGrid',
  title: 'Downloads Grid',
  type: 'object',
  icon: DownloadIcon,
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
      initialValue: 'Resources',
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
          {title: 'Latest Downloads', value: 'latest'},
          {title: 'Selected Downloads', value: 'selected'},
          {title: 'By Category', value: 'category'},
        ],
        layout: 'radio',
      },
      initialValue: 'latest',
      group: 'content',
    }),
    defineField({
      name: 'downloads',
      title: 'Selected Downloads',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'download'}]}],
      hidden: ({parent}) => parent?.displayMode !== 'selected',
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Filter by Category',
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
      hidden: ({parent}) => parent?.displayMode !== 'category',
      group: 'content',
    }),
    defineField({
      name: 'limit',
      title: 'Number of Downloads',
      type: 'number',
      description: 'How many downloads to display',
      initialValue: 6,
      hidden: ({parent}) => parent?.displayMode === 'selected',
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
      initialValue: 'View All Resources',
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
      category: 'category',
    },
    prepare({title, displayMode, category}) {
      const mode =
        displayMode === 'category'
          ? category || 'Category'
          : displayMode === 'latest'
            ? 'Latest'
            : 'Selected'
      return {
        title: title || 'Downloads Grid',
        subtitle: `Downloads Grid • ${mode}`,
      }
    },
  },
})
