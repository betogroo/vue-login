<script setup lang="ts">
import { onMounted } from 'vue'
import { AppBar } from '@/shared/components'
import { useAuth } from './modules/auth/composables'
import { useRoute, useRouter } from 'vue-router'
const { getUser, user, logout, isPending: logoutPending } = useAuth()
const route = useRoute()
const router = useRouter()
onMounted(async () => {
  await getUser()
})
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
      :is-pending="logoutPending"
      :user="user"
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
