<script setup lang="ts">
import { User } from '../types/Auth'
import { type Profile, validationProfileSchema } from '../types/Profile'
import { useField, useForm } from 'vee-validate'

interface Props {
  user: User
  profile: Profile
  isPending?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isPending: false,
})
const emit = defineEmits<{
  updateProfile: [values: Profile]
}>()

const { values, handleSubmit, meta, handleReset, resetField } =
  useForm<Profile>({
    validationSchema: validationProfileSchema,
    initialValues: props.profile,
  })

const username = useField('username', validationProfileSchema)
const website = useField('website', validationProfileSchema)
const avatar_url = useField('avatar_url', validationProfileSchema)
const full_name = useField('full_name', validationProfileSchema)

const onSubmit = handleSubmit(async () => {
  console.log(values, meta)
  emit('updateProfile', values)
})
</script>

<template>
  <v-card
    class="pa-2 ma-1"
    variant="outlined"
  >
    <v-card-text>
      <v-form @submit.prevent="onSubmit">
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="username.value.value"
              clearable
              dirty
              :error-messages="username.errorMessage.value"
              label="Nome de Usuário"
              @click:clear="resetField('username')"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="full_name.value.value"
              clearable
              dirty
              :error-messages="full_name.errorMessage.value"
              label="Nome Completo"
              @click:clear="resetField('full_name')"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="website.value.value"
              clearable
              dirty
              :error-messages="website.errorMessage.value"
              label="Website"
              @click:clear="resetField('website')"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="avatar_url.value.value"
              clearable
              dirty
              :error-messages="avatar_url.errorMessage.value"
              label="URL do Avatar"
              @click:clear="resetField('avatar_url')"
            />
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              class="mr-3"
              color="red"
              :disabled="!meta.valid"
              :loading="isPending"
              type="submit"
              >Atualizar</v-btn
            >
            <v-btn
              color="primary"
              :disabled="!meta.dirty"
              @click="handleReset"
              >Redefinir Tudo</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
      <pre>{{ meta }}</pre>
    </v-card-text>
  </v-card>
</template>
