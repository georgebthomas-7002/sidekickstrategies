import {MicrophoneIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

/**
 * Podcast schema. Define and edit the fields for podcast episodes.
 * Integrates with Transistor.fm for audio hosting.
 */

export const podcast = defineType({
  name: 'podcast',
  title: 'Podcast',
  icon: MicrophoneIcon,
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'meta', title: 'Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Episode Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for this episode',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for listings and SEO',
      group: 'content',
    }),
    defineField({
      name: 'showNotes',
      title: 'Show Notes',
      type: 'blockContent',
      description: 'Full show notes with links, timestamps, etc.',
      group: 'content',
    }),
    defineField({
      name: 'transistorUrl',
      title: 'Transistor.fm Embed URL',
      type: 'url',
      description: 'The embed URL from Transistor.fm (e.g., https://share.transistor.fm/e/episode-id)',
      validation: (rule) =>
        rule.uri({
          scheme: ['https'],
        }),
      group: 'media',
    }),
    defineField({
      name: 'transistorEpisodeId',
      title: 'Transistor Episode ID',
      type: 'string',
      description: 'Episode ID from Transistor.fm for API integration',
      group: 'media',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
      group: 'media',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Episode length (e.g., "45:30" or "1:02:15")',
      group: 'meta',
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number',
      validation: (rule) => rule.positive().integer(),
      group: 'meta',
    }),
    defineField({
      name: 'seasonNumber',
      title: 'Season Number',
      type: 'number',
      description: 'Optional - leave blank if not using seasons',
      validation: (rule) => rule.positive().integer(),
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'meta',
    }),
    defineField({
      name: 'guests',
      title: 'Guests',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      description: 'Guest speakers on this episode',
      group: 'meta',
    }),
    defineField({
      name: 'hosts',
      title: 'Hosts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      description: 'Hosts for this episode',
      group: 'meta',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      group: 'meta',
    }),
  ],
  orderings: [
    {
      title: 'Episode Number, New',
      name: 'episodeNumberDesc',
      by: [{field: 'episodeNumber', direction: 'desc'}],
    },
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      episodeNumber: 'episodeNumber',
      seasonNumber: 'seasonNumber',
      date: 'publishedAt',
      media: 'coverImage',
    },
    prepare({title, episodeNumber, seasonNumber, date, media}) {
      const episodeLabel = seasonNumber
        ? `S${seasonNumber}E${episodeNumber}`
        : episodeNumber
          ? `Ep ${episodeNumber}`
          : ''

      const subtitles = [
        episodeLabel,
        date && format(parseISO(date), 'LLL d, yyyy'),
      ].filter(Boolean)

      return {
        title,
        media,
        subtitle: subtitles.join(' • '),
      }
    },
  },
})
