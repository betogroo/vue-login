import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { APP_TITLE } from '@/config'
import { useAuth } from '@/modules/auth/composables'
const { getUser, isLogged } = useAuth()
await getUser()

export default (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  document.title = `${APP_TITLE} - ${to.meta.title}`
  if (!to.meta.requiresAuth) {
    if ((to.name === 'LoginView' || to.name === 'SignupView') && isLogged()) {
      console.log(to.name, ' Está logado, nao precisa logar')
      next({ name: 'HomeView' })
    } else {
      console.log(to.name, ' nao necessita de login')
      next()
    }
  } else {
    console.log(to.name, ' Precisa de login')
    if (!isLogged()) {
      console.log(to.name, ' Não está logado, vai para login')
      next({ name: 'LoginView' })
    } else {
      console.log(to.name, ' Esta logado')
      next()
    }
  }
}
