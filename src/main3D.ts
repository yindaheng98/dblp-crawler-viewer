import { createApp } from 'vue'
import "./style.css"
import App from './App3D.vue'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
