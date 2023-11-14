import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { useHelpers } from '@/shared/composables'
const { delay, handleError } = useHelpers()

import { useAvatarStore } from '../store/useAvatarStore'

const useAvatar = () => {
  const store = useAvatarStore()
  const isPending = ref(false)
  const error = ref<string | null>(null)

  const handleFile = (evt: Event): void => {
    const input = evt.target as HTMLInputElement
    const file = input.files?.[0] || null
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') store.src = result
      }
      reader.readAsDataURL(file)
      store.file = file
      store.editMode = true
    }
  }

  const updateAvatar = async () => {
    try {
      error.value = null
      isPending.value = true
      if (!store.file) throw new Error('Nenhuma imagem foi selecionada')
      const fileExt = store.file.name.split('.').pop()
      const filePath = `${Date.now()}.${fileExt}`

      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, store.file)
      if (uploadError) throw uploadError
      await delay()
      store.editMode = false
      return data.path
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }
  return { isPending, error, updateAvatar, handleFile }
}

export default useAvatar
