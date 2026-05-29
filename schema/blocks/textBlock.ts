import { defineType, defineField } from 'sanity'

export const textBlock = defineType({
  name: 'textBlock',
  type: 'object',
  title: 'Text Block',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      content: 'content'
    },
    prepare(selection) {
      const block = selection.content?.find((blk: any) => blk._type === 'block')
      return {
        title: 'Text Block',
        subtitle: selection.content?.[0]?.children?.[0]?.text || 'No content'
      }
    }
  }
})