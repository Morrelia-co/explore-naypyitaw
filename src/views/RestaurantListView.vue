<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRestaurants } from '../services/discoveryService'
import { categories } from '../data/discoveries'
import SearchInput from '../components/SearchInput.vue'
import DiscoveryCard from '../components/DiscoveryCard.vue'
import EmptyState from '../components/EmptyState.vue'
const route = useRoute(), router = useRouter()
const q = ref(String(route.query.q || ''))
const category = computed({ get: () => String(route.query.category || 'all'), set: (v) => setQuery({ category: v === 'all' ? '' : v }) })
const price = computed({ get: () => String(route.query.price || ''), set: (v) => setQuery({ price: v }) })
const results = ref([]), loading = ref(true), error = ref('')
function setQuery(patch) {
  const next = { ...route.query, ...patch }
  Object.keys(next).forEach((k) => !next[k] && delete next[k])
  router.replace({ query: next })
}
let t
watch(q, (v) => { clearTimeout(t); t = setTimeout(() => setQuery({ q: v.trim() }), 250) })
watch(() => route.query.q, (v) => { if ((v || '') !== q.value.trim()) q.value = v || '' })
watchEffect(async () => {
  loading.value = true; error.value = ''
  try { results.value = await getRestaurants({ q: String(route.query.q || ''), category: category.value, price: price.value }) }
  catch { error.value = 'We couldn’t load listings. Please try again.' }
  finally { loading.value = false }
})
const hasFilters = computed(() => q.value || category.value !== 'all' || price.value)
const reset = () => { q.value = ''; router.replace({ query: {} }) }
const options = categories.filter((c) => c.key !== 'places')
</script>
<template>
  <div class="wrap">
    <header class="page-head">
      <h1 class="display">Restaurants, cafés and local food</h1>
      <p class="muted">Search the directory or narrow it by type and price. Entries are demo content.</p>
    </header>
    <div class="toolbar">
      <SearchInput v-model="q" label="Search restaurants" />
      <div class="filters">
        <label class="field">Category
          <select v-model="category"><option v-for="c in options" :key="c.key" :value="c.key">{{ c.label }}</option></select>
        </label>
        <label class="field">Price
          <select v-model="price"><option value="">Any price</option><option>$</option><option>$$</option><option>$$$</option></select>
        </label>
        <button v-if="hasFilters" class="btn" type="button" style="align-self:end" @click="reset">Reset filters</button>
      </div>
    </div>
    <EmptyState v-if="error" title="Something went wrong" :text="error" action="Reload" @action="$router.go(0)" />
    <template v-else>
      <p class="count" aria-live="polite">{{ loading ? 'Loading…' : `${results.length} ${results.length === 1 ? 'place' : 'places'}` }}</p>
      <div v-if="loading" class="grid"><div v-for="n in 3" :key="n" class="skeleton" aria-hidden="true"></div></div>
      <EmptyState v-else-if="!results.length" title="No matches" text="Try a different name, area or category, or clear your filters." action="Reset filters" @action="reset" />
      <div v-else class="grid"><DiscoveryCard v-for="it in results" :key="it.id" :item="it" /></div>
    </template>
  </div>
</template>
