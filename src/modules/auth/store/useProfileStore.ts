// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './useAuthStore'
import { Profile, UserProfile } from '../types/Profile'

export const useProfileStore = defineStore('profile', () => {
  const auth = useAuthStore()
  const profile = ref<Profile>({
    id: '',
    avatar_url: '',
    full_name: '',
    updated_at: '',
    username: '',
    website: '',
  })

  const $reset = () => {
    profile.value = {
      id: '',
      avatar_url: '',
      full_name: '',
      updated_at: '',
      username: '',
      website: '',
    }
  }

  const userProfile = computed<UserProfile>(
    () => <UserProfile>{ ...profile.value, ...auth.user },
  )
  return { profile, userProfile, $reset }
})
