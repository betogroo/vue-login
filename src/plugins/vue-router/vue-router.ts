// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes as main } from '@/modules/main/router'
import beforeEach from './beforeEach'

const routes = [...main]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(beforeEach)

export default router
