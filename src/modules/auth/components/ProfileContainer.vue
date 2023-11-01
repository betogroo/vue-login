<script setup lang="ts">
import { toRefs } from 'vue'
import type { UserProfile } from '../types/Profile'
import { ProfileInfo } from '../components'
interface Props {
  userProfile: UserProfile
}
const props = defineProps<Props>()

const { userProfile } = toRefs(props)
</script>

<template>
  <v-card
    class="pa-2 ma-1"
    variant="outlined"
  >
    <h1 class="text-h5 text-left">{{ userProfile.full_name }}</h1>
    <h1 class="text-h6 font-weight-light">{{ userProfile.email }}</h1>
    <v-card-text>
      <ProfileInfo title="Nome">{{ userProfile.full_name }}</ProfileInfo>
      <ProfileInfo title="Email">{{ userProfile.email }}</ProfileInfo>
      <ProfileInfo title="Nome de Usuário">{{
        userProfile.username
      }}</ProfileInfo>
      <v-divider></v-divider>
      <ProfileInfo title="Website"
        ><v-list-item
          class="pa-0"
          density="compact"
          :href="userProfile.website?.toString()"
          nav
          tag="a"
          variant="plain"
          >{{ userProfile.website }}</v-list-item
        >
      </ProfileInfo>
      <ProfileInfo title="Data de Cadastro">{{
        new Date(userProfile.created_at!).toLocaleDateString()
      }}</ProfileInfo>
      <ProfileInfo title="Último Login">{{
        new Date(userProfile.last_sign_in_at!).toLocaleString()
      }}</ProfileInfo>
    </v-card-text>
  </v-card>
</template>
