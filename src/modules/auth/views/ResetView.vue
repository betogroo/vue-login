<script setup lang="ts">
import { AlertError, ResetForm } from '../components'
import type { Reset } from '../types/Auth'
import { useAuth } from '../composables'
const { error, isPending } = useAuth()

const handleReset = async (reset: Reset) => {
  console.log(reset)
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
        <div class="text-center text-h4 pb-2">Reset</div>
      </template>
      <ResetForm
        :is-pending="isPending === 'login'"
        @reset="(reset) => handleReset(reset)"
      />
      <AlertError :error="error" />
    </v-card>
  </v-container>
</template>
