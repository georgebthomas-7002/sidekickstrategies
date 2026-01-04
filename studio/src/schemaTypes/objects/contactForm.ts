import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

/**
 * Contact Form block for page builder.
 * Configurable contact form section.
 */

export const contactForm = defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'object',
  icon: EnvelopeIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'form', title: 'Form Settings'},
    {name: 'contact', title: 'Contact Info'},
    {name: 'design', title: 'Design'},
    {name: 'section', title: 'Section Settings'},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Get in Touch',
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
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          {title: 'Contact Form', value: 'contact'},
          {title: 'Newsletter Signup', value: 'newsletter'},
          {title: 'Consultation Request', value: 'consultation'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'contact',
      group: 'form',
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'formField',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {
              name: 'type',
              type: 'string',
              title: 'Field Type',
              options: {
                list: [
                  {title: 'Text', value: 'text'},
                  {title: 'Email', value: 'email'},
                  {title: 'Phone', value: 'tel'},
                  {title: 'Textarea', value: 'textarea'},
                  {title: 'Select', value: 'select'},
                ],
              },
            },
            {name: 'placeholder', type: 'string', title: 'Placeholder'},
            {name: 'required', type: 'boolean', title: 'Required', initialValue: false},
            {
              name: 'options',
              type: 'array',
              title: 'Options (for Select)',
              of: [{type: 'string'}],
              hidden: ({parent}) => parent?.type !== 'select',
            },
          ],
          preview: {
            select: {
              title: 'label',
              type: 'type',
              required: 'required',
            },
            prepare({title, type, required}) {
              return {
                title: title || 'Untitled Field',
                subtitle: `${type || 'text'}${required ? ' (required)' : ''}`,
              }
            },
          },
        },
      ],
      hidden: ({parent}) => parent?.formType !== 'custom',
      group: 'form',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Message',
      group: 'form',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      initialValue: "Thanks for reaching out! We'll get back to you soon.",
      group: 'form',
    }),
    defineField({
      name: 'showContactInfo',
      title: 'Show Contact Info',
      type: 'boolean',
      description: 'Display email, phone, and address alongside the form',
      initialValue: true,
      group: 'contact',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
      hidden: ({parent}) => !parent?.showContactInfo,
      group: 'contact',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      hidden: ({parent}) => !parent?.showContactInfo,
      group: 'contact',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Contact Address',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => !parent?.showContactInfo,
      group: 'contact',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
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
      formType: 'formType',
    },
    prepare({title, formType}) {
      const typeLabels: Record<string, string> = {
        contact: 'Contact',
        newsletter: 'Newsletter',
        consultation: 'Consultation',
        custom: 'Custom',
      }
      return {
        title: title || 'Contact Form',
        subtitle: `Contact Form • ${typeLabels[formType] || 'Contact'}`,
      }
    },
  },
})
