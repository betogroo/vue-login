<script setup lang="ts">
import { Credentials } from '../types'
import { ref } from 'vue'
interface Props {
  isPending?: boolean
}
withDefaults(defineProps<Props>(), {
  isPending: false,
})

const emit = defineEmits<{
  login: [credentials: Credentials]
}>()
const credentials = ref<Credentials>({
  email: '',
  password: '',
})

const handleSubmit = () => {
  emit('login', credentials.value)
}
</script>

<template>
  <v-form
    :disabled="isPending"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="credentials!.email"
          hide-details
          label="Email"
          placeholder="Digite o seu email de cadastro"
          type="email"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="credentials!.password"
          hide-details
          label="Senha"
          placeholder="A senha deve conter números e letras"
          type="password"
          variant="outlined"
        />
      </v-col>
      <v-col>
        <v-btn
          block
          color="primary"
          type="submit"
          >Login</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-body-1">
          Ainda não tem cadastro? Clique
          <RouterLink
            class="text-subtitle-1 text-decoration-none text-primary font-weight-black"
            :to="{ path: '/signup' }"
            >aqui</RouterLink
          >
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
