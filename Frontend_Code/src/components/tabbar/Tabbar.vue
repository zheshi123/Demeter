<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'TabBar'
	}
</script>

<style scoped>
	#tab-bar {
		display: flex;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		/*padding-bottom: 14px;*/
		background: #FFFFFF;
		box-shadow: inset 0 1px 0 0 #EEEEEE;
    z-index: 1;
	}
</style>

