<template>
  <header class="flex flex-col sm:items-center">
    <div class="flex gap-[09px] items-center order-2 sm:order-first mt-2 mb-4 sm:mt-4 sm:mb-0">
      <a href="/" class="text-md font-medium text-text-primary z-4 hidden sm:block">Back</a>
      <span class="hidden sm:inline-block w-[6px] h-[6px] bg-blue-primary rounded-full"></span>
      <time class="text-md font-medium text-text-primary">{{ formattedDate }}</time>
      <span v-if="readingMinutes" class="inline-block w-[6px] h-[6px] bg-blue-primary rounded-full"></span>
      <span v-if="readingMinutes" class="text-md font-medium text-text-primary">{{ readingMinutes }} min read</span>
    </div>
    <h1 class="text-left sm:text-center text-5xl sm:text-[77px] md:text-8xl font-bold text-text-primary sm:my-[30px]" v-html="colouredTitle"></h1>
    <h2 class="text-left sm:text-center text-base order-last sm:order-3 sm:px-[22px] lg:px-[80px] hero-sub md:text-[17px] sm:mb-[30px]">{{ heroBlock.subtitle }}</h2>
    <picture class="order-first sm:order-last">
      <source
        media="(min-width: 1200px)"
        :srcset="urlForImage(heroBlock.image).width(1300).height(731).url()"
      />
      <source
        media="(min-width: 640px)"
        :srcset="urlForImage(heroBlock.image).width(800).height(500).url()"
      />
      <img
        :src="urlForImage(heroBlock.image).width(400).height(236).url()"
        alt="Blog Hero Image"
        class="rounded-sm object-cover w-full h-auto mb-[29px] sm:mb-0"
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
  },
  readingMinutes: {
    type: Number,
    required: false
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

<style scoped>
  @media screen and (min-width: 1950px) {
    h1 {
      font-size: 93px;
    }

    h2 {
      padding: 0 112px;
    }
  }
</style>