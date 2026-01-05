import {LockIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Portal Session schema.
 * Stores magic link tokens for client portal authentication.
 * These are temporary, single-use tokens that expire after 15 minutes.
 */
export const portalSession = defineType({
  name: 'portalSession',
  title: 'Portal Session',
  icon: LockIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'token',
      title: 'Token',
      type: 'string',
      description: 'The magic link token (32 characters)',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Email address of the user',
      validation: (rule) => rule.required().email(),
      readOnly: true,
    }),
    defineField({
      name: 'contactId',
      title: 'HubSpot Contact ID',
      type: 'string',
      description: 'The HubSpot contact ID',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'companyId',
      title: 'HubSpot Company ID',
      type: 'string',
      description: 'The HubSpot company ID',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      description: 'When this token expires (15 minutes after creation)',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'used',
      title: 'Used',
      type: 'boolean',
      description: 'Whether this token has been used',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      description: 'When this token was created',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      email: 'email',
      used: 'used',
      expiresAt: 'expiresAt',
    },
    prepare(selection) {
      const status = selection.used ? '✓ Used' : new Date(selection.expiresAt) < new Date() ? '⏰ Expired' : '🔓 Active'
      return {
        title: selection.email,
        subtitle: status,
      }
    },
  },
  orderings: [
    {
      title: 'Created (Newest)',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
  ],
})
