import { ref } from 'vue'
import { z } from 'zod'
import { supabase } from '@/plugins/supabase'

const ProfileSchema = z.object({
  id: z.string().nullish(),
  username: z.string().nullish(),
  website: z.string().nullish(),
  avatar_url: z.string().optional().nullish(),
  full_name: z.string().nullish(),
})

export type Profile = z.infer<typeof ProfileSchema> | null
const profile = ref<Profile>(null)

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
        .select('username, website, avatar_url, full_name')
        .eq('id', id)
        .single()
      if (err && status !== 406) throw err
      if (data) profile.value = ProfileSchema.parse(data)
    } catch (err) {
      const e = err as Error
      error.value = e.message
      console.log(error.value)
    } finally {
      isPending.value = false
    }
  }

  const updateProfile = async (updates: Profile) => {
    try {
      isPending.value = true
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
