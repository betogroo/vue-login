<script setup lang="ts">
interface Props {
  error: Error | null | string
}
withDefaults(defineProps<Props>(), {
  error: null,
})
</script>

<template>
  <v-alert
    v-if="error"
    border="start"
    class="d-flex align-center mt-1"
    density="compact"
    type="error"
  >
    <template #prepend>
      <v-icon>mdi-alert-circle-outline</v-icon>
    </template>
    <template #text>
      <span class="text-subtitle-2 font-weight-bold">Erro - </span>
      <span class="text-body-2">{{ error }}</span>
    </template>
  </v-alert>
</template>
