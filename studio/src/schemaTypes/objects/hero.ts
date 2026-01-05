import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

/**
 * Hero section block for page builder.
 * Large banner with headline, subtitle, CTA buttons, and optional background.
 */

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: HomeIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'design', title: 'Design'},
    {name: 'section', title: 'Section Settings'},
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the headline',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
      options: {
        canvasApp: {
          purpose: 'Main page headline (H1) - should be compelling and SEO-friendly',
        },
      },
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      group: 'content',
      options: {
        canvasApp: {
          purpose: 'Supporting text that expands on the headline',
        },
      },
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'button',
      group: 'content',
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'button',
      group: 'content',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
      group: 'media',
    }),
    defineField({
      name: 'foregroundImage',
      title: 'Foreground Image',
      type: 'image',
      description: 'Optional image displayed alongside the content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
      group: 'media',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Large (Full Height)', value: 'large'},
          {title: 'Medium', value: 'medium'},
          {title: 'Small', value: 'small'},
        ],
        layout: 'radio',
      },
      initialValue: 'large',
      group: 'design',
    }),
    defineField({
      name: 'alignment',
      title: 'Content Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
      group: 'design',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Kinetic (Tech-Forward)', value: 'kinetic'},
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
          {title: 'Centered Content', value: 'centered'},
          {title: 'Left Content + Right Image', value: 'split-left'},
          {title: 'Right Content + Left Image', value: 'split-right'},
          {title: 'Overlay on Background', value: 'overlay'},
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
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
      title: 'heading',
      subtitle: 'subheading',
      media: 'backgroundImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled Hero',
        subtitle: 'Hero Section',
        media,
      }
    },
  },
})
