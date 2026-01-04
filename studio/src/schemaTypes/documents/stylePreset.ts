import {defineField, defineType} from 'sanity'
import {ControlsIcon} from '@sanity/icons'

/**
 * Style Preset - Reusable saved style configurations.
 * Editors can create presets like "Dark Hero", "Accent CTA" and apply them to blocks.
 */
export const stylePreset = defineType({
  name: 'stylePreset',
  title: 'Style Preset',
  type: 'document',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Preset Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., "Dark Hero", "Accent CTA", "Minimal Testimonial"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief description of when to use this preset',
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      description: 'Screenshot of how this preset looks',
    }),
    defineField({
      name: 'applicableBlocks',
      title: 'Applicable Block Types',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'All Blocks', value: 'all'},
          {title: 'Hero', value: 'hero'},
          {title: 'Call to Action', value: 'callToAction'},
          {title: 'Info Section', value: 'infoSection'},
          {title: 'Featured Articles', value: 'featuredArticles'},
          {title: 'Featured Podcasts', value: 'featuredPodcasts'},
          {title: 'Downloads Grid', value: 'downloadsGrid'},
          {title: 'Testimonial', value: 'testimonial'},
          {title: 'Team Grid', value: 'teamGrid'},
          {title: 'Contact Form', value: 'contactForm'},
          {title: 'FAQ Accordion', value: 'faqAccordion'},
        ],
      },
      description: 'Which block types can use this preset',
    }),
    defineField({
      name: 'settings',
      title: 'Style Settings',
      type: 'sectionSettings',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'previewImage',
    },
  },
})
