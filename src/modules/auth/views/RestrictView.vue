<script setup lang="ts">
import { useAuthStore } from '../store/useAuthStore'
const store = useAuthStore()
</script>

<template>
  <div>Restrict</div>
  <pre v-if="store.user">{{ JSON.stringify(store.user, undefined, 2) }}</pre>
</template>
