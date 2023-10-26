import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import {
  ProfileCastingSchema,
  type Profile,
  ProfileCasting,
} from '../types/Profile'
import { useHelpers } from '@/shared/composables'

const profile = ref<ProfileCasting>()
const { delay } = useHelpers()
const useProfile = () => {
  const isPending = ref(false)
  const error = ref<string | null>(null)

  const getProfile = async (id: string) => {
    try {
      error.value = null
      isPending.value = true
      const {
        data,
        error: err,
        status,
      } = await supabase
        .from('profiles')
        .select('id, username, website, avatar_url, full_name')
        .eq('id', id)
        .single()
      if (err && status !== 406) throw err
      if (data) profile.value = ProfileCastingSchema.parse(data)
    } catch (err) {
      const e = err as Error
      error.value = e.message
      console.log(error.value)
    } finally {
      isPending.value = false
    }
  }

  const updateProfile = async (updates: ProfileCasting) => {
    try {
      error.value = null
      isPending.value = true
      await delay()
      const { error: err } = await supabase.from('profiles').upsert(updates)
      if (err) throw error
    } catch (err) {
      const e = err as Error
      error.value = e.message
      console.log(error.value)
    } finally {
      isPending.value = false
    }
  }

  return { isPending, error, profile, getProfile, updateProfile }
}

export default useProfile
