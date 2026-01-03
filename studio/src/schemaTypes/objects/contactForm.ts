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
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Get in Touch',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
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
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Message',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      initialValue: "Thanks for reaching out! We'll get back to you soon.",
    }),
    defineField({
      name: 'showContactInfo',
      title: 'Show Contact Info',
      type: 'boolean',
      description: 'Display email, phone, and address alongside the form',
      initialValue: true,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
      hidden: ({parent}) => !parent?.showContactInfo,
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      hidden: ({parent}) => !parent?.showContactInfo,
    }),
    defineField({
      name: 'contactAddress',
      title: 'Contact Address',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => !parent?.showContactInfo,
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
