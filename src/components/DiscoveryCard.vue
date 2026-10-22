<script setup>
import { categoryLabels } from '../data/discoveries'
import SmartImg from './SmartImg.vue'
defineProps({ item: { type: Object, required: true }, variant: { type: String, default: 'grid' }, eager: Boolean })
</script>
<template>
  <article class="card" :class="variant !== 'grid' && `card--${variant}`">
    <div class="media"><SmartImg :photo="item.image" :alt="item.name" :width="variant === 'feature' ? 1400 : 800" :eager="eager" /></div>
    <div class="card__body" style="display:grid;gap:.4rem">
      <div class="card__meta">
        <span v-if="item.featured && variant === 'feature'" class="tag">Featured</span>
        <b>{{ categoryLabels[item.category] }}</b>
        <span v-if="item.area">{{ item.area }}</span>
        <span v-if="item.priceRange">{{ item.priceRange }}</span>
      </div>
      <h3><RouterLink :to="{ name: 'restaurant', params: { slug: item.slug } }">{{ variant === 'feature' ? item.editorialHeadline : item.name }}</RouterLink></h3>
      <p v-if="variant === 'feature'"><strong>{{ item.name }}.</strong> {{ item.description }}</p>
      <p v-else>{{ item.description }}</p>
    </div>
  </article>
</template>
