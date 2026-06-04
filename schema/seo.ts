// schema/seo.ts
import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  type: "object",
  title: "SEO & Social Media",
  fields: [
    // ─── Existing Fields ──────────────────────────────────────────────────────

    defineField({
      name: "ogImage",
      type: "image",
      title: "Open Graph Image",
      description:
        "The image shown when this post is shared on Facebook, LinkedIn, and X. Ideal size: 1200×630px. If left empty, the hero image is used automatically.",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "metaTitle",
      type: "string",
      title: "Meta Title",
      description:
        "Appears in browser tabs, Google results, and social share previews. If left empty, the hero block title is used. Aim for 50–60 characters.",
      validation: (Rule) =>
        Rule.max(65).warning(
          "Meta title should be 65 characters or less for optimal display in SERPs."
        ),
    }),

    defineField({
      name: "metaDescription",
      type: "text",
      title: "Meta Description",
      description:
        "Appears in Google result snippets and social share cards. If left empty, the hero block subtitle is used. Aim for 120–155 characters.",
      validation: (Rule) =>
        Rule.max(155).warning(
          "Meta description should be 155 characters or less for optimal display in SERPs."
        ),
    }),

    // ─── New Fields ───────────────────────────────────────────────────────────

    defineField({
      name: "focusKeyword",
      type: "string",
      title: "Focus Keyword",
      description:
        "The primary search query this post is written to rank for (e.g. 'best gaming keyboards 2025'). This is not rendered on the page — it is for your content strategy reference only. Use it to avoid targeting the same keyword across multiple posts.",
      // Not required — it won't break anything if left empty, but filling it
      // in builds a queryable keyword map across your entire content library.
    }),

    defineField({
      name: "noIndex",
      type: "boolean",
      title: "Hide from Search Engines (noindex)",
      description:
        "⚠️ When enabled, this page will be excluded from Google and all other search engines. Use for draft posts that accidentally got published, thin content, or time-expired articles you no longer want indexed.",
      // Defaults to false — indexing is on by default for all posts.
      initialValue: false,
      // Validation reminder: warn the editor if noIndex is set to true
      // to prevent accidentally de-indexing important content.
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value === true) {
            return "⚠️ This page will be hidden from all search engines. Make sure this is intentional.";
          }
          return true;
        }),
    }),
  ],
});