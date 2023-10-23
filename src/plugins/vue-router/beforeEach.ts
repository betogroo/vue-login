import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { APP_TITLE } from '@/config'
import { useAuth } from '@/modules/auth/composables'
const { getUser, isLogged } = useAuth()
await getUser()
export default async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  document.title = `${APP_TITLE} - ${to.meta.title}`
  if (!to.meta.requiresAuth) {
    if ((to.name === 'LoginView' || to.name === 'SignupView') && isLogged()) {
      next({ name: 'HomeView' })
    } else {
      next()
    }
  } else {
    if (!isLogged()) {
      next({ name: 'LoginView' })
    } else {
      next()
    }
  }
}
