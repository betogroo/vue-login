import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { type Profile, ProfileSchema } from '../types/Profile'
import { useHelpers } from '@/shared/composables'
import { useProfileStore } from '../store/useProfileStore'
import { useFeedbackStore } from '@/shared/store/useFeedbackStore'
import { storeToRefs } from 'pinia'

const { handleError } = useHelpers()

const profile = ref<Profile>()
const useProfile = () => {
  //store
  const store = useProfileStore()
  const feedbackStore = useFeedbackStore()
  const { error, isPending } = storeToRefs(feedbackStore)

  const getProfile = async (id: string) => {
    try {
      await feedbackStore.clearErrorAndSetPending('getProfile', true)
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
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }

  const updateAvatarUrl = async (id: string, avatar_url: string) => {
    try {
      const updated_at = new Date().toISOString()
      await feedbackStore.clearErrorAndSetPending('updateAvatarUrl', true)
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
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }

  const updateProfile = async (updates: Profile) => {
    try {
      await feedbackStore.clearErrorAndSetPending('updateProfile', true)
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
      feedbackStore.error = handleError(err)
    } finally {
      feedbackStore.isPending = false
    }
  }
  return {
    error,
    isPending,
    profile,
    getProfile,
    updateAvatarUrl,
    updateProfile,
  }
}

export default useProfile
