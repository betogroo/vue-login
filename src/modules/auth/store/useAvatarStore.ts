import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAvatarStore = defineStore('avatar', () => {
  const src = ref<string | undefined>('ddd')
  return { src }
})
