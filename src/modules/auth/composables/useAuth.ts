import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { Credentials, AuthUser } from '../types/Auth'
import { useHelpers } from '@/shared/composables'
const { delay } = useHelpers()

const error = ref<Error | null | string>(null)
const user = ref<AuthUser | undefined | null>(null)
const isPending = ref(false)

const useAuth = () => {
  const signup = async (credentials: Credentials) => {
    try {
      const { email, password } = credentials
      error.value = null
      isPending.value = true
      await delay()
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
      })
      if (err) throw err
      user.value = data.user
      return data.user
    } catch (err) {
      const e = err as Error
      error.value = e.message
      console.log(error)
    } finally {
      isPending.value = false
    }
  }

  const login = async (credentials: Credentials) => {
    try {
      const { email, password } = credentials
      error.value = null
      isPending.value = true
      await delay()
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      user.value = data.user
    } catch (err) {
      const e = err as Error
      error.value = e.message
    } finally {
      isPending.value = false
    }
  }

  const logout = async () => {
    try {
      error.value = null
      isPending.value = true
      await delay()
      const { error: err } = await supabase.auth.signOut()
      user.value = null
      if (err) throw err
    } catch (err) {
      const e = err as Error
      error.value = e.message
      console.log(e)
    } finally {
      isPending.value = false
    }
  }

  const getUser = async () => {
    try {
      error.value = null
      isPending.value = true
      await delay(1)
      const { data, error: err } = await supabase.auth.getSession()
      if (err) throw err
      if (!data.session) return
      console.log(data)
      if (data.session.user) user.value = data.session.user
    } catch (err) {
      const e = err as Error
      console.log(e.message)
    } finally {
      isPending.value = false
    }
  }
  const isLogged = () => {
    return !!user.value
  }

  return {
    user,
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
