import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { agent } from './services/atpAgent.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$atpAgent = agent
document.title = 'Bluesky Team Tracker'


app.mount('#app')

