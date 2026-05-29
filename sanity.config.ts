// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { post } from './schema/post'
import { category } from './schema/category'
import { seo } from './schema/seo'
import { heroBlock } from './schema/blocks/heroBlock'
import { textBlock } from './schema/blocks/textBlock'
import { imageBlock } from './schema/blocks/imageBlock'

export default defineConfig({
  name: 'project-name',
  title: 'Project Name',
  projectId: '0p745kum',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [
      post,
      category,
      seo,
      heroBlock,
      textBlock,
      imageBlock
    ],
  },
})