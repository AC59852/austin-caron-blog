<template>
  <div class="prose prose-invert max-w-none">
    <PortableText :value="block.content" :components="components" />
  </div>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'

defineProps({
  block: {
    type: Object,
    required: true
  }
})

const components = {
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