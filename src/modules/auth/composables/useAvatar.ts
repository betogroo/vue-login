import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { useHelpers } from '@/shared/composables'
const { delay, handleError } = useHelpers()

import { useAvatarStore } from '../store/useAvatarStore'

const useAvatar = () => {
  const store = useAvatarStore()
  const isPending = ref(false)
  const error = ref<string | null>(null)

  const updateAvatar = async () => {
    console.log('Vai salvar a parada')
    try {
      error.value = null
      isPending.value = true
      if (!store.file) return
      const fileExt = store.file.name.split('.').pop()
      const filePath = `${Math.random()}.${fileExt}`
      if (store.file) {
        const { error: err } = await supabase.storage
          .from('avatars')
          .upload(filePath, store.file)
        if (err) throw err
      }
      await delay()
      store.editMode = false
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }
  return { isPending, error, updateAvatar }
}

export default useAvatar
