import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { useHelpers } from '@/shared/composables'
const { delay: _delay, handleError } = useHelpers()

import { useAvatarStore } from '../store/useAvatarStore'

const error = ref<Error | null | string>(null)
const isPending = ref<boolean | string>(false)

const clearErrorAndSetPending = async (action: string, delay = false) => {
  error.value = null
  isPending.value = action
  if (delay) await _delay()
}

const useAvatar = () => {
  const store = useAvatarStore()

  const downloadImage = async (avatar_url: string | null | undefined) => {
    try {
      if (!avatar_url) return
      const { data, error: err } = await supabase.storage
        .from('avatars')
        .download(avatar_url)
      if (err) throw err
      store.src = URL.createObjectURL(data)
    } catch (err) {
      error.value = handleError(err)
    }
  }

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
      clearErrorAndSetPending('updateAvatar', true)
      if (!store.file) throw new Error('Nenhuma imagem foi selecionada')
      const fileExt = store.file.name.split('.').pop()
      const filePath = `${Date.now()}.${fileExt}`

      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, store.file)
      if (uploadError) throw uploadError
      await _delay()
      store.editMode = false
      return data.path
    } catch (err) {
      error.value = handleError(err)
    } finally {
      isPending.value = false
    }
  }
  return { isPending, error, updateAvatar, handleFile, downloadImage }
}

export default useAvatar
