<script setup lang="ts">
import { ProfileContainer } from '../components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/useAuthStore'
import { useProfileStore } from '../store/useProfileStore'
import { useProfile } from '../composables'
const store = useAuthStore()
const profileStore = useProfileStore()
const { user } = storeToRefs(store)
const { userProfile } = storeToRefs(profileStore)
const { getProfile } = useProfile()
if (user.value) await getProfile(user.value.id)
</script>

<template>
  <v-container class="justify-center">
    <ProfileContainer :user-profile="userProfile" />
  </v-container>
</template>
