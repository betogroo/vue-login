<script setup lang="ts">
import { ProfileForm } from '../components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/useAuthStore'
import { useProfileStore } from '../store/useProfileStore'
import type { ProfileCasting } from '../types/Profile'
import { useProfile } from '../composables'
const store = useAuthStore()
const profileStore = useProfileStore()
const { user } = storeToRefs(store)
const { profile, fullProfile } = storeToRefs(profileStore)
const { getProfile, updateProfile, isPending } = useProfile()
if (user.value) await getProfile(user.value.id)

const handleSubmit = async (value: ProfileCasting) => {
  const updates = { ...value, id: user.value!.id }
  await updateProfile(updates)
}
</script>

<template>
  <div>Profile</div>
  <pre v-if="profile">{{ JSON.stringify(fullProfile, undefined, 2) }}</pre>

  <ProfileForm
    :is-pending="isPending"
    :profile="profile!"
    :user="user"
    @update-profile="(value) => handleSubmit(value)"
  />

  <v-divider></v-divider>
</template>
