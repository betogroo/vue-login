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
    icon="mdi-pencil-outline"
    @change="handleFile"
  />
  <v-btn-avatar
    v-else
    icon="mdi-content-save-outline"
    :loading="isPending"
    @click="updateAvatar"
  />
</template>
