import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { Credentials, AuthUser } from '../types'
import { useHelpers } from '@/shared/composables'
const { delay } = useHelpers()

const error = ref<Error | null | string>(null)
const user = ref<AuthUser | undefined | null>(null)
const isPending = ref(false)

const useAuth = () => {
  const signup = async (credentials: Credentials) => {
    try {
      const { email, password, passwordConfirm } = credentials
      error.value = null
      isPending.value = true
      await delay()
      if (password !== passwordConfirm) {
        throw new Error('As senhas não são iguais')
      }
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
      })
      if (err) throw err
      user.value = data.user
    } catch (err) {
      const e = err as Error
      error.value = e.message
      console.log(e.message)
    } finally {
      isPending.value = false
    }
  }
  return { isPending, error, signup, user }
}

export default useAuth
