<script setup lang="ts">
import { useProfile } from '../composables'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/useAuthStore'
import { ref } from 'vue'
import type { Profile } from '../composables/useProfile'
const store = useAuthStore()
const { user } = storeToRefs(store)
const { error, getProfile, profile, isPending, updateProfile } = useProfile()
await getProfile(user.value!.id)

const updates = ref<Profile>({
  id: user.value?.id,
  username: profile.value?.username,
  website: profile.value?.website,
  avatar_url: profile.value?.avatar_url,
  full_name: profile.value?.full_name,
})

const handleSubmit = async () => {
  console.log(updates.value)
  await updateProfile(updates.value)
}
</script>

<template>
  <div>Profile</div>
  <div>{{ profile }}</div>

  <v-divider></v-divider>

  <v-form @submit.prevent="handleSubmit">
    <v-text-field v-model="updates!.username" />
    <v-text-field v-model="updates!.website" />
    <v-text-field v-model="updates!.avatar_url" />
    <v-text-field v-model="updates!.full_name" />
    <v-btn type="submit">Atualizar</v-btn>
  </v-form>
</template>
