<template>
  <div v-if="isOpen" class="fixed top-0 left-0 w-full h-screen z-50">
    <div class="absolute inset-0 bg-black opacity-80"></div>
    <nav class=" top-0 left-0 w-3/4 max-w-md h-screen bg-white z-50 flex flex-col items-center justify-center absolute">
      <button @click="menuOpen.set(false)" class="absolute top-4 right-4 text-4xl font-bold text-blue-primary cursor-pointer">&times;</button>
      <ul class="text-2xl space-y-6 text-center font-semibold text-text-primary uppercase">
        <li><a href="/">Home</a></li>
        <li><a href="https://www.austincaron.com" target="_blank">Portfolio</a></li>
        <li><a href="https://www.github.com/AC59852" target="_blank">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/austincaron" target="_blank">LinkedIn</a></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
  import { useStore } from '@nanostores/vue';
  import { menuOpen } from '../store.js';
  import { watch } from 'vue';

  const isOpen = useStore(menuOpen);

  watch(isOpen, (val) => {
    document.documentElement.style.overflow = val ? 'hidden' : '';
  });
</script>

<style>
  li a {
    transition: color 0.3s ease;
  }

  li a:hover {
    color: var(--color-blue-primary);
  }
</style>