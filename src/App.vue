<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import SearchComponent from './components/SearchComponent.vue'
import SneakBar from './components/SneakBar.vue';
</script>

<template>
  <v-locale-provider rtl>
    <SneakBar/>
    <MainHeader />
    <main>
      <SearchComponent />
    </main>
  </v-locale-provider>
  <RouterView />
</template>

<style scoped>
main {
  padding-top: 120px;
  padding-left: 28px;
  padding-right: 28px;
}
</style>
