import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './app.vue'
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
