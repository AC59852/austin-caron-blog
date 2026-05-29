<template>
  <button @click="setMenuState" class="bg-transparent cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#383838" stroke-width="2" class="feather feather-menu">
      <line x1="0" y1="6" x2="33" y2="6"></line>
      <line x1="0" y1="12" x2="33" y2="12"></line>
      <line x1="0" y1="18" x2="33" y2="18"></line>
    </svg>
  </button>
</template>

<script setup>
  import { menuOpen } from '../store.js';

  function setMenuState() {
    menuOpen.set(!menuOpen.get());
  }
</script>

<style scoped>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
  }

  @media screen and (min-width: 640px) {
    button {
      width: 30px;
      height: 30px;
    }
  }
</style>