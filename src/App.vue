<script setup lang="ts">
import MainHeader from './components/MainHeader.vue'
import SearchComponent from './components/SearchComponent.vue'
import SneakBar from './components/SneakBar.vue'
</script>

<template>
  <v-app>
    <SneakBar />
    <MainHeader />
    <main>
      <SearchComponent />
    </main>
    <RouterView />
  </v-app>
</template>

<style scoped>
main {
  padding-left: 28px;
  padding-right: 28px;
}
</style>
