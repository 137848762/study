<template>
	<div>
		子组件3
	</div>
</template>

<script>
	export default{
		name:"ChildComponent3",
		inject:['notifyParent'],
		mounted() {
			this.notifyParent('mounted');
		}
		
	}
</script>

<style>
</style>