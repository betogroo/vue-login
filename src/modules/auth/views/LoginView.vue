<script setup lang="ts">
import { AlertError, LoginForm } from '../components'
import { useRouter } from 'vue-router'
import type { Credentials } from '../types/Auth'
import { useAuth } from '../composables'
const { error, isPending, login } = useAuth()

const router = useRouter()

const handleLogin = async (credentials: Credentials) => {
  await login(credentials)
    .then((data) => {
      if (data) router.push({ name: 'ProfileView' })
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>

<template>
  <v-container class="fill-height justify-center">
    <v-card
      class="pa-4 rounded"
      elevation="6"
      width="400"
    >
      <template #title>
        <div class="text-center text-h4 pb-2">Login</div>
      </template>
      <LoginForm
        :is-pending="isPending === 'login'"
        @login="(credentials) => handleLogin(credentials)"
      />
      <AlertError :error="error" />
    </v-card>
  </v-container>
</template>
