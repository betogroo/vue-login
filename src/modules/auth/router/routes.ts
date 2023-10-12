// Composables
import { CustomRouteRecordRaw } from 'vue-router'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/SigninView.vue'),
    meta: {
      requiresAuth: false,
      title: 'Login',
      hideAppBar: true,
    },
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: () => import('../views/SignupView.vue'),
    meta: {
      requiresAuth: false,
      title: 'Signup',
      hideAppBar: true,
    },
  },
  {
    path: '/restrict',
    name: 'RestrictView',
    component: () => import('../views/RestrictView.vue'),
    meta: {
      requiresAuth: false,
      title: 'Restrict',
    },
  },
]

export default routes
