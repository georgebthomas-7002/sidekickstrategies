import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

/**
 * Section Settings - Reusable styling options for any page builder block.
 * Provides layout, background, spacing, and advanced styling controls.
 */
export const sectionSettings = defineType({
  name: 'sectionSettings',
  title: 'Section Settings',
  type: 'object',
  icon: CogIcon,
  groups: [
    {name: 'layout', title: 'Layout', default: true},
    {name: 'background', title: 'Background'},
    {name: 'spacing', title: 'Spacing'},
    {name: 'advanced', title: 'Advanced'},
  ],
  fields: [
    // LAYOUT
    defineField({
      name: 'containerWidth',
      title: 'Container Width',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Wide (1400px)', value: 'wide'},
          {title: 'Default (1200px)', value: 'default'},
          {title: 'Narrow (800px)', value: 'narrow'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      group: 'layout',
    }),
    defineField({
      name: 'contentAlignment',
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
      initialValue: 'left',
      group: 'layout',
    }),

    // BACKGROUND
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'None/Transparent', value: 'transparent'},
          {title: 'White', value: 'white'},
          {title: 'Light Gray', value: 'gray-50'},
          {title: 'Gray', value: 'gray-100'},
          {title: 'Dark Gray', value: 'gray-900'},
          {title: 'Primary (Dark Blue)', value: 'primary'},
          {title: 'Secondary (Teal)', value: 'secondary'},
          {title: 'Accent (Orange)', value: 'accent'},
        ],
      },
      initialValue: 'transparent',
      group: 'background',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
      group: 'background',
    }),
    defineField({
      name: 'backgroundOverlay',
      title: 'Background Overlay',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Light (20%)', value: 'light'},
          {title: 'Medium (50%)', value: 'medium'},
          {title: 'Dark (80%)', value: 'dark'},
        ],
      },
      initialValue: 'none',
      hidden: ({parent}) => !parent?.backgroundImage,
      group: 'background',
    }),

    // SPACING
    defineField({
      name: 'paddingTop',
      title: 'Padding Top',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: '0'},
          {title: 'Small (24px)', value: 'sm'},
          {title: 'Medium (48px)', value: 'md'},
          {title: 'Large (96px)', value: 'lg'},
          {title: 'Extra Large (128px)', value: 'xl'},
        ],
        layout: 'radio',
      },
      initialValue: 'md',
      group: 'spacing',
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Padding Bottom',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: '0'},
          {title: 'Small (24px)', value: 'sm'},
          {title: 'Medium (48px)', value: 'md'},
          {title: 'Large (96px)', value: 'lg'},
          {title: 'Extra Large (128px)', value: 'xl'},
        ],
        layout: 'radio',
      },
      initialValue: 'md',
      group: 'spacing',
    }),

    // ADVANCED (for developers)
    defineField({
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
      description: 'HTML ID for anchor links or custom styling (e.g., "hero-section")',
      group: 'advanced',
    }),
    defineField({
      name: 'customClasses',
      title: 'Custom CSS Classes',
      type: 'string',
      description: 'Space-separated CSS classes for custom styling (e.g., "animate-fade-in gradient-bg")',
      group: 'advanced',
    }),
    defineField({
      name: 'dataAttributes',
      title: 'Data Attributes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'key', type: 'string', title: 'Attribute Name'}),
            defineField({name: 'value', type: 'string', title: 'Value'}),
          ],
          preview: {
            select: {key: 'key', value: 'value'},
            prepare({key, value}) {
              return {title: `data-${key}="${value}"`}
            },
          },
        },
      ],
      description: 'Custom data-* attributes for JavaScript/analytics',
      group: 'advanced',
    }),
  ],
})
