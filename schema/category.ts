// schema/category.ts
export const category = {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Used for category-specific SEO pages.',
    },
  ],
}
