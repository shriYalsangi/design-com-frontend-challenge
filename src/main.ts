import './assets/main.css'

import 'vue-toastification/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Toast from 'vue-toastification'

const app = createApp(App)

app.use(createPinia())
app.use(Toast)

app.mount('#app')
