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
  cancelUpdate: []
}>()

const handleFile = (evt: Event) => {
  emit('handleFile', evt)
}
const updateAvatar = () => {
  emit('updateAvatar')
}
const cancelUpdate = () => {
  emit('cancelUpdate')
}
</script>

<template>
  <AppFileBtn
    v-if="!editMode"
    icon="mdi-pencil-outline"
    @change="handleFile"
  />
  <template v-else>
    <div class="d-flex flex-column">
      <v-btn-avatar
        icon="mdi-content-save-outline"
        :loading="isPending"
        @click="updateAvatar"
      />
      <v-btn-avatar
        icon="mdi-close-outline"
        @click="cancelUpdate"
      />
    </div>
  </template>
</template>
