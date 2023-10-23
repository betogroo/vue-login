<script setup lang="ts">
import { version as vuetifyVersion } from 'vuetify'
import { version as vueVersion } from 'vue'
</script>
<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row justify="center">
        <v-col
          class="d-flex justify-center"
          cols="12"
          sm="6"
        >
          <v-sheet max-width="200">
            <v-img
              cover
              src="@/assets/logo_vue.svg"
              width="200"
            />
            {{ vueVersion }}
          </v-sheet>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-sheet max-width="200">
            <v-img
              cover
              src="@/assets/logo_vuetify.svg"
              width="200"
            />
            {{ vuetifyVersion }}
          </v-sheet>
        </v-col>
      </v-row>

      <div class="py-14" />
    </v-responsive>
  </v-container>
</template>
