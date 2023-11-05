<script setup lang="ts">
import { toRefs } from 'vue'
import type { UserProfile } from '../types/Profile'
interface Props {
  userProfile: UserProfile
}
const props = defineProps<Props>()

const emit = defineEmits<{
  toggleForm: [value?: boolean]
}>()
const { userProfile } = toRefs(props)

const toggleForm = () => {
  emit('toggleForm')
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-btn
        block
        color="primary"
        variant="outlined"
        @click="toggleForm"
        >Editar Perfil</v-btn
      >
    </v-col>
    <v-col>
      <v-sheet class="d-flex align-center my-2">
        <div class="pr-3"><v-icon>mdi-at</v-icon></div>
        <div>{{ userProfile.email }}</div>
      </v-sheet>
      <v-sheet class="d-flex align-center my-2">
        <div class="pr-3"><v-icon>mdi-link-variant</v-icon></div>
        <div>{{ userProfile.website }}</div>
      </v-sheet>
    </v-col>
  </v-row>
</template>
