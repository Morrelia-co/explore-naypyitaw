<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getRestaurantBySlug } from '../services/discoveryService'
import { categoryLabels } from '../data/discoveries'
import SmartImg from '../components/SmartImg.vue'
import EmptyState from '../components/EmptyState.vue'
const route = useRoute()
const item = ref(null), loading = ref(true), error = ref('')
watchEffect(async () => {
  loading.value = true; error.value = ''
  try {
    item.value = await getRestaurantBySlug(route.params.slug)
    document.title = item.value ? `${item.value.name} · Explore Naypyitaw` : 'Not found · Explore Naypyitaw'
  } catch { error.value = 'We couldn’t load this place.' }
  finally { loading.value = false }
})
const mapUrl = computed(() => {
  const d = item.value
  if (!d) return null
  if (d.latitude != null && d.longitude != null) return `https://www.google.com/maps/search/?api=1&query=${d.latitude},${d.longitude}`
  if (d.address) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.name} ${d.address}`)}`
  return null
})
</script>
<template>
  <div class="wrap">
    <p v-if="loading" class="crumbs">Loading…</p>
    <EmptyState v-else-if="error" title="Something went wrong" :text="error" action="Reload" @action="$router.go(0)" />
    <EmptyState v-else-if="!item" title="Place not found" text="This listing may have moved or never existed." action="Back to restaurants" @action="$router.push('/restaurants')" />
    <template v-else>
      <nav class="crumbs" aria-label="Breadcrumb"><RouterLink to="/">Discover</RouterLink> / <RouterLink to="/restaurants">Restaurants</RouterLink> / {{ item.name }}</nav>
      <article class="detail">
        <div class="media"><SmartImg :photo="item.image" :alt="item.name" :width="1400" eager /></div>
        <div>
          <p class="muted"><strong style="color:var(--wine)">{{ categoryLabels[item.category] }}</strong><span v-if="item.area"> · {{ item.area }}</span></p>
          <h1 class="display">{{ item.name }}</h1>
          <p class="lede">{{ item.editorialHeadline }}</p>
          <p style="margin-top:1rem">{{ item.description }}</p>
          <dl class="facts">
            <div><dt>Area</dt><dd>{{ item.area || 'Not listed yet' }}</dd></div>
            <div><dt>Address</dt><dd>{{ item.address || 'Not listed yet' }}</dd></div>
            <div><dt>Hours</dt><dd>{{ item.openingHours || 'Not listed yet' }}</dd></div>
            <div><dt>Price</dt><dd>{{ item.priceRange || 'Not listed yet' }}</dd></div>
          </dl>
          <a v-if="mapUrl" class="btn btn--solid" :href="mapUrl" target="_blank" rel="noopener">Get directions</a>
          <p v-else class="muted" style="font-size:.9rem">Directions will appear once a verified location is added.</p>
          <div v-if="item.tags.length" class="tags"><span v-for="t in item.tags" :key="t">{{ t }}</span></div>
        </div>
      </article>
      <section class="reviews" aria-labelledby="rev"><h2 id="rev" class="display">Community reviews</h2><p class="muted">Reviews and photos from visitors are coming in a later release.</p></section>
    </template>
  </div>
</template>
