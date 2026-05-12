// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import sanity from '@sanity/astro';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), sanity({
    projectId: '0p745kum',
    dataset: 'production',
    apiVersion: '2026-03-01',
    studioBasePath: '/admin',
    useCdn: false
  }), 
  react()],

  vite: {
    plugins: [tailwindcss()]
  }
});