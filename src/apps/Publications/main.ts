import { createApp } from 'vue'
import "../../style.css"
// import App from '../../components/publications/Publications.vue'
import App from '../../components/publications/Lines.vue'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
