<script setup lang="ts">
import { ref } from 'vue'
import type { Credentials } from '../types'
const emit = defineEmits<{
  signup: [credentials: Credentials]
}>()
const credentials = ref<Credentials>({
  email: '',
  password: '',
  passwordConfirm: '',
})
const handleSubmit = () => {
  emit('signup', credentials.value)
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="credentials.email"
          hide-details
          label="Email"
          placeholder="Digite o seu email de cadastro"
          type="email"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="credentials.password"
          hide-details
          label="Senha"
          placeholder="A senha deve conter números e letras"
          type="password"
          variant="outlined"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="credentials.passwordConfirm"
          hide-details
          label="Confirme"
          placeholder="A senha deve conter números e letras"
          type="password"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          block
          color="primary"
          type="submit"
          >Cadastrar</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-body-1">
          Já é cadastrado? Clique
          <RouterLink
            class="text-subtitle-1 text-decoration-none text-primary font-weight-black"
            :to="{ path: '/auth/login' }"
            >aqui</RouterLink
          >
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
