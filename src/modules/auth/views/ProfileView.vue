<script setup lang="ts">
// library imports
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

// components
import {
  ProfileDetails,
  ProfileForm,
  ProfileHead,
  AlertError,
  ProfileAvatar,
  ProfileAvatarButtons,
} from '../components'

// types
import { Profile } from '../types/Profile'

// store imports
import { useAvatarStore } from '../store/useAvatarStore'
import { useAuthStore } from '../store/useAuthStore'
import { useProfileStore } from '../store/useProfileStore'

// composable imports
import { useProfile, useAvatar } from '../composables'

// store
const authStore = useAuthStore()
const profileStore = useProfileStore()
const avatarStore = useAvatarStore()

// reactive
const profileForm = ref(false)
const { user } = storeToRefs(authStore)
const { profile, userProfile } = storeToRefs(profileStore)

// composables
const {
  error,
  isPending,
  getProfile,
  updateProfile: _updateProfile,
  updateAvatarUrl,
} = useProfile()
const {
  error: avatarError,
  isPending: avatarPending,
  updateAvatar: _updateAvatar,
  handleFile,
  downloadImage,
} = useAvatar()

// methods
const toggleForm = () => {
  profileForm.value = !profileForm.value
}

const updateProfile = async (profile: Profile) => {
  if (!user.value) return
  const date = new Date()
  const updates = {
    ...profile,
    id: user.value.id,
    updated_at: date.toISOString(),
  }
  try {
    await _updateProfile(updates)
    toggleForm()
  } catch (error) {
    console.error('Erro ao atualizar o perfil', error)
  }
}

const updateAvatar = async (): Promise<void> => {
  if (!user.value) return
  try {
    const filePath = await _updateAvatar()
    if (!filePath) throw Error('O arquivo não foi selecionado')
    await updateAvatarUrl(user.value.id, filePath)
  } catch (error) {
    console.error('Erro ao atualizar o avatar', error)
  }
}
const loadProfile = async () => {
  console.log('Carregando Perfil')
  try {
    if (!user.value) throw Error('Usuario não existente')
    await getProfile(user.value.id)
    await downloadImage(profile.value?.avatar_url)
  } catch (error) {
    console.error('Erro ao carregar perfil', error)
  }
}

const cancelUpdate = async () => {
  await loadProfile()
  avatarStore.editMode = false
  avatarStore.file = null
}

await loadProfile()
</script>

<template>
  <v-container class="justify-center">
    <v-sheet class="d-flex align-center justify-center">
      <ProfileAvatar
        :img="avatarStore.src"
        :user-profile="userProfile"
      />
      <div class="ml-n16 mb-n16">
        <ProfileAvatarButtons
          :edit-mode="avatarStore.editMode"
          :is-pending="avatarPending === 'updateAvatar'"
          @cancel-update="cancelUpdate"
          @handle-file="handleFile"
          @update-avatar="updateAvatar"
        />
      </div>
    </v-sheet>
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
      :is-pending="isPending === 'updateProfile'"
      :profile="profile!"
      :user="user"
      @toggle-form="toggleForm"
      @update-profile="(profile) => updateProfile(profile)"
    />
    <AlertError :error="error || avatarError" />
  </v-container>
</template>
