<script setup lang="ts">
import { useAuthStore } from '../store/useAuthStore'
import { useProfile } from '../composables'
import { ProfileContainer } from '../components'
const store = useAuthStore()
const { profile, getProfile } = useProfile()
getProfile(store.user!.id)
</script>

<template>
  <div>{{ profile }}</div>
  <pre v-if="store.user">{{ JSON.stringify(store.user, undefined, 2) }}</pre>
  <ProfileContainer :user-id="profile" />
</template>
