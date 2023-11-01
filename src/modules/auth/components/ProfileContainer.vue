<script setup lang="ts">
interface Props {
  userId: string
}
const props = defineProps<Props>()
</script>

<template>
  <div>Usuário: {{ userId }}</div>
</template>
