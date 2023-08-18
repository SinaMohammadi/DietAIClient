<script lang="ts" setup>
import { inject, reactive, ref } from 'vue'
const dialog: any = inject('modal')
const model = reactive({
  recoveryCode: ''
})
const loading = ref(false)
const finalData = ref({ message: '', code: '', dietCreator: '' })
const fetchRecovery = async () => {
  loading.value = true
  const data = await fetch(`http://localhost:8080/api/v1/dalle/${model.recoveryCode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const final = await data.json()
  if (final.status == 200) {
    finalData.value = final.data
  }
  loading.value = false
}

const close = () => {
  finalData.value = { message: '', code: '' }
  model.recoveryCode = ''
  dialog.value = false
}
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">باز یابی برنامه</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="model.recoveryCode"
                  label="کد برنامه "
                  placeholder="کد برنامه تو بهم بده :)"
                  required
                  clear-icon="mdi-close-circle"
                  clearable
                  :rules="[
                    () => !!model.recoveryCode || 'وارد کردن کد اجباری میباشد',
                    () =>
                      (!!model.recoveryCode && model.recoveryCode.length == 10) ||
                      'کد باید 10 کارکتر باشد'
                  ]"
                  @click:append="fetchRecovery"
                  append-icon="mdi-card-search"
                  variant="filled"
                  type="text"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-spacer class="spacer" />
            <v-alert
              closable
              color="success"
              icon="$success"
              :title="'بیا با این کد اینو پیدا کردم ' + finalData.code"
              v-if="finalData.code != '' && finalData.code"
              type="info"
            ></v-alert>
            <v-spacer class="spacer" />
            <v-row>
              <v-col col="12">
                <v-card
                  :loading="loading"
                  v-if="loading || finalData.message != ''"
                  :title="'برنامه ' + finalData.dietCreator"
                >
                  <v-card-actions>
                    <v-row>
                      <v-col :cols="12"> {{ finalData.message }} </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer class="spacer" />
          <v-btn color="red-darken-1" variant="text" @click="close()"> خروج </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
