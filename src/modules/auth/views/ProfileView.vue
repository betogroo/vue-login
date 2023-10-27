<script setup lang="ts">
import { ProfileForm, ProfileContainer } from '../components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/useAuthStore'
import { useProfileStore } from '../store/useProfileStore'
import type { Profile } from '../types/Profile'
import { useProfile } from '../composables'
const store = useAuthStore()
const profileStore = useProfileStore()
const { user } = storeToRefs(store)
const { profile, userProfile } = storeToRefs(profileStore)
const { getProfile, updateProfile, isPending } = useProfile()
if (user.value) await getProfile(user.value.id)

const handleSubmit = async (value: Profile) => {
  if (!user.value) return
  const updates = { ...value, id: user.value.id }
  await updateProfile(updates)
}
</script>

<template>
  <v-container class="justify-center">
    <ProfileContainer :user-profile="userProfile" />
    <ProfileForm
      :is-pending="isPending"
      :profile="profile!"
      :user="user"
      @update-profile="(value) => handleSubmit(value)"
    />
    <v-divider></v-divider>
  </v-container>
</template>
