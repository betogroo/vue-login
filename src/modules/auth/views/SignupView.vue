<script setup lang="ts">
import { SignupForm } from '../components'
import type { Credentials } from '../types'
const signup = (credentials: Credentials) => {
  console.log(credentials)
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
      <SignupForm @signup="(value) => signup(value)" />
    </v-card>
  </v-container>
</template>
