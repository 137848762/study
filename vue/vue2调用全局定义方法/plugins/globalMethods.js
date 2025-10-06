// src/plugins/globalMethods.js
export default {
  install(Vue) {
    // 添加实例方法
    Vue.prototype.$pluginMethod = function() {
      console.log("这是通过插件定义的全局方法");
    }
    
    // 添加静态方法
    Vue.globalMethod = function() {
      console.log("这是Vue的静态全局方法");
    }
  }
}
