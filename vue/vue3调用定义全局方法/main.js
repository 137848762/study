import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.config.globalProperties.$myGlobalMethod = function(){
	console.log("这是vue3调用全局方法")
}
app.mount('#app')
