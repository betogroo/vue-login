// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './useAuthStore'
import {
  ProfileCastingSchema,
  Profile,
  ProfileCasting,
  UserProfile,
} from '../types/Profile'

export const useProfileStore = defineStore('profile', () => {
  const auth = useAuthStore()
  const profile = ref<Profile | ProfileCasting>()

  const setProfile = (value: ProfileCasting) => {
    const parsedData = ProfileCastingSchema.parse(value)
    profile.value = parsedData
  }

  const userProfile = computed<UserProfile | any>(() => {
    const res = { ...profile.value, ...auth.user }
    return res
  })
  return { profile, setProfile, userProfile }
})
