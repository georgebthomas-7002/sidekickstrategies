import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

/**
 * Team Grid block for page builder.
 * Displays team members from the Person document type.
 */

export const teamGrid = defineType({
  name: 'teamGrid',
  title: 'Team Grid',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Our Team',
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
          {title: 'All Team Members', value: 'all'},
          {title: 'Selected Members', value: 'selected'},
        ],
        layout: 'radio',
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'members',
      title: 'Selected Team Members',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      hidden: ({parent}) => parent?.displayMode !== 'selected',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid (4 columns)', value: 'grid-4'},
          {title: 'Grid (3 columns)', value: 'grid-3'},
          {title: 'Grid (2 columns)', value: 'grid-2'},
          {title: 'List', value: 'list'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid-4',
    }),
    defineField({
      name: 'showBio',
      title: 'Show Bio',
      type: 'boolean',
      description: 'Display team member bios if available',
      initialValue: false,
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Show Social Links',
      type: 'boolean',
      description: 'Display social media links if available',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      displayMode: 'displayMode',
    },
    prepare({title, displayMode}) {
      return {
        title: title || 'Team Grid',
        subtitle: `Team Grid • ${displayMode === 'all' ? 'All Members' : 'Selected'}`,
      }
    },
  },
})
