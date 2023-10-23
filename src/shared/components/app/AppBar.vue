<script setup lang="ts">
import { APP_TITLE } from '@/config'
import type { AuthUser } from '@supabase/supabase-js'
interface Props {
  isPending: boolean
  user: AuthUser | undefined | null
}
withDefaults(defineProps<Props>(), {
  isPending: false,
})

const emit = defineEmits(['logout'])
const handleLogout = async () => {
  emit('logout')
}
</script>
<template>
  <v-app-bar
    color="blue"
    density="compact"
  >
    <v-app-bar-title>
      <RouterLink
        class="text-white text-decoration-none"
        :to="{ name: 'HomeView' }"
        >{{ APP_TITLE }}</RouterLink
      >
    </v-app-bar-title>
    <div class="ma-3">
      <v-btn
        icon="mdi-home"
        :to="{ name: 'HomeView' }"
        variant="text"
      />
      <v-btn
        icon="mdi-information"
        :to="{ name: 'AboutView' }"
      />
      <v-btn
        v-if="user"
        icon="mdi-logout"
        :loading="isPending"
        @click="handleLogout"
      />
    </div>
  </v-app-bar>
</template>
