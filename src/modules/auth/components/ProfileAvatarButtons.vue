<script setup lang="ts">
import { AppFileBtn } from '@/shared/components'
interface Props {
  editMode?: boolean
  isPending?: boolean
}
withDefaults(defineProps<Props>(), {
  editMode: false,
  isPending: false,
})

const emit = defineEmits<{
  handleFile: [evt: Event]
  updateAvatar: []
}>()

const handleFile = (evt: Event) => {
  emit('handleFile', evt)
}
const updateAvatar = () => {
  emit('updateAvatar')
}
</script>

<template>
  <AppFileBtn
    v-if="!editMode"
    text="Alterar"
    @change="handleFile"
    >Alterar</AppFileBtn
  >
  <v-btn
    v-else
    color="black"
    density="compact"
    :loading="isPending"
    max-width="80"
    variant="outlined"
    @click="updateAvatar"
    >Salvar</v-btn
  >
</template>
