// schema/post.ts
import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  type: 'document',
  title: 'Blog Post',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Standard Content Fields
    defineField({ name: 'slug', type: 'slug', group: 'content', options: { source: 'title' }, validation: (Rule) => Rule.required() }),

    defineField({ name: 'category', type: 'reference', group: 'content', to: [{ type: 'category' }], validation: (Rule) => Rule.required() }),
    
    defineField({ name: 'pageBlocks', type: 'array', title: 'Page Content', group: 'content', of: [ { type: 'heroBlock' }, { type: 'textBlock' }, { type: 'imageBlock' } ] }),
    
    // SEO Fields
    defineField({
      name: 'seo',
      type: 'seo', // Using our custom seo object
      title: 'Search Engine Optimization',
      group: 'seo',
    }),
  ],
})
