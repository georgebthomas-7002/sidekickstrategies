import {defineField, defineType} from 'sanity'
import {
  BulbOutlineIcon,
  ComposeSparklesIcon,
  LinkIcon,
  ImageIcon,
  ControlsIcon,
} from '@sanity/icons'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  groups: [
    {
      name: 'contents',
      icon: ComposeSparklesIcon,
      default: true,
    },
    {
      name: 'media',
      icon: ImageIcon,
    },
    {
      name: 'button',
      icon: LinkIcon,
    },
    {
      name: 'designSystem',
      icon: ControlsIcon,
    },
    {
      name: 'section',
      title: 'Section Settings',
    },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'contents',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'contents',
    }),
    defineField({
      name: 'body',
      type: 'blockContentTextOnly',
      group: 'contents',
    }),
    defineField({
      name: 'button',
      type: 'button',
      group: 'button',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'theme',
      type: 'string',
      title: 'Theme',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
      description: 'Use dark theme with white tile grid background',
      initialValue: 'light',
      group: 'designSystem',
    }),
    defineField({
      name: 'contentAlignment',
      title: 'Content Order',
      type: 'string',
      initialValue: 'textFirst',
      description: 'Does text content or image come first?',
      options: {
        list: [
          {title: 'Text then Image', value: 'textFirst'},
          {title: 'Image then Text', value: 'imageFirst'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => !Boolean(parent?.image?.asset),
      group: 'designSystem',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Image Left, Content Right', value: 'image-left'},
          {title: 'Image Right, Content Left', value: 'image-right'},
          {title: 'Image Top, Content Bottom', value: 'image-top'},
          {title: 'Content Only (No Image)', value: 'content-only'},
          {title: 'Full-width Image Background', value: 'image-background'},
        ],
        layout: 'radio',
      },
      initialValue: 'image-left',
      group: 'designSystem',
    }),
    defineField({
      name: 'imageSize',
      title: 'Image Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small (1/3)', value: 'small'},
          {title: 'Medium (1/2)', value: 'medium'},
          {title: 'Large (2/3)', value: 'large'},
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
      hidden: ({parent}) => parent?.layout === 'content-only' || parent?.layout === 'image-background',
      group: 'designSystem',
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
      image: 'image.asset',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Call to Action',
        media: image || undefined,
      }
    },
  },
})
