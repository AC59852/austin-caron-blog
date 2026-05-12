import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  type: "object",
  title: "SEO & Social Media",
  fields: [
    defineField({
      name: "ogImage",
      type: "image",
      title: "Open Graph Image",
      description: "The image that appears when sharing on social media platforms like Facebook and Twitter.",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "metaTitle",
      type: "string",
      title: "Meta Title",
      description: "The title that appears in search engine results and social media previews.",
      validation: (Rule) => Rule.max(65).warning("Meta title should be 65 characters or less for optimal display.")
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      title: "Meta Description",
      description: "The description that appears in search engine results and social media previews.",
      validation: (Rule) => Rule.max(155).warning("Meta description should be 155 characters or less for optimal display.")
    })
  ]
})