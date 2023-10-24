// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AuthUser } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  return { user }
})
