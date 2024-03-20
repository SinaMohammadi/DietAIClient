<script setup lang="ts">
import HeaderLogo from '@/components/Icons/HeaderLogo.vue'
import RecoverModal from './RecoverModal.vue'
import { ref, provide } from 'vue'
import LocaleSwitcher from './l10n/LocaleSwitcher.vue'
const action = ref(false)
provide('modal', action)
</script>
<template>
  <header class="header">
    <nav>
      <div>
        <HeaderLogo class="logo" />
      </div>
      <div>
        <LocaleSwitcher />
      </div>
      <div>
        <v-btn
          variant="outlined"
          color="#252B48"
          class="fb-btn grey--text"
          @click="action = !action"
        >
          {{ $t('recovery_title') }}
        </v-btn>
      </div>
    </nav>
    <RecoverModal :action="action" />
  </header>
</template>
<style scoped>
.container {
  padding: 0 28px 0 28px;
}
.header {
  width: 100vw;
  height: 80px;
  background-color: #f1f0e8;
  padding: 0 28px 0 28px;
}
nav {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.logo {
  width: 128px;
  height: 128px;
  cursor: pointer;
}
</style>
