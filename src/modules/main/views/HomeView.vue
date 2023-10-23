<script setup lang="ts">
import { useAuth } from '@/modules/auth/composables'
import { useRouter } from 'vue-router'

const { logout, isPending } = useAuth()
const router = useRouter()
const handleLogout = async () => {
  await logout().then(() => {
    router.push({ name: 'LoginView' })
  })
}
</script>
<template>
  <v-container class="d-flex justify-center fill-height">
    <v-responsive
      class="text-center"
      max-width="600"
    >
      <h1 class="text-center text-h1">HOME PAGE</h1>
      <v-row>
        <v-col cols="12">
          <v-btn
            color="red"
            :to="{ name: 'RestrictView' }"
            >Ir para página restrita</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            color="error"
            :loading="isPending"
            @click="handleLogout"
            >Sair do Sistema</v-btn
          >
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
