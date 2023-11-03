<script setup lang="ts">
import { ref, toRefs } from 'vue'
import type { UserProfile } from '../types/Profile'
import { useHelpers } from '@/shared/composables'
interface Props {
  userProfile: UserProfile
}
const props = defineProps<Props>()
const { avatarInitials } = useHelpers()
const { userProfile } = toRefs(props)

const profileForm = ref(false)
const toggleProfileForm = () => {
  profileForm.value = !profileForm.value
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-avatar
          color="red"
          size="256"
        >
          <span class="text-h1">{{
            userProfile.full_name ? avatarInitials(userProfile.full_name) : 'VL'
          }}</span>
        </v-avatar>
      </v-col>
      <v-col cols="12">
        <v-card
          v-if="!profileForm"
          class="ma-1 pa-1"
          variant="text"
        >
          <div class="text-h6">{{ userProfile.full_name }}</div>
          <div class="text-subtitle-1">{{ userProfile.username }}</div>
          <v-btn
            block
            class="mt-3"
            color="primary"
            variant="outlined"
            @click="toggleProfileForm"
            >Editar Perfil</v-btn
          >
          <v-sheet class="d-flex align-center my-2">
            <div class="pr-3"><v-icon>mdi-at</v-icon></div>
            <div>{{ userProfile.email }}</div>
          </v-sheet>
          <v-sheet class="d-flex align-center my-2">
            <div class="pr-3"><v-icon>mdi-link-variant</v-icon></div>
            <div>{{ userProfile.website }}</div>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          v-if="profileForm"
          class="ma-1 pa-1"
          height="400"
          variant="text"
        >
          <v-text-field
            density="compact"
            label="Nome"
            variant="outlined"
          >
          </v-text-field>
          <v-text-field
            density="compact"
            placeholder="Username"
            prepend-icon="mdi-account-tie"
            variant="outlined"
          />
          <v-text-field
            density="compact"
            placeholder="Website"
            prepend-icon="mdi-link-variant"
            variant="outlined"
          />
          <v-btn
            color="success"
            density="comfortable"
            >Salvar</v-btn
          >
          <v-btn
            class="ml-3"
            color="red"
            density="comfortable"
            variant="outlined"
            @click="toggleProfileForm"
            >Cancelar</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
