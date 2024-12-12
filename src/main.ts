import Cookies from 'universal-cookie'

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const cookies = new Cookies(null, { path: '/' })
cookies.set('locale', cookies.get('locale') || 'en')

const app = createApp(App)

app.use(router)

app.mount('#app')
