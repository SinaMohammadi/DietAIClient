<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps(['to'])

const { locale } = useI18n()

const localizedUrl = computed(() =>
  props.to === '/' ? `/${locale.value}` : `/${locale.value}/${props.to}`
)
</script>

<template>
  <router-link :to="localizedUrl">
    <slot></slot>
  </router-link>
</template>
