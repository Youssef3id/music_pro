import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import veeValidatePlugin from './includes/validation'

import App from './App.vue'
import router from './router'
import { getAuth } from 'firebase/auth'

import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ar,
  },
})
export default { i18n }
const auth = getAuth()
let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(createPinia())
    app.use(i18n)
    app.use(router)
    app.use(veeValidatePlugin)
    app.mount('#app')
  }
})
