<template>
  <button
    v-for="category in buttons"
    :key="category.slug.current"
    @click="filterPosts(category.slug.current)"
    :class="[
      'px-[18px] py-[8px] rounded-full text-sm transition-colors duration-200 cursor-pointer flex-none whitespace-nowrap font-medium',
      selected === category.slug.current
        ? 'bg-(--color-blue-primary) text-white'
        : 'hover:bg-gray-300',
    ]"
    >
    {{ category.title }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { selectedCategory } from '../store.js';

interface Category {
  _id?: string;
  title: string;
  slug: { current: string };
}

const props = defineProps<{ categories: Category[] }>();
const selected = useStore(selectedCategory);

const buttons = computed(() => [
  { title: 'All', slug: { current: 'all' } },
  ...props.categories,
]);

function filterPosts(slug: string) {
  selectedCategory.set(slug === selected.value ? 'all' : slug);
}

</script>