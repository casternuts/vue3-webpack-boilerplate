import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'

const app = createApp(App)

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

app
  .use(store)
  .mount('#app')