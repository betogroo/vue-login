<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  text?: string
  icon?: string | false
}
withDefaults(defineProps<Props>(), {
  text: 'Arquivo',
})

const emit = defineEmits<{
  change: [value: Event]
}>()

const inputFile = ref()

const handleInputFile = () => {
  if (inputFile.value) inputFile.value.click()
}

const uploadAvatar = async (evt: Event) => {
  emit('change', evt)
}
</script>

<template>
  <v-btn-avatar
    :icon="icon"
    @click="handleInputFile"
  >
  </v-btn-avatar>
  <v-file-input
    ref="inputFile"
    style="display: none"
    @change="uploadAvatar"
  ></v-file-input>
</template>
