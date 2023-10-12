import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { APP_TITLE } from '@/config'
console.log('aqui só quando carrega')
export default (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  console.log('sempre passa por aqui')
  document.title = `${APP_TITLE} - ${to.meta.title}`
  next()
}
