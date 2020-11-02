import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 加载vant核心组件库
import 'vant/lib/index.css' // 加载vant全局样式
import './style/index.less' // 加载全局样式
import 'lib-flexible' //  rem 基准值
import './utils/dayjs' // 时间处理库
Vue.use(Vant) // 注册vant
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
