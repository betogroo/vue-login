<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { validationSchema, Credentials } from '../types'

interface Props {
  isPending?: boolean
}
withDefaults(defineProps<Props>(), {
  isPending: false,
})

const emit = defineEmits<{
  signup: [values: Credentials]
}>()

const { handleSubmit, meta, values } = useForm<Credentials>({
  validationSchema,
})

const email = useField('email', validationSchema)
const password = useField('password', validationSchema)
const passwordConfirm = useField('passwordConfirm', validationSchema) || ''

const onSubmit = handleSubmit(async () => {
  console.log(values)
  emit('signup', values)
})
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="email.value.value"
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
