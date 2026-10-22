<script setup>
import DiscoveryCard from './DiscoveryCard.vue'
defineProps({ items: { type: Array, required: true } })
</script>
<template>
  <div v-if="items.length" class="bento">
    <DiscoveryCard :item="items[0]" variant="feature" eager />
    <div v-if="items.length > 1" class="bento__side">
      <DiscoveryCard v-for="it in items.slice(1, 3)" :key="it.id" :item="it" variant="side" />
    </div>
  </div>
</template>
