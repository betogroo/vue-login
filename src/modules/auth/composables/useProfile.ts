import { ref } from 'vue'
import { useHelpers } from '@/shared/composables'
const { delay } = useHelpers()

const useProfile = () => {
  const isPending = ref(false)
  const error = ref(null)
  const profile = ref('')

  const getProfile = (userId: string) => {
    profile.value = userId
  }
  return { isPending, error, getProfile, profile }
}

export default useProfile
