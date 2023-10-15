<script setup lang="ts">
import { LoginForm } from '../components'
import type { Credentials } from '../types'
const login = (value: Credentials) => {
  console.log(value)
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
      <LoginForm @login="(value) => login(value)" />
    </v-card>
  </v-container>
</template>
