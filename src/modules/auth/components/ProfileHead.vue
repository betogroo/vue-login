<script setup lang="ts">
import { UserProfile } from '../types/Profile'

interface Props {
  userProfile: UserProfile
}
defineProps<Props>()
</script>

<template>
  <v-row>
    <v-col
      class="ma-1 pa-1"
      variant="text"
    >
      <div class="text-h6">{{ userProfile.full_name }}</div>
      <div class="text-subtitle-1">{{ userProfile.username }}</div>
    </v-col>
  </v-row>
</template>
