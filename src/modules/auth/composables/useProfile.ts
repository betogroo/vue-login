import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { type Profile, ProfileSchema } from '../types/Profile'
import { useHelpers } from '@/shared/composables'
import { useProfileStore } from '../store/useProfileStore'

const { delay: _delay, handleError } = useHelpers()
const error = ref<Error | null | string>(null)
const isPending = ref<boolean | string>(false)

const clearErrorAndSetPending = async (action: string, delay = false) => {
  error.value = null
  isPending.value = action
  if (delay) await _delay()
}

const profile = ref<Profile>()
const useProfile = () => {
  const store = useProfileStore()

  const getProfile = async (id: string) => {
    try {
      await clearErrorAndSetPending('getProfile', true)
      const {
        data,
        error: err,
        status,
      } = await supabase
        .from('profiles')
        .select('id, username, website, avatar_url, full_name, updated_at')
        .eq('id', id)
        .returns<Profile[]>()
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
      await clearErrorAndSetPending('updateProfile', true)
      const parsedData = ProfileSchema.parse(updates)
      const { error: err } = await supabase.from('profiles').upsert(parsedData)
      if (err) throw err
      await supabase.auth.updateUser({
        data: {
          full_name: parsedData.full_name,
          username: parsedData.username,
        },
      })
      store.profile = parsedData
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  const updateAvatarUrl = async (id: string, avatar_url: string) => {
    try {
      const updated_at = new Date().toISOString()
      await clearErrorAndSetPending('updateAvatarUrl', true)
      const { data, error: err } = await supabase
        .from('profiles')
        .update({ avatar_url, updated_at })
        .eq('id', id)
        .select()
        .single()
      if (!data) throw err
      const parsedData = ProfileSchema.parse(data)
      store.profile = parsedData
      return parsedData
      //console.log(data)
      //return data
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }

  return {
    isPending,
    error,
    profile,
    getProfile,
    updateProfile,
    updateAvatarUrl,
  }
}

export default useProfile
