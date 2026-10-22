<script setup>
defineProps({ modelValue: String, label: { type: String, default: 'Search places' }, placeholder: { type: String, default: 'Search by name, area or tag' } })
defineEmits(['update:modelValue', 'submit'])
</script>
<template>
  <form class="search" role="search" @submit.prevent="$emit('submit')">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
    <label class="sr-only" for="q-input">{{ label }}</label>
    <input id="q-input" type="search" :value="modelValue" :placeholder="placeholder" autocomplete="off" @input="$emit('update:modelValue', $event.target.value)" />
    <button v-if="modelValue" type="button" class="icon-btn" aria-label="Clear search" @click="$emit('update:modelValue', '')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>
  </form>
</template>
