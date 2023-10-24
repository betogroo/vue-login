<script setup lang="ts">
import { LoginForm } from '../components'
import { useRouter } from 'vue-router'
import type { Credentials } from '../types/Auth'
import { useAuth } from '../composables'
const { login, isPending, error } = useAuth()
const router = useRouter()

const handleLogin = async (credentials: Credentials) => {
  await login(credentials)
    .then((data) => {
      if (data) router.push({ name: 'RestrictView' })
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
        :is-pending="isPending"
        @login="(credentials) => handleLogin(credentials)"
      />
      <v-alert
        v-if="error"
        border="start"
        class="d-flex align-center mt-2"
        closable
        prominent
        type="error"
      >
        <template #prepend>
          <v-icon>mdi-alert-circle-outline</v-icon>
        </template>
        <template #title><span class="text-h5">Erro</span></template>
        <template #text>{{ error?.toString() }}</template>
      </v-alert>
    </v-card>
  </v-container>
</template>
