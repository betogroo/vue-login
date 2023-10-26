<script setup lang="ts">
import { ProfileForm, ProfileContainer } from '../components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/useAuthStore'
import { useProfileStore } from '../store/useProfileStore'
import type { ProfileCasting } from '../types/Profile'
import { useProfile } from '../composables'
const store = useAuthStore()
const profileStore = useProfileStore()
const { user } = storeToRefs(store)
const { profile, userProfile } = storeToRefs(profileStore)
const { getProfile, updateProfile, isPending } = useProfile()
if (user.value) await getProfile(user.value.id)

const handleSubmit = async (value: ProfileCasting) => {
  const updates = { ...value, id: user.value!.id }
  await updateProfile(updates)
}
</script>

<template>
  <ProfileContainer :user-profile="userProfile" />
  <pre v-if="profile">{{ JSON.stringify(userProfile, undefined, 2) }}</pre>

  <ProfileForm
    :is-pending="isPending"
    :profile="profile!"
    :user="user"
    @update-profile="(value) => handleSubmit(value)"
  />

  <v-divider></v-divider>
</template>
