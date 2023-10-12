<script setup lang="ts">
import { AppBar } from '@/shared/components'
</script>
<template>
  <v-app>
    <AppBar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
