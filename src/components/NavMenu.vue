<template>
  <nav v-if="isOpen" class=" top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-center justify-center">
    <ul class="text-2xl space-y-6 text-center">
      <li><a href="/">Home</a></li>
      <li><a href="https://www.austincaron.com" target="_blank">Portfolio</a></li>
    </ul>
  </nav>
</template>

<script setup>
  import { useStore } from '@nanostores/vue';
  import { menuOpen } from '../store.js';
  const isOpen = useStore(menuOpen);
</script>