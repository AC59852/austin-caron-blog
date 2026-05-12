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
    defineField({ name: 'splashImage', type: 'image', title: 'Splash Image', group: 'content', options: { hotspot: true } }),
    defineField({ name: 'title', type: 'string', group: 'content' }),
    defineField({ name: 'slug', type: 'slug', group: 'content', options: { source: 'title' } }),
    defineField({ name: 'body', type: 'array', title: 'Body', group: 'content', of: [{ type: 'block' }] }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At', group: 'content' }),
    
    // SEO Fields
    defineField({
      name: 'seo',
      type: 'seo', // Using our custom seo object
      title: 'Search Engine Optimization',
      group: 'seo',
    }),
  ],
})
