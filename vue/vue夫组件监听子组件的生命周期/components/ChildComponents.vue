<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
	<div>子组件1</div>
</template>
<script>
	export default {
		name:"ChildComponent",
		mounted() {
			this.$emit('childmounted');
		}
	}
</script>
<style scoped>
a {
  color: #42b983;
}
</style>
