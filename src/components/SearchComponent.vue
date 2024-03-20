<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useToaster } from '../stores/counter'
import type { Ref } from 'vue'
import { DIetPostModel } from '../models/post'
import ResultCard from './ResultCard.vue'
import { axiosService } from '@/utils/service'
import { socket } from '@/utils/socket'

const { notify } = useToaster()
const valid: Ref<boolean> = ref(false)
const loading: Ref<boolean> = ref(false)
const sexs: string[] = ['مرد', 'زن']
const actions: string[] = ['افزایش وزن', 'کاهش وزن']
const model: DIetPostModel = reactive(new DIetPostModel())
const finalData = ref({ message: '', code: '' })
const data = ref('')
socket.on('chatgptResChunk', (data: any) => {
  if (data?.content && data.uniqId == model.uniqId) {
    finalData.value.message = data?.content
    loading.value = false
  }
})
const search: () => Promise<void> = async () => {
  loading.value = true
  try {
    const data = await axiosService.createData('dalle', model)
    loading.value = false
    finalData.value = data
  } catch (error: any) {
    loading.value = false
    notify(error.message, 'red', 3000)
  }
}
</script>

<template>
  <v-form v-model="valid" fast-fail @submit.prevent="search">
    <v-container class="">
      <v-spacer class="spacer" />
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="model.name" :label="$t('name')" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="model.sex"
            :items="sexs"
            :rules="[(v) => !!v || $t('input_rules')]"
            :label="$t('sex')"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="model.action"
            :items="actions"
            :rules="[(v) => !!v || $t('input_rules')]"
            :label="$t('goal')"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="model.height"
            :counter="3"
            :label="$t('height')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="model.weight"
            :counter="3"
            :label="$t('weight')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="model.age" :counter="3" :label="$t('age')" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            counter
            :label="$t('description')"
            v-model="model.description"
            rows="2"
            row-height="20"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn
            variant="outlined"
            class="pointer"
            color="#252B48"
            type="submit"
            v-if="!loading"
            :disabled="!valid"
          >
            {{ $t('searchBtn') }}
          </v-btn>
        </v-col>
      </v-row>
      <div>
        {{ data }}
      </div>
    </v-container>
  </v-form>

  <ResultCard :model="model" :loading="loading" :finalData="finalData" />
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
