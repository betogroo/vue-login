// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './useAuthStore'
import { ProfileCastingSchema, Profile, ProfileCasting } from '../types/Profile'

export const useProfileStore = defineStore('profile', () => {
  const auth = useAuthStore()
  const profile = ref<Profile | ProfileCasting>()

  const setProfile = (value: ProfileCasting) => {
    const parsedData = ProfileCastingSchema.parse(value)
    profile.value = parsedData
  }

  const fullProfile = computed(() => {
    return { ...profile.value, ...auth.user }
  })
  return { profile, setProfile, fullProfile }
})