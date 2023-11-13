<script setup lang="ts">
import { useHelpers } from '@/shared/composables'
import { UserProfile } from '../types/Profile'

interface Props {
  userProfile: UserProfile
}
const props = defineProps<Props>()

const { avatarInitials } = useHelpers()
</script>

<template>
  <v-row>
    <v-col
      class="text-center"
      cols="12"
    >
      <v-avatar
        color="red"
        size="256"
      >
        <span class="text-h1">{{
          userProfile.full_name ? avatarInitials(userProfile.full_name) : 'VL'
        }}</span>
      </v-avatar>
    </v-col>
  </v-row>
</template>
