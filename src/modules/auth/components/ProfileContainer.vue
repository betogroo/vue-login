<script setup lang="ts">
import { toRefs } from 'vue'
import type { UserProfile } from '../types/Profile'
import { ProfileInfor } from '../components'
interface Props {
  userProfile: UserProfile
}
const props = defineProps<Props>()

const { userProfile } = toRefs(props)
</script>

<template>
  <v-container>
    <h1 class="text-h5">{{ userProfile.full_name }}</h1>
    <h1 class="text-h6 font-weight-light">{{ userProfile.email }}</h1>
    <v-card>
      <v-card-text>
        <ProfileInfor title="Nome">{{ userProfile.full_name }}</ProfileInfor>
        <ProfileInfor title="Email">{{ userProfile.email }}</ProfileInfor>
        <ProfileInfor title="Nome de Usuário">{{
          userProfile.username
        }}</ProfileInfor>
        <v-divider></v-divider>
        <ProfileInfor title="Website"
          ><v-list-item
            class="pa-0"
            density="compact"
            :href="userProfile.website?.toString()"
            nav
            tag="a"
            variant="plain"
            >{{ userProfile.website }}</v-list-item
          >
        </ProfileInfor>
        <ProfileInfor title="Data de Cadastro">{{
          new Date(userProfile.created_at!).toLocaleDateString()
        }}</ProfileInfor>
        <ProfileInfor title="Último Login">{{
          new Date(userProfile.last_sign_in_at!).toLocaleString()
        }}</ProfileInfor>
      </v-card-text>
    </v-card>
  </v-container>
</template>
