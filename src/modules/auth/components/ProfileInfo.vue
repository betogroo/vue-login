<script setup lang="ts">
interface Props {
  title: string
}
defineProps<Props>()
</script>

<template>
  <v-row
    align="center"
    no-gutters
  >
    <v-col class="text-subtitle-1 font-weight-bold">{{ title }}:</v-col>
    <v-col class="text-body-1 font-weight-bold text-indigo-darken-1 text-left">
      <slot />
    </v-col>
  </v-row>
</template>
