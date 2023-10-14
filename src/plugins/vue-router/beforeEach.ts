import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { APP_TITLE } from '@/config'
const user = false

export default (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  document.title = `${APP_TITLE} - ${to.meta.title}`
  if (!to.meta.requiresAuth) {
    if ((to.name === 'LoginView' || to.name === 'SignupView') && user) {
      console.log(to.name, ' Está logado, nao precisa logar')
      next({ name: 'HomeView' })
    } else {
      console.log(to.name, ' nao necessita de login')
      next()
    }
  } else {
    console.log(to.name, ' Precisa de login')
    if (!user) {
      console.log(to.name, ' Não está logado, vai para login')
      next({ name: 'LoginView' })
    } else {
      console.log(to.name, ' Esta logado')
      next()
    }
  }
}
