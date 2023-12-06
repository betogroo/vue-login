import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useHelpers } from '../composables'

const { delay: _delay } = useHelpers()

export const useFeedbackStore = defineStore('feedback', () => {
  const isPending = ref<string | boolean>(false)
  const error = ref<Error | null | string>(null)

  const clearErrorAndSetPending = async (action: string, delay = false) => {
    error.value = null
    isPending.value = action
    if (delay) await _delay()
  }

  return { isPending, error, clearErrorAndSetPending }
})
