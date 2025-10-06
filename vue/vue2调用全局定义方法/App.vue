<template>
	<!-- vue2调用全局方法案例 -->
	<div class="app-container">
		<h1>Vue 2 全局方法示例</h1>
		<div class="button-group">
			<button @click="usePrototypeMethod">调用通过 Vue.prototype 定义的方法</button>
			<button @click="useMixinMethod">调用通过 Vue.mixin 定义的方法</button>
			<button @click="usePluginMethod">调用通过插件定义的方法</button>
		</div>
		<div class="instruction">
			<p>请打开浏览器控制台查看输出结果</p>
		</div>
	</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue'

export default {
  name: 'app',
  methods:{
	  // 1. 调用通过 Vue.prototype 定义的方法
	  usePrototypeMethod(){
		  this.$myGlobalMethod();
	  },
	  
	  // 2. 调用通过 Vue.mixin 定义的方法
	  useMixinMethod() {
		  this.$anotherGlobalMethod();
	  },
	  
	  // 3. 调用通过插件定义的方法
	  usePluginMethod() {
		  // 实例方法
		  this.$pluginMethod();
		  // 静态方法
		  Vue.globalMethod();
	  }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
