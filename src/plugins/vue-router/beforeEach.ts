import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { useAuth } from '@/modules/auth/composables'
import { APP_TITLE } from '@/config'
export default async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { getUser } = useAuth()
  await getUser()
  const store = useAuthStore()
  document.title = `${APP_TITLE} - ${to.meta.title}`
  if (!to.meta.requiresAuth) {
    if ((to.name === 'LoginView' || to.name === 'SignupView') && store.user) {
      next({ name: 'HomeView' })
    } else {
      next()
    }
  } else {
    if (!store.user) {
      next({ name: 'LoginView' })
    } else {
      next()
    }
  }
}
