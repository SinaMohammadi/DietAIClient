<script setup lang="ts">
import { computed } from 'vue'
const data = defineProps(['finalData', 'loading', 'model'])
const loading = computed(() => data.loading)
const finalData = computed(() => data.finalData)
const model = computed(() => data.model)
</script>

<template>
  <v-container>
    <v-spacer class="spacer" />
    <v-alert
      closable
      color="success"
      icon="$success"
      :title="$t('tracking_title') + finalData.code"
      :text="$t('tracking_main')"
      v-if="finalData.code != '' && finalData.code"
      type="info"
    ></v-alert>
    <v-spacer class="spacer" />
    <v-card
      variant="tonal"
      v-if="loading || finalData.message != ''"
      :loading="loading"
      :title="$t('program') +' ' + model.name"
    >
      <v-card-actions>
        <v-row>
          <v-col :cols="12"> {{ finalData.message }} </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
.spacer {
  margin: 25px 0px 25px 0px;
}
.rtl {
  direction: rtl !important;
}
</style>
