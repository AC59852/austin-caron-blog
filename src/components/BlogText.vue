<template>
  <PortableText :value="[block]" :components="components" />
</template>

<script setup>
import { PortableText } from '@portabletext/vue';

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const components = {
  types: {},
  marks: {
    strong: 'strong',
    em: 'em',
    code: 'code',
    underline: 'u',
    strikethrough: 's',
  },
  block: {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    blockquote: 'blockquote',
    normal: 'p',
  }
}
</script>