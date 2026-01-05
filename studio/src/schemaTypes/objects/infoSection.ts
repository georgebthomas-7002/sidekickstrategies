import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const infoSection = defineType({
  name: 'infoSection',
  title: 'Info Section',
  type: 'object',
  icon: TextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'section', title: 'Section Settings'},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'content',
    }),
    // Media Fields
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      description: 'Choose to display an image, video, or no media',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      group: 'media',
    }),
    defineField({
      name: 'mediaPosition',
      title: 'Media Position',
      type: 'string',
      description: 'Position the media to the left or right of the content',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      group: 'media',
      hidden: ({parent}) => parent?.mediaType === 'none' || !parent?.mediaType,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for accessibility',
        },
      ],
      group: 'media',
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      group: 'media',
      hidden: ({parent}) => parent?.mediaType !== 'video',
      fields: [
        defineField({
          name: 'source',
          title: 'Video Source',
          type: 'string',
          options: {
            list: [
              {title: 'Upload File', value: 'file'},
              {title: 'YouTube URL', value: 'youtube'},
              {title: 'Vimeo URL', value: 'vimeo'},
            ],
            layout: 'radio',
          },
          initialValue: 'youtube',
        }),
        defineField({
          name: 'file',
          title: 'Video File',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({parent}) => parent?.source !== 'file',
        }),
        defineField({
          name: 'url',
          title: 'Video URL',
          type: 'url',
          description: 'Paste YouTube or Vimeo video URL',
          hidden: ({parent}) => parent?.source === 'file',
        }),
        defineField({
          name: 'poster',
          title: 'Poster Image',
          type: 'image',
          description: 'Thumbnail shown before video plays',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'autoplay',
          title: 'Autoplay (muted)',
          type: 'boolean',
          description: 'Auto-play video on load (will be muted)',
          initialValue: false,
        }),
        defineField({
          name: 'loop',
          title: 'Loop',
          type: 'boolean',
          description: 'Loop the video continuously',
          initialValue: false,
        }),
      ],
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
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Info Section',
        subtitle: 'Info Section',
      }
    },
  },
})
