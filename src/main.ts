import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import {axiosConfig} from '../src/plugins/axios.js';

const app = createApp(App)
app.config.globalProperties.$axios = axiosConfig
app.use(createPinia())
app.use(router)

app.mount('#app')
