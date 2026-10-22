<script setup>
import { ref, computed, watchEffect, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getDiscoveries } from '../services/discoveryService'
import { collections, categories } from '../data/discoveries'
import CategoryNav from '../components/CategoryNav.vue'
import FeaturedBento from '../components/FeaturedBento.vue'
import DiscoveryCard from '../components/DiscoveryCard.vue'
import EmptyState from '../components/EmptyState.vue'
import SmartImg from '../components/SmartImg.vue'
const route = useRoute()
const category = ref('all'), items = ref([]), loading = ref(true), error = ref('')
watchEffect(async () => {
  loading.value = true; error.value = ''
  try { items.value = await getDiscoveries({ category: category.value }) }
  catch { error.value = 'We couldn’t load discoveries. Please try again.' }
  finally { loading.value = false }
})
// Featured items first, then the rest, so the bento always leads with editorial picks.
const ordered = computed(() => [...items.value].sort((a, b) => Number(b.featured) - Number(a.featured)))
const bento = computed(() => ordered.value.slice(0, 3))
const rest = computed(() => ordered.value.slice(3))
const label = computed(() => categories.find((c) => c.key === category.value)?.label)
onMounted(async () => { if (route.hash) { await nextTick(); document.querySelector(route.hash)?.scrollIntoView() } })
</script>
<template>
  <div class="wrap">
    <section class="intro">
      <h1 class="display">Find your next favorite place.</h1>
      <p>Discover local food, cafés, restaurants and places worth exploring in Naypyitaw.</p>
    </section>
    <CategoryNav v-model="category" />
    <EmptyState v-if="error" title="Something went wrong" :text="error" action="Reload" @action="$router.go(0)" />
    <div v-else-if="loading" class="grid" style="margin-top:2rem"><div v-for="n in 3" :key="n" class="skeleton" aria-hidden="true"></div></div>
    <EmptyState v-else-if="!items.length" title="Nothing here yet" text="We haven’t added discoveries in this category." action="Show all" @action="category = 'all'" />
    <template v-else>
      <FeaturedBento :items="bento" />
      <section v-if="rest.length" class="section" aria-labelledby="more">
        <div class="section-head"><h2 id="more" class="display">More to discover</h2><RouterLink class="link" to="/restaurants">Browse the directory</RouterLink></div>
        <div class="grid"><DiscoveryCard v-for="it in rest" :key="it.id" :item="it" /></div>
      </section>
    </template>
    <section id="collections" class="section" aria-labelledby="coll" style="scroll-margin-top:5rem">
      <div class="section-head"><h2 id="coll" class="display">Collections</h2><p class="muted">Hand-picked starting points.</p></div>
      <div class="collections">
        <RouterLink v-for="c in collections" :key="c.id" class="collection" :to="{ path: '/restaurants', query: { category: c.category } }">
          <div class="media"><SmartImg :photo="c.image" :alt="c.title" :width="500" /></div>
          <div><h3>{{ c.title }}</h3><p class="muted" style="font-size:.9rem">{{ c.blurb }}</p></div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
