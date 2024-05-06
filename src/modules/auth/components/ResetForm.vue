<script setup lang="ts">
import { Reset, validationResetSchema } from '../types/Auth'
import { useField, useForm } from 'vee-validate'

interface Props {
  isPending?: boolean
}
withDefaults(defineProps<Props>(), {
  isPending: false,
})

const emit = defineEmits<{
  reset: [reset: Reset]
}>()

const { values, handleSubmit, meta } = useForm<Reset>({
  validationSchema: validationResetSchema,
})

const email = useField('email', validationResetSchema)

const onSubmit = handleSubmit(async () => {
  emit('reset', values)
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
