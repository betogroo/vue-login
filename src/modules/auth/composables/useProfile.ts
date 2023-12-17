import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { type Profile, ProfileSchema } from '../types/Profile'
import { useHelpers } from '@/shared/composables'
import { useProfileStore } from '../store/useProfileStore'
import { useFeedbackStore } from '@/shared/store/useFeedbackStore'
import { storeToRefs } from 'pinia'

const { handleError } = useHelpers()

const profile = ref<Profile>()
const roleIds = ref()
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

  const checkRoles = async (user_id: string, role_id: number) => {
    console.log(role_id)
    try {
      const { data: userRoles, error: roleError } = await supabase
        .from('user_roles')
        .select('role_id')
        .eq('user_id', user_id)
      if (roleError) throw roleError
      console.log(userRoles)
      roleIds.value = userRoles.map((role) => role.role_id)
      console.log(roleIds.value)
      return roleIds.value
    } catch (err) {
      console.log(err)
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
    roleIds,
    checkRoles,
    getProfile,
    updateAvatarUrl,
    updateProfile,
  }
}

export default useProfile
