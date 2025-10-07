<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
	<div>
		<button @click="useGlobalMethod">这是vue3调用全局方法</button>
	</div>
</template>
<script>
	export default{
		methods:{
			useGlobalMethod(){
				this.$myGlobalMethod();
			}
		}
	}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
