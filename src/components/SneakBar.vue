<template>
  <template>
    <div class="text-center ma-2">
      <v-snackbar v-model="show"   :timeout="toaster.timeout" >
        {{ toaster.text }}
        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="toaster.action"> بستن </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
</template>
<script lang="ts" setup>
import { useToaster } from '../stores/counter'
import { storeToRefs } from 'pinia';
const toaster= useToaster()
const { show } = storeToRefs(toaster)
</script>
