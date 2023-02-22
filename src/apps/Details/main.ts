import { createApp } from 'vue'
import "../../style.css"
import Details from '../../components/echarts/Details.vue'

createApp(Details)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
