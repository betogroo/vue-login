import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAvatarStore = defineStore('avatar', () => {
  const editMode = ref(false)
  const file = ref<File | null>(null)
  const src = ref<string | undefined>('ddd')

  const $reset = () => {
    editMode.value = false
    file.value = null
    src.value = undefined
  }
  return { src, editMode, file, $reset }
})
