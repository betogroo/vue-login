<script setup lang="ts">
import { useAvatarStore } from '../store/useAvatarStore'
const avatarStore = useAvatarStore()
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
import { useProfile, useAvatar } from '../composables'
import { Profile } from '../types/Profile'
const store = useAuthStore()
const profileStore = useProfileStore()

const profileForm = ref(false)
const { user } = storeToRefs(store)
const { profile, userProfile } = storeToRefs(profileStore)
const {
  getProfile,
  updateProfile: _updateProfile,
  updateAvatarUrl,
  isPending,
  error: profileError,
} = useProfile()
const {
  error: avatarError,
  isPending: avatarPending,
  updateAvatar: _updateAvatar,
  handleFile,
} = useAvatar()

if (user.value) await getProfile(user.value.id)

const updateProfile = async (value: Profile) => {
  if (!user.value) return
  const date = new Date()
  const updates = {
    ...value,
    id: user.value.id,
    updated_at: date.toISOString(),
  }
  await _updateProfile(updates)
  toggleForm()
}
const toggleForm = () => {
  profileForm.value = !profileForm.value
}

const updateAvatar = async (): Promise<void> => {
  if (!user.value) return
  try {
    const filePath = await _updateAvatar()
    if (!filePath) throw Error('O arquivo não foi selecionado')
    await updateAvatarUrl(user.value.id, filePath)
    console.log(filePath)
  } catch (error) {
    console.error('Erro ao atualizar o avatar', error)
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
      :loading="avatarPending"
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
      @update-profile="(value) => updateProfile(value)"
    />
    <AlertError :error="profileError || avatarError" />
  </v-container>
</template>
