// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import sanity from '@sanity/astro';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.austincaron.com',
  integrations: [vue(), sanity({
    projectId: '0p745kum',
    dataset: 'production',
    apiVersion: '2026-03-01',
    studioBasePath: '/admin',
    useCdn: false
  }), react(), sitemap({ filter: (page) => !page.includes('/admin') })],

  vite: {
    plugins: [tailwindcss()]
  },

  devToolbar: {
    enabled: false
  }
});