<script setup lang="ts">
import { Credentials, validationLoginSchema } from '../types/Auth'
import { useField, useForm } from 'vee-validate'

interface Props {
  isPending?: boolean
}
withDefaults(defineProps<Props>(), {
  isPending: false,
})

const emit = defineEmits<{
  login: [credentials: Credentials]
}>()

const { values, handleSubmit, meta } = useForm<Credentials>({
  validationSchema: validationLoginSchema,
})

const email = useField('email', validationLoginSchema)
const password = useField('password', validationLoginSchema)

const onSubmit = handleSubmit(async () => {
  emit('login', values)
})
</script>

<template>
  <v-form
    :disabled="isPending"
    @submit.prevent="onSubmit"
  >
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="email.value.value"
          density="compact"
          :error-messages="email.errorMessage.value"
          label="Email"
          placeholder="Digite o seu email de cadastro"
          type="email"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="password.value.value"
          density="compact"
          :error-messages="password.errorMessage.value"
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
          :disabled="!meta.valid"
          :loading="isPending"
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
