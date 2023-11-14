<script setup lang="ts">
import { supabase } from '@/plugins/supabase'
import { useHelpers } from '@/shared/composables'
const { delay } = useHelpers()
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
const store = useAuthStore()
const profileStore = useProfileStore()
const avatarStore = useAvatarStore()
const profileForm = ref(false)
const { user } = storeToRefs(store)
const { file } = storeToRefs(avatarStore)
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
const handleFile = (evt: Event) => {
  const input = evt.target as HTMLInputElement
  avatarStore.file = input.files?.length ? input.files[0] : null
  if (avatarStore.file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarStore.src = e.target?.result as string
    }
    reader.readAsDataURL(avatarStore.file)
    avatarStore.editMode = true
  }
}

const updateAvatar = async () => {
  console.log('Vai salvar a parada')
  try {
    error.value = null
    isPending.value = true
    const fileExt = file.value?.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`
    if (file.value) {
      const { error: err } = await supabase.storage
        .from('avatars')
        .upload(filePath, file.value)
      if (err) throw err
    }
    await delay()
    avatarStore.editMode = false
  } catch (err) {
    const e = err as Error
    error.value = e.message
    console.log(e)
  } finally {
    isPending.value = false
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
      v-if="!avatarStore.editMode"
      text="Alterar"
      @change="handleFile"
      >Alterar</AppFileBtn
    >
    <v-btn
      v-else
      :loading="isPending"
      @click="updateAvatar"
      >Salvar</v-btn
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
