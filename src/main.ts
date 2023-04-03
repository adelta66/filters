import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/colors.css'

const app = createApp(App)

declare global {
    interface instruction {
        name: string,
        key: string,
        inputColorSpace: string,
        type: string,
        computed: boolean,
        additionalData?: any,
    }
    type image = Uint8ClampedArray
}

app.use(createPinia())
app.use(router)

app.mount('#app')
