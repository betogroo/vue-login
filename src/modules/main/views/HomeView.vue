<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { storeToRefs } from 'pinia'
const store = useAuthStore()
const { user } = storeToRefs(store)
</script>
<template>
  <v-container class="d-flex justify-center fill-height">
    <v-responsive
      class="text-center"
      max-width="600"
    >
      <h1 class="text-center text-h1">HOME PAGE</h1>
      <v-row>
        <v-col cols="12">
          <v-btn
            :color="user ? 'success' : 'error'"
            :to="{ name: 'RestrictView' }"
            >Ir para página restrita</v-btn
          >
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
