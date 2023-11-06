<script setup lang="ts">
import { APP_TITLE } from '@/config'
import type { User } from '@/modules/auth/types/Auth'
interface Props {
  isPending: boolean
  user: User
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
      <template v-if="user">
        <v-btn
          icon="mdi-account"
          :to="{ name: 'ProfileView' }"
        />
        <v-btn
          icon="mdi-logout"
          :loading="isPending"
          @click="handleLogout"
        />
      </template>
      <template v-else>
        <v-btn :to="{ name: 'LoginView' }">Login</v-btn>
        <v-btn :to="{ name: 'SignupView' }">Registre-se</v-btn>
      </template>
    </div>
  </v-app-bar>
</template>
