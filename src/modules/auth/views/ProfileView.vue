<script setup lang="ts">
import { ref } from 'vue'
import {
  ProfileDetails,
  ProfileForm,
  ProfileHead,
  AlertError,
} from '../components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/useAuthStore'
import { useProfileStore } from '../store/useProfileStore'
import { useProfile } from '../composables'
import { Profile } from '../types/Profile'
const store = useAuthStore()
const profileStore = useProfileStore()
const profileForm = ref(false)
const { user } = storeToRefs(store)
const { profile, userProfile } = storeToRefs(profileStore)
const { getProfile, updateProfile, isPending, error } = useProfile()

if (user.value) await getProfile(user.value.id)

const handleSubmit = async (value: Profile) => {
  if (!user.value) return
  const date = new Date()
  const updates = {
    ...value,
    id: user.value.id,
    updated_at: date.toISOString(),
  }
  await updateProfile(updates)
  toggleForm()
}
const toggleForm = () => {
  profileForm.value = !profileForm.value
}
</script>

<template>
  <v-container class="justify-center">
    <v-responsive
      class="px-3"
      max-width="412"
    >
      <ProfileHead
        :user-profile="userProfile"
        @toggle-form="toggleForm"
      />
      <ProfileDetails
        v-if="!profileForm"
        :user-profile="userProfile"
        @toggle-form="toggleForm"
      />
      <ProfileForm
        v-if="profileForm"
        :is-pending="isPending"
        :profile="profile!"
        :user="user"
        @toggle-form="toggleForm"
        @update-profile="(value) => handleSubmit(value)"
      />
      <AlertError :error="error" />
    </v-responsive>
  </v-container>
</template>
