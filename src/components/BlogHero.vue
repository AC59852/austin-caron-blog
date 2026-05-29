<template>
  <header class="flex flex-col items-center">
    <div class="flex gap-[09px] items-center">
      <a href="/" class="text-lg font-medium text-text-primary z-4">Back</a>
      <span class="inline-block w-2 h-2 bg-blue-primary rounded-full"></span>
      <time class="text-lg font-medium text-text-primary">{{ formattedDate }}</time>
    </div>
    <div>
      <h1 class="text-center text-8xl font-bold text-text-primary" v-html="colouredTitle"></h1>
      <h2 class="text-center text-base text-text-primary">{{ heroBlock.subtitle }}</h2>
    </div>
    <picture>
      <source
        media="(min-width: 1500px)"
        :srcset="urlForImage(heroBlock.image).width(1500).height(800).url()"
      />
      <source
        media="(min-width: 768px)"
        :srcset="urlForImage(heroBlock.image).width(800).height(500).url()"
      />
      <img
        :src="urlForImage(heroBlock.image).width(400).height(236).url()"
        alt="Blog Hero Image"
        class="mt-8 rounded-md object-cover w-full h-auto"
      >
    </picture>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { urlForImage } from '../lib/url-for-image';

const props = defineProps({
  heroBlock: {
    type: Object,
    required: true
  }
})

const colouredTitle = computed(() => {
  const lastChar = props.heroBlock.title.slice(-1);

  return props.heroBlock.title.slice(0, -1) + `<span class="text-blue-primary">${lastChar}</span>`;
})

const formattedDate = computed(() => {
  const date = new Date(props.heroBlock.publishedDate);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
});

</script>