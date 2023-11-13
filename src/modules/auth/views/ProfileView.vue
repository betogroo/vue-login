<script setup lang="ts">
import { ref } from 'vue'
import { AppFileBtn } from '@/shared/components/'
import {
  ProfileDetails,
  ProfileForm,
  ProfileHead,
  AlertError,
  ProfileAvatar,
} from '../components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/useAuthStore'
import { useProfileStore } from '../store/useProfileStore'
import { useAvatarStore } from '../store/useAvatarStore'
import { useProfile } from '../composables'
import { Profile } from '../types/Profile'
import { render } from 'vue'
const store = useAuthStore()
const profileStore = useProfileStore()
const avatarStore = useAvatarStore()
const profileForm = ref(false)
const { user } = storeToRefs(store)
const { profile, userProfile } = storeToRefs(profileStore)
const { src } = storeToRefs(avatarStore)
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
const handleFile = (evt: Event) => {
  const input = evt.target as HTMLInputElement
  const file = input.files?.length ? input.files[0] : null
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarStore.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <v-container class="justify-center">
    <ProfileAvatar
      :img="avatarStore.src"
      :user-profile="userProfile"
    />
    <AppFileBtn
      text="Alterar"
      @change="handleFile"
      >Alterar</AppFileBtn
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
  </v-container>
</template>
