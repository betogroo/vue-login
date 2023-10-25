<script setup lang="ts">
import { ProfileForm } from '../components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/useAuthStore'
import { Profile } from '../types/Profile'
import { useProfile } from '../composables'
const store = useAuthStore()
const { user } = storeToRefs(store)
const { getProfile, profile, updateProfile, isPending } = useProfile()
if (user.value) await getProfile(user.value.id)

const handleSubmit = async (value: Profile) => {
  const updates = { ...value, id: user.value!.id }
  await updateProfile(updates)
}
</script>

<template>
  <div>Profile</div>
  <pre v-if="profile">{{ JSON.stringify(profile, undefined, 2) }}</pre>

  <ProfileForm
    :is-pending="isPending"
    :profile="profile!"
    :user="user"
    @update-profile="(value) => handleSubmit(value)"
  />

  <v-divider></v-divider>
</template>
