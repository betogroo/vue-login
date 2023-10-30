import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { Profile, ProfileSchema } from '../types/Profile'
import { useHelpers } from '@/shared/composables'
import { useProfileStore } from '../store/useProfileStore'

const profile = ref<Profile>()
const { delay, handleError } = useHelpers()
const useProfile = () => {
  const store = useProfileStore()
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
        .select('id, username, website, avatar_url, full_name, updated_at')
        .eq('id', id)
        .single()
      if (err && status !== 406) throw err
      if (data) {
        const parsedData = ProfileSchema.parse(data)
        store.profile = parsedData
      }
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  const updateProfile = async (updates: Profile) => {
    try {
      error.value = null
      isPending.value = true
      await delay()
      const parsedData = ProfileSchema.parse(updates)
      const { error: err } = await supabase.from('profiles').upsert(parsedData)
      if (err) throw err
      store.profile = parsedData
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  return { isPending, error, profile, getProfile, updateProfile }
}

export default useProfile
