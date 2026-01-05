import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Portal Client schema.
 * Stores client-specific portal configuration including branding,
 * welcome messages, and enabled features.
 */
export const portalClient = defineType({
  name: 'portalClient',
  title: 'Portal Client',
  icon: UsersIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: 'The client company name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hubspotCompanyId',
      title: 'HubSpot Company ID',
      type: 'string',
      description: 'The HubSpot company ID for mapping',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      description: 'Optional logo to display in the portal header',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      description: 'Optional brand color (hex code, e.g., #1a365d)',
      validation: (rule) => rule.regex(/^#[0-9A-Fa-f]{6}$/, {name: 'hex color'}),
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'text',
      description: 'Custom welcome message shown on the dashboard',
      rows: 3,
    }),
    defineField({
      name: 'tier',
      title: 'Portal Tier',
      type: 'string',
      description: 'The service tier for this client',
      options: {
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'Premium', value: 'premium'},
          {title: 'Enterprise', value: 'enterprise'},
        ],
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'features',
      title: 'Enabled Features',
      type: 'object',
      description: 'Toggle which features are available for this client',
      fields: [
        defineField({
          name: 'askForHelp',
          title: 'Ask for Help',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'projectStatus',
          title: 'Project Status',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'billing',
          title: 'Billing & Invoices',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'meetings',
          title: 'Meeting Scheduling',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'resources',
          title: 'Resource Library',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'announcements',
      title: 'Announcements',
      type: 'array',
      description: 'Client-specific announcements to show in the portal',
      of: [
        {
          type: 'object',
          name: 'announcement',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'message',
              title: 'Message',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Info', value: 'info'},
                  {title: 'Success', value: 'success'},
                  {title: 'Warning', value: 'warning'},
                ],
              },
              initialValue: 'info',
            }),
            defineField({
              name: 'expiresAt',
              title: 'Expires At',
              type: 'datetime',
              description: 'When to stop showing this announcement',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type',
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: selection.type,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this client portal configuration is active',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      tier: 'tier',
      isActive: 'isActive',
      logo: 'logo',
    },
    prepare(selection) {
      const status = selection.isActive ? '' : ' (Inactive)'
      return {
        title: selection.title + status,
        subtitle: `${selection.tier || 'standard'} tier`,
        media: selection.logo,
      }
    },
  },
})
