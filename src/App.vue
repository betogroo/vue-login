<script setup lang="ts">
import { AppBar } from '@/shared/components'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <v-app>
    <AppBar v-if="!route.meta.hideAppBar" />
    <v-main>
      <Suspense>
        <RouterView />
        <template #fallback>...</template>
      </Suspense>
    </v-main>
  </v-app>
</template>
