<script setup lang="ts">
import { APP_TITLE } from '@/config'
</script>
<template>
  <v-app-bar
    color="blue"
    density="compact"
  >
    <v-app-bar-title>
      <RouterLink
        class="text-white text-decoration-none"
        :to="{ name: 'HomeView' }"
        >{{ APP_TITLE }}</RouterLink
      >
    </v-app-bar-title>
    <div class="ma-3">
      <RouterLink
        class="text-white text-decoration-none"
        :to="{ name: 'HomeView' }"
        >Home</RouterLink
      >
      |
      <RouterLink
        class="text-white text-decoration-none"
        :to="{ name: 'AboutView' }"
        >About</RouterLink
      >
    </div>
  </v-app-bar>
</template>
