import Vue from 'vue'
import App from './App.vue'
// 引入全局方法插件
import globalMethods from './plugins/globalMethods.js'

Vue.config.productionTip = false

// 1. 通过 Vue.prototype 定义全局方法
Vue.prototype.$myGlobalMethod = function(){
	console.log("这是一个全局方法")
}

// 2. 通过 Vue.mixin() 定义全局混入方法
Vue.mixin({
  methods: {
    $anotherGlobalMethod() {
      console.log("这是通过混入定义的全局方法");
    }
  }
})

// 3. 使用插件定义全局方法
Vue.use(globalMethods)

new Vue({
  render: h => h(App),
}).$mount('#app')
