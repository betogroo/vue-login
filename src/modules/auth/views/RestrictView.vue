<script setup lang="ts">
import { useAuth } from '../composables'
const { getUser, user } = useAuth()
await getUser()
</script>

<template>
  <div>Restrict</div>
  <pre v-if="user">{{ JSON.stringify(user, undefined, 2) }}</pre>
</template>
