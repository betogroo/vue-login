import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { Credentials } from '../types/Auth'
import { useHelpers } from '@/shared/composables'
import { useAuthStore } from '../store/useAuthStore'
import { useFeedbackStore } from '@/shared/store/useFeedbackStore'
const { setDefaultUsername, handleError } = useHelpers()

const useAuth = () => {
  const store = useAuthStore()
  const feedbackStore = useFeedbackStore()
  const signup = async (credentials: Credentials) => {
    try {
      const { email, password, full_name } = credentials
      await feedbackStore.clearErrorAndSetPending('signup', true)
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
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }

  const login = async (credentials: Credentials) => {
    try {
      const { email, password } = credentials
      await feedbackStore.clearErrorAndSetPending('login', true)
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      store.setUser(data.user)
      return data.user
    } catch (err) {
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }

  const logout = async () => {
    try {
      await feedbackStore.clearErrorAndSetPending('logout', true)
      const { error: err } = await supabase.auth.signOut()
      store.user = null
      if (err) throw err
    } catch (err) {
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }

  const getUser = async () => {
    try {
      await feedbackStore.clearErrorAndSetPending('getUser', true)
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
      feedbackStore.isPending = false
    }
  }
  const isLogged = () => {
    return !!store.user
  }

  return {
    //isPending,
    //error,
    signup,
    login,
    logout,
    getUser,
    isLogged,
  }
}

export default useAuth
