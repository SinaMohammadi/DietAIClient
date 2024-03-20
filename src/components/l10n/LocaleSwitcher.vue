<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { supportedLocales } from '@/i18n'
import { useLocale } from 'vuetify'
import { axiosService } from '@/utils/service'

const router = useRouter()
const { locale } = useI18n()
const { current, isRtl } = useLocale()

function onLocaleChange(event_) {
  const newLocale = event_
  if (newLocale === locale.value) {
    return
  }
  console.log(newLocale)
  isRtl.value = newLocale == 'fa' ? true : false
  current.value = event_
  axiosService.language = event_
  router.push(`/${newLocale}`)
}
const locales = computed(() =>
  Object.keys(supportedLocales).map((code) => ({
    code,
    name: supportedLocales[code].name
  }))
)
</script>

<template>
  <v-select
    :items="locales"
    density="compact"
    item-title="name"
    item-value="code"
    :model-value="$i18n.locale"
    @update:modelValue="onLocaleChange($event)"
  ></v-select>
</template>
