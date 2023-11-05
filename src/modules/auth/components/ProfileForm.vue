<script setup lang="ts">
const emit = defineEmits<{
  toggleForm: [value?: boolean]
  handleSubmit: [value?: any]
}>()
const handleSubmit = () => {
  emit('handleSubmit')
}
const toggleForm = () => {
  emit('toggleForm')
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          density="compact"
          label="Nome"
          variant="outlined"
        >
        </v-text-field>
        <v-text-field
          density="compact"
          placeholder="Username"
          prepend-icon="mdi-account-tie"
          variant="outlined"
        />
        <v-text-field
          density="compact"
          placeholder="Website"
          prepend-icon="mdi-link-variant"
          variant="outlined"
        />
        <v-btn
          color="success"
          density="comfortable"
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
