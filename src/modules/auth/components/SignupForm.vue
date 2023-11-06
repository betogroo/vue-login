<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { Credentials, validationSignupSchema } from '../types/Auth'

interface Props {
  isPending?: boolean
}
withDefaults(defineProps<Props>(), {
  isPending: false,
})

const emit = defineEmits<{
  signup: [values: Credentials]
}>()

const { values, handleSubmit, meta } = useForm<Credentials>({
  validationSchema: validationSignupSchema,
})

const full_name = useField('full_name', validationSignupSchema)
const email = useField('email', validationSignupSchema)
const password = useField('password', validationSignupSchema)
const passwordConfirm = useField('passwordConfirm', validationSignupSchema)

const onSubmit = handleSubmit(async () => {
  emit('signup', values)
})
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="full_name.value.value"
          density="compact"
          :error-messages="full_name.errorMessage.value"
          label="Nome"
          placeholder="Digite o seu nome"
          type="text"
          variant="outlined"
        />
      </v-col>
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
        <v-text-field
          v-model="passwordConfirm.value.value"
          density="compact"
          :error-messages="passwordConfirm.errorMessage.value"
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
          :disabled="!meta.valid"
          :loading="isPending"
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
            :to="{ path: '/login' }"
            >aqui</RouterLink
          >
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
