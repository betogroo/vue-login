<script setup lang="ts">
import { ref } from 'vue'
import { ProfileDetails, ProfileForm, ProfileHead } from '../components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/useAuthStore'
import { useProfileStore } from '../store/useProfileStore'
import { useProfile } from '../composables'
const store = useAuthStore()
const profileStore = useProfileStore()
const profileForm = ref(false)
const { user } = storeToRefs(store)
const { userProfile } = storeToRefs(profileStore)
const { getProfile } = useProfile()
if (user.value) await getProfile(user.value.id)
const handleSubmit = () => {
  console.log('submit')
}
const toggleForm = () => {
  profileForm.value = !profileForm.value
}
</script>

<template>
  <v-container class="justify-center">
    <v-responsive
      class="px-3"
      max-width="412"
    >
      <ProfileHead
        :user-profile="userProfile"
        @toggle-form="toggleForm"
      />
      <ProfileDetails
        v-if="!profileForm"
        :user-profile="userProfile"
        @toggle-form="toggleForm"
      />
      <ProfileForm
        v-if="profileForm"
        @handle-submit="handleSubmit"
        @toggle-form="toggleForm"
      />
    </v-responsive>
  </v-container>
</template>
