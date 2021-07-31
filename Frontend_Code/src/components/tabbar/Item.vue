<template>
	<div class="tab-bar-item" @click="itemClick()">
		<div v-if="!isActive">
			<slot name="item-icon"></slot>
		</div>
		<div v-else>
			<slot name="item-icon-active"></slot>
		</div>
		<div :style="activeStyle">
			<slot name="item-text"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
		props: {
			path: String,
			activeColor: {
				type: String,
				default: '#000000'
			}
		},
		computed: {
			isActive() {
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle() {
				return this.isActive ? {color: this.activeColor} : {}
			}
		},
		methods: {
			itemClick() {
				console.log(this.path)
				this.$router.replace(this.path).catch(() => {})
			}
		}
	}
</script>

<style>
	.tab-bar-item {
		flex: 1;
		text-align: center;
		height: 56px;
		font-size: 10px;
		font-family: PingFangSC-Regular;
		font-size: 10px;
		color: rgba(0,0,0,0.40);
		text-align: center;
	}

	.tab-bar-item img {
		display: inline-block;
		width: 24px;
		height: 24px;
		margin-top: 9px;
		vertical-align: middle;
	}
</style>

