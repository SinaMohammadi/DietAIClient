<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useToaster } from '../stores/counter'
import type { Ref } from 'vue'
import { dietPostModel } from '../models/post'
import ResultCard from './ResultCard.vue';
const { notify } = useToaster()
const valid: Ref<boolean> = ref(false)
const loading: Ref<boolean> = ref(false)
const sexs: string[] = ['مرد', 'زن']
const actions: string[] = ['افزایش وزن', 'کاهش وزن']
const model: dietPostModel = reactive({
  height: 0,
  weight: 0,
  description: '',
  name: '',
  sex: '',
  age: 0,
  action: ''
})
const finalData = ref({ message: '', code: '' })
const search: () => Promise<void> = async () => {
  loading.value = true
  try {
    const data: Response = await fetch('http://localhost:8080/api/v1/dalle', {
      method: 'POST',
      body: JSON.stringify(model),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    loading.value = false
    const parsedValue = await data.json()
    if (data.status != 200) {
      notify(parsedValue.message, 'red', 4000)
      return
    }
    finalData.value = parsedValue
  } catch (err: any) {
    loading.value = false
    notify(err.message, 'red', 3000)
  }
}
</script>

<template>
  <v-form v-model="valid">
    <v-container class="">
      <v-spacer class="spacer" />
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="model.name" label="نام و نام خانوادگی" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="model.sex"
            :items="sexs"
            :rules="[(v) => !!v || 'برای دریافت بهتر اطلاعات بهتر است این قسمت را انتخاب کنید']"
            label="جنسیت"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="model.action"
            :items="actions"
            :rules="[(v) => !!v || 'برای دریافت بهتر اطلاعات بهتر است این قسمت را انتخاب کنید']"
            label="هدف"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="model.height" :counter="3" label="قد" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="model.weight" :counter="3" label="ورن" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="model.age" :counter="3" label="سن" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            counter
            label="توضیحات"
            v-model="model.description"
            rows="2"
            row-height="20"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn variant="outlined" class="pointer" color="#252B48" @click="search" v-if="!loading">
            برنامه برام بساز کن !!
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
<ResultCard  :model="model" :loading="loading" :finalData="finalData"/>
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
