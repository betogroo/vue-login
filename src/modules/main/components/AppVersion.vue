<script setup lang="ts">
import { version as vuetifyVersion } from 'vuetify'
import { version as vueVersion } from 'vue'
const appVersion = __APP_VERSION__
const appName = __APP_NAME__
</script>

<template>
  <v-row>
    <v-col cols="12">
      <h5>{{ appName }}</h5>
      {{ appVersion }}
    </v-col>
    <v-col>
      <v-img src="@/assets/logo_vue.svg" />
      {{ vueVersion }}
    </v-col>
    <v-col>
      <v-img src="@/assets/logo_vuetify.svg" />
      {{ vuetifyVersion }}
    </v-col>
  </v-row>
</template>
