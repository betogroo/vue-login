<script setup lang="ts">
import { User } from '../types/Auth'
import { Profile, validationProfileSchema } from '../types/Profile'
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

const { values, handleSubmit, meta } = useForm<Profile>({
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
  <v-form @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="username.value.value"
          dirty
          :error-messages="username.errorMessage.value"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="website.value.value" />
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="avatar_url.value.value" />
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="full_name.value.value" />
      </v-col>
      <v-col>
        <v-btn
          block
          color="primary"
          :loading="isPending"
          type="submit"
          >Atualizar</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
