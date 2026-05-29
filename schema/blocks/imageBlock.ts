import { defineField, defineType } from 'sanity'

export const imageBlock = defineType({
  name: 'imageBlock',
  type: 'object',
  title: 'Image Block',
  icon: () => '📷',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
    defineField({
      name: 'altText',
      type: 'string',
      title: 'Alt Text',
      description: 'Important for accessibility and SEO',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
      media: 'image'
    },
    prepare(selection) {
      return {
        title: 'Image Block',
        subtitle: selection.caption || 'No caption',
        media: selection.media
      }
    }
  }
})