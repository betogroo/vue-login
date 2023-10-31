// Composables
import { CustomRouteRecordRaw } from 'vue-router'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue'),
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
    path: '/profile',
    name: 'ProfileView',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      requiresAuth: true,
      title: 'Profile',
    },
  },
]

export default routes
