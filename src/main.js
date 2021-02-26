import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import toast from 'components/common/toast'

Vue.config.productionTip = false
// 安装toast
Vue.use(toast)
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')


//解决移动端300m延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

//实现图片懒加载
import VueLazyLoad from "vue-lazyload"
Vue.use(VueLazyLoad,{
  loading:require("./assets/img/common/placeholder.png")  //未加载完成之前显示的图片
})