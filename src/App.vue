<script setup lang="ts">
import { useAuthStore } from './modules/auth/store/useAuthStore'
import { AppBar } from '@/shared/components'
import { useAuth } from './modules/auth/composables'
import { useRoute, useRouter } from 'vue-router'
const { isPending, logout } = useAuth()
const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const handleLogout = async () => {
  await logout().then(() => {
    router.push({ name: 'LoginView' })
  })
}
</script>
<template>
  <v-app>
    <AppBar
      v-if="!route.meta.hideAppBar"
      :is-pending="isPending === 'logout'"
      :user="store.user"
      @logout="handleLogout"
    />
    <v-main>
      <Suspense>
        <RouterView />
        <template #fallback>...</template>
      </Suspense>
    </v-main>
  </v-app>
</template>
