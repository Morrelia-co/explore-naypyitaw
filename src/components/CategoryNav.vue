<script setup>
import { categories } from '../data/discoveries'
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
</script>
<template>
  <div class="cats" role="group" aria-label="Filter discoveries by category">
    <button v-for="c in categories" :key="c.key" type="button" :aria-pressed="modelValue === c.key" @click="$emit('update:modelValue', c.key)">{{ c.label }}</button>
  </div>
</template>
