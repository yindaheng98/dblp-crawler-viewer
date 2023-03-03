import { createApp } from 'vue'
import "../../style.css"
// import Details from '../../components/echarts/Details.vue'
import Details from '../../components/echarts/Lines.vue'

createApp(Details)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
