<script setup>
import { ref, watch } from 'vue'
import { img } from '../data/discoveries'
const props = defineProps({ photo: String, alt: { type: String, default: '' }, width: { type: Number, default: 900 }, eager: Boolean })
const failed = ref(false)
watch(() => props.photo, () => (failed.value = false))
</script>
<template>
  <img v-if="!failed && photo" :src="img(photo, width)" :alt="alt" :loading="eager ? 'eager' : 'lazy'" decoding="async" @error="failed = true" />
  <div v-else class="ph" role="img" :aria-label="alt || 'Image unavailable'">{{ alt || 'Explore Naypyitaw' }}</div>
</template>
