<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchInput from './SearchInput.vue'
const route = useRoute(), router = useRouter()
const menuOpen = ref(false), searchOpen = ref(false), q = ref('')
const links = [
  { label: 'Discover', to: '/' },
  { label: 'Restaurants', to: '/restaurants' },
  { label: 'Cafés', to: '/restaurants?category=cafes' },
  { label: 'Collections', to: '/#collections' }
]
const isActive = (l) => l.label === 'Discover' ? route.path === '/' && !route.hash : l.label === 'Collections' ? route.hash === '#collections'
  : l.label === 'Cafés' ? route.path === '/restaurants' && route.query.category === 'cafes' : route.path.startsWith('/restaurants') && route.query.category !== 'cafes'
watch(() => route.fullPath, () => { menuOpen.value = false; searchOpen.value = false })
function submit() { router.push({ path: '/restaurants', query: q.value.trim() ? { q: q.value.trim() } : {} }); q.value = '' }
async function toggleSearch() { searchOpen.value = !searchOpen.value; if (searchOpen.value) { await nextTick(); document.getElementById('q-input')?.focus() } }
</script>
<template>
  <header class="header">
    <div class="wrap header__bar">
      <RouterLink to="/" class="brand" aria-label="Explore Naypyitaw home">
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 29s9-8.2 9-15a9 9 0 0 0-18 0c0 6.800 9 15 9 15Z"/><path d="m18.500 11.500-1.500 5-5 1.500 1.500-5 5-1.500Z" fill="currentColor"/></svg>
        Explore Naypyitaw
      </RouterLink>
      <nav class="nav" aria-label="Main">
        <RouterLink v-for="l in links" :key="l.label" :to="l.to" :class="{ 'is-active': isActive(l) }" :aria-current="isActive(l) ? 'page' : null">{{ l.label }}</RouterLink>
      </nav>
      <button class="icon-btn" type="button" :aria-expanded="searchOpen" aria-label="Search" @click="toggleSearch">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.500-3.500"/></svg>
      </button>
      <button class="icon-btn menu-btn" type="button" :aria-expanded="menuOpen" aria-controls="mobile-nav" aria-label="Menu" @click="menuOpen = !menuOpen">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h16"/><path v-else d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
    </div>
    <div v-if="searchOpen" class="header__search"><div class="wrap"><SearchInput v-model="q" @submit="submit" /></div></div>
    <nav v-if="menuOpen" id="mobile-nav" class="wrap mobile-nav" aria-label="Mobile">
      <RouterLink v-for="l in links" :key="l.label" :to="l.to" :class="{ 'is-active': isActive(l) }">{{ l.label }}</RouterLink>
    </nav>
  </header>
</template>
