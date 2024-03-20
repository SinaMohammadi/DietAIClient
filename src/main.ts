import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { useI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import i18n from './i18n'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)
i18n.setup()
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },

  locale: {
    adapter: createVueI18nAdapter({ i18n: i18n.I18n, useI18n })
  }
})
app.use(i18n.I18n)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
