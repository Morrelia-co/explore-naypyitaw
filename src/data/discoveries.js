// DEMO SEED DATA — fictional entries, not verified local businesses.
// Images are swappable: change IMAGE_BASE / photo ids when a real image store exists.
export const IMAGE_BASE = 'https://images.unsplash.com'
export const img = (id, w = 900) => `${IMAGE_BASE}/${id}?auto=format&fit=crop&w=${w}&q=70`

export const categories = [
  { key: 'all', label: 'All discoveries' },
  { key: 'restaurants', label: 'Restaurants' },
  { key: 'cafes', label: 'Cafés' },
  { key: 'local-food', label: 'Local food' },
  { key: 'hidden-gems', label: 'Hidden gems' },
  { key: 'places', label: 'Places to visit' }
]
export const categoryLabels = { restaurants: 'Restaurant', cafes: 'Café', 'local-food': 'Local food', places: 'Place to visit' }

const e = (id, name, category, area, priceRange, photo, editorialHeadline, description, tags = [], featured = false, openingHours = null) => ({
  id, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), name, category, description, editorialHeadline,
  image: photo, gallery: [photo], area, address: null, priceRange, openingHours, latitude: null, longitude: null, featured, tags
})

export const discoveries = [
  e(1, 'Lotus Courtyard Kitchen', 'restaurants', 'Zabuthiri', '$$', 'photo-1414235077428-338989a2e8c0', 'A local favorite worth finding.', 'A courtyard table, shared plates and a menu that moves with the season. Demo entry for the seed dataset.', ['family', 'dinner'], true, 'Daily, 11:00–21:00'),
  e(2, 'Slow Morning Coffee Room', 'cafes', 'Ottarathiri', '$', 'photo-1495474472287-4d71bcdd2085', 'Your next slow coffee morning.', 'Pour-overs, quiet corners and a window seat made for lingering. Demo entry.', ['coffee', 'work-friendly'], true, 'Daily, 07:00–18:00'),
  e(3, 'Mohinga Corner', 'local-food', 'Pyinmana', '$', 'photo-1504674900247-0877df9cc836', 'A taste of something familiar.', 'A breakfast staple done simply: rich broth, fresh herbs and a crisp fritter on the side. Demo entry.', ['breakfast', 'noodles'], true),
  e(4, 'The Ivory Table', 'restaurants', 'Zabuthiri', '$$$', 'photo-1555396273-367ea4eb4db5', 'A little discovery for your next meal.', 'Candlelit and unhurried, built for long dinners. Demo entry.', ['dinner', 'date-night']),
  e(5, 'Teak & Bean', 'cafes', 'Dekkhinathiri', '$$', 'photo-1559339352-11d035aa65de', 'Coffee under a teak ceiling.', 'Warm wood, single-origin beans and house-baked cakes. Demo entry.', ['coffee', 'dessert']),
  e(6, 'Backstreet Tea Leaf Salad', 'local-food', 'Pobbathiri', '$', 'photo-1546069901-ba9599a7e63c', 'The salad worth the detour.', 'A crunchy, tangy tea leaf salad served from a small family counter. Demo entry.', ['hidden-gem', 'snacks']),
  e(7, 'Garden Grill House', 'restaurants', 'Ottarathiri', '$$', 'photo-1544025162-d76694265947', 'Fire, charcoal and long tables.', 'Charcoal-grilled meats and sides for sharing. Demo entry.', ['grill', 'groups']),
  e(8, 'Paper Lantern Café', 'cafes', 'Zayyarthiri', '$', 'photo-1554118811-1e0d58224f24', 'A hidden corner for afternoon pages.', 'Small, calm and easy to miss — which is the appeal. Demo entry.', ['hidden-gem', 'quiet']),
  e(9, 'Sunrise Pancake Studio', 'cafes', 'Zabuthiri', '$$', 'photo-1567620905732-2d1ec7ab7445', 'Breakfast, all day.', 'Stacks, syrups and strong coffee. Demo entry.', ['breakfast', 'brunch']),
  e(10, 'Riverside Noodle House', 'local-food', 'Pyinmana', '$', 'photo-1512621776951-a57141f2eefd', 'Bowls built for a lunch break.', 'Hand-pulled noodles and bright, herby toppings. Demo entry.', ['lunch', 'noodles']),
  e(11, 'Pagoda View Lookout', 'places', 'Pobbathiri', null, 'photo-1517248135467-4c7edcad34c4', 'A calm place to end the day.', 'A viewpoint to wander at golden hour. Demo entry; no visiting details are listed yet.', ['views', 'free']),
  e(12, 'Saffron & Salt', 'restaurants', 'Dekkhinathiri', '$$$', 'photo-1565299624946-b28f40a0ae38', 'Familiar flavors, refined.', 'A tasting-style menu that rethinks home cooking. Demo entry.', ['dinner', 'special-occasion']),
  e(13, 'Morning Market Toast Stall', 'local-food', 'Pyinmana', '$', 'photo-1482049016688-2d3e1b311543', 'Best eaten standing up.', 'Toast, eggs and sweet tea from an early-morning stall. Demo entry.', ['hidden-gem', 'breakfast']),
  e(14, 'Cedar Lane Bistro', 'restaurants', 'Zayyarthiri', '$$', 'photo-1498654896293-37aacf113fd9', 'Weeknight dinner, solved.', 'An easy menu and generous portions. Demo entry.', ['dinner', 'family'])
]

export const collections = [
  { id: 'coffee', title: 'Coffee and café discoveries', blurb: 'Where to linger over a cup.', category: 'cafes', image: 'photo-1509042239860-f550ce710b93' },
  { id: 'local', title: 'Local food worth trying', blurb: 'Everyday dishes, done well.', category: 'local-food', image: 'photo-1504674900247-0877df9cc836' },
  { id: 'relaxed', title: 'Places for a relaxed meal', blurb: 'Unhurried tables for long conversations.', category: 'restaurants', image: 'photo-1414235077428-338989a2e8c0' },
  { id: 'new', title: 'Hidden gems to explore', blurb: 'Small, easy-to-miss favorites.', category: 'hidden-gems', image: 'photo-1554118811-1e0d58224f24' }
]
