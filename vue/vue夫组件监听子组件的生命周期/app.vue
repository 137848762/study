

<template>
	<!-- 方法1：通过自定义事件通信 -->
	<div>
		<childComponent @childmounted="handleChildMounted" />
	</div>
	<!-- 方法2：通过使用ref监听子组件生命周期钩子 -->
	<div>
		<ChildComponent2 ref="child"/>
	</div>
	<!-- 方法3：使用provide和inject机制 -->
	<childComponent3 />
</template>
<script >
	import childComponent from "./components/ChildComponents.vue";
	import ChildComponent2 from "./components/childComponent2.vue";
	import childComponent3 from "./components/childComponent3.vue";
	export default{
		components:{
			childComponent,
			ChildComponent2,
			childComponent3
		},
		
		mounted() {
			// 注意：这里存在一个问题
			// 在父组件mounted钩子中注册子组件的生命周期监听太晚了
			// 因为子组件的mounted钩子已经在父组件mounted之前执行了
			// 所以这个监听器永远不会被触发
			this.$refs.child.$on('hook:mounted', this.handChildComponent2);
		},
		// 解决方案：将事件监听移到beforeMount钩子中
		// beforeMount() {
		//   // 在父组件挂载前注册子组件的生命周期监听
		//   // 这样才能在子组件mounted钩子执行时捕获到事件
		//   this.$refs.child.$on('hook:mounted', this.handChildComponent2);
		// },
		provide(){
			return{
				notifyParent: this.handleNotification
			}
		},
		methods:{
			// 方法1的回调：处理子组件通过自定义事件触发的通知
			handleChildMounted(){
				console.log("子组件1！！！已经挂载");
			},
			// 方法2的回调：处理通过ref监听到的子组件生命周期事件
			// 注意：由于注册时机问题，这个方法不会被调用
			handChildComponent2(){
				console.log("通过ref挂载")
			},
			// 方法3的回调：处理通过provide/inject机制传递的通知
			handleNotification(hook){
				if(hook === 'mounted'){
					console.log("子组件3已经挂载");
				}
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
