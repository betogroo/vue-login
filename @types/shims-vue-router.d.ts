import 'vue-router'

declare module 'vue-router' {
  type CustomRouteRecordRaw = RouteRecordRaw & {
    meta: RouteMeta
    name: RouteRecordName
  }
  interface RouteMeta {
    requiresAuth: boolean
    title: string
  }
}
