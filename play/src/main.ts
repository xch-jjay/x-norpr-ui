import { createApp } from 'vue'
import ZUI from '@xch-jjay/z-ui'
import '@z-ui/theme-chalk/src/index.scss'
import App from './App.vue'

const app = createApp(App)
app.use(ZUI)

app.mount('#app')
