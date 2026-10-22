<script setup>
defineProps({ title: String, text: String, action: String })
defineEmits(['action'])
</script>
<template>
  <div class="empty" role="status">
    <h2 class="display">{{ title }}</h2><p>{{ text }}</p>
    <button v-if="action" class="btn" type="button" @click="$emit('action')">{{ action }}</button>
  </div>
</template>
