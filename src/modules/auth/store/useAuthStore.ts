// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AuthUser, User } from '../types/Auth'
import { UserSchema } from '../types/Auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>(null)

  const setUser = (value: AuthUser | null) => {
    const parsedData = UserSchema.parse(value)
    user.value = parsedData
  }
  return { user, setUser }
})
