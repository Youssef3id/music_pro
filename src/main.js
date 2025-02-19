import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import veeValidatePlugin from './includes/validation'

import App from './App.vue'
import router from './router'
import { getAuth } from 'firebase/auth'
const auth = getAuth()
let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(veeValidatePlugin)
    app.mount('#app')
  }
})
