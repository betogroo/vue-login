<script setup lang="ts">
import { SignupForm } from '../components'
import type { Credentials } from '../types/Auth'
import { useAuth } from '../composables'
const { signup, isPending, error } = useAuth()

const handleSignup = async (credentials: Credentials) => {
  await signup(credentials).then((data) => {
    console.log(data)
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
        <div class="text-center text-h4 pb-2">Signup</div>
      </template>
      <SignupForm
        :is-pending="isPending"
        @signup="(credentials) => signup(credentials)"
      />
      <v-alert
        v-if="error"
        border="start"
        class="d-flex align-center mt-2"
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
