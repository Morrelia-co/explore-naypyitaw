<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>
<template>
  <a href="#main" class="sr-only">Skip to content</a>
  <AppHeader />
  <main id="main"><RouterView /></main>
  <AppFooter />
</template>
