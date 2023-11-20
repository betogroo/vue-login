import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { Credentials } from '../types/Auth'
import { useHelpers } from '@/shared/composables'
import { useAuthStore } from '../store/useAuthStore'
const { delay, setDefaultUsername, handleError } = useHelpers()

const error = ref<Error | null | string>(null)
const isPending = ref(false)

const clearErrorAndSetPending = async () => {
  error.value = null
  isPending.value = true
  await delay()
}

const useAuth = () => {
  const store = useAuthStore()
  const signup = async (credentials: Credentials) => {
    try {
      const { email, password, full_name } = credentials
      await clearErrorAndSetPending()
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            username: setDefaultUsername(full_name),
          },
        },
      })
      if (err) throw err
      store.setUser(data.user)
      return data.user
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  const login = async (credentials: Credentials) => {
    try {
      const { email, password } = credentials
      await clearErrorAndSetPending()
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      store.setUser(data.user)
      return data.user
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  const logout = async () => {
    try {
      await clearErrorAndSetPending()
      const { error: err } = await supabase.auth.signOut()
      store.user = null
      if (err) throw err
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  const getUser = async () => {
    try {
      await clearErrorAndSetPending()
      const { data, error: err } = await supabase.auth.getSession()
      if (err) throw err
      console.log('getUser', data)
      if (!data.session) {
        store.user = null
        return
      }
      if (data.session.user) store.setUser(data.session.user)
    } catch (err) {
      const e = err as Error
      console.error('Erro:', e)
    } finally {
      isPending.value = false
    }
  }
  const isLogged = () => {
    return !!store.user
  }

  return {
    isPending,
    error,
    signup,
    login,
    logout,
    getUser,
    isLogged,
  }
}

export default useAuth
