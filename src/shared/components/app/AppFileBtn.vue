<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  text?: string
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
  <v-btn
    color="black"
    density="compact"
    max-width="80"
    @click="handleInputFile"
  >
    <template #default>
      <span class="text-capitalize">
        {{ text }}
      </span>
    </template>
  </v-btn>
  <v-file-input
    ref="inputFile"
    style="display: none"
    @change="uploadAvatar"
  ></v-file-input>
</template>
