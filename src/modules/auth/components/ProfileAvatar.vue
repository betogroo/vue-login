<script setup lang="ts">
import { useHelpers } from '@/shared/composables'
import { UserProfile } from '../types/Profile'

interface Props {
  userProfile: UserProfile
  img?: string | null
}
defineProps<Props>()

const { avatarInitials } = useHelpers()
</script>

<template>
  <v-avatar
    color="primary"
    size="256"
    variant="outlined"
  >
    <template v-if="img">
      <v-img
        cover
        :src="img"
      ></v-img>
    </template>
    <template v-else>
      <span class="text-h1">{{
        userProfile.full_name ? avatarInitials(userProfile.full_name) : 'VL'
      }}</span>
    </template>
  </v-avatar>
</template>
