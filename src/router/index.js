import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const TITLE = 'Explore Naypyitaw'
const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: `${TITLE} — Discover the places worth knowing` } },
  { path: '/restaurants', name: 'restaurants', component: () => import('../views/RestaurantListView.vue'), meta: { title: `Restaurants · ${TITLE}` } },
  { path: '/restaurants/:slug', name: 'restaurant', component: () => import('../views/RestaurantDetailView.vue'), meta: { title: TITLE } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: `Not found · ${TITLE}` } }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, saved) => saved || (to.path === from.path ? false : { top: 0 })
})
router.afterEach((to) => { document.title = to.meta.title || TITLE })
export default router
