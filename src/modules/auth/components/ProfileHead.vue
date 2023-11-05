<script setup lang="ts">
import { UserProfile } from '../types/Profile'
import { useHelpers } from '@/shared/composables'

interface Props {
  userProfile: UserProfile
}
defineProps<Props>()

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
    <v-col
      class="ma-1 pa-1"
      variant="text"
    >
      <div class="text-h6">{{ userProfile.full_name }}</div>
      <div class="text-subtitle-1">{{ userProfile.username }}</div>
    </v-col>
  </v-row>
</template>
