import { defineType, defineField } from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  type: 'object',
  title: 'Hero Block',
  icon: () => '📰',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedDate',
      type: 'datetime',
      title: 'Published Date',
      description: 'The date shown in the hero block',
      validation: (Rule) => Rule.required(),
    })
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image'
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.media
      }
    }
  }
})