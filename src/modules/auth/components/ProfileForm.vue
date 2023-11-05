<script setup lang="ts">
import type { User } from '../types/Auth'
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
  toggleForm: [value?: boolean]
  updateProfile: [values: Profile]
}>()

const toggleForm = () => {
  emit('toggleForm')
}

const { values, handleSubmit, meta, resetField } = useForm<Profile>({
  validationSchema: validationProfileSchema,
  initialValues: props.profile,
})

const username = useField('username', validationProfileSchema)
const website = useField('website', validationProfileSchema)
const full_name = useField('full_name', validationProfileSchema)

const onSubmit = handleSubmit(async () => {
  // console.log(values, meta)
  emit('updateProfile', values)
})
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="full_name.value.value"
          clearable
          density="compact"
          :error-messages="full_name.errorMessage.value"
          label="Nome"
          variant="outlined"
          @click:clear="resetField('full_name')"
        >
        </v-text-field>
        <v-text-field
          v-model="username.value.value"
          clearable
          density="compact"
          :error-messages="username.errorMessage.value"
          placeholder="Username"
          prepend-icon="mdi-account-tie"
          variant="outlined"
          @click:clear="resetField('username')"
        />
        <v-text-field
          v-model="website.value.value"
          clearable
          density="compact"
          :error-messages="website.errorMessage.value"
          placeholder="Website"
          prepend-icon="mdi-link-variant"
          variant="outlined"
          @click:clear="resetField('website')"
        />
        <v-btn
          color="success"
          density="comfortable"
          :disabled="!meta.valid"
          :loading="isPending"
          type="submit"
          >Salvar</v-btn
        >
        <v-btn
          class="ml-3"
          color="red"
          density="comfortable"
          variant="outlined"
          @click="toggleForm"
          >Cancelar</v-btn
        >
      </v-form>
    </v-col>
  </v-row>
</template>
