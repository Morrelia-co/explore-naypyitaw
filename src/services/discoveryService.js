// Data-access layer. Swap the bodies for fetch(`${API_BASE}/...`) when the Go API exists.
import { discoveries } from '../data/discoveries'
const delay = (v) => new Promise((r) => setTimeout(() => r(v), 120))

export function filterItems(items, { q = '', category = 'all', price = '' } = {}) {
  const term = q.trim().toLowerCase()
  return items.filter((d) => {
    const inCat = category === 'all' || d.category === category || (category === 'hidden-gems' && d.tags.includes('hidden-gem'))
    const inPrice = !price || d.priceRange === price
    const inQ = !term || [d.name, d.area, d.category, d.description, ...d.tags].filter(Boolean).some((s) => s.toLowerCase().includes(term))
    return inCat && inPrice && inQ
  })
}
export const getDiscoveries = (filters) => delay(filterItems(discoveries, filters))
export const getRestaurants = (filters) => delay(filterItems(discoveries.filter((d) => d.category !== 'places'), filters))
export const getRestaurantBySlug = (slug) => delay(discoveries.find((d) => d.slug === slug) || null)
