<template>
	<view class="tab-page">
		<image class="icon-image" src="@/static/images/auto.png" alt="" @click="go"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		computed: {},
		onLoad() {},
		onShow() {},
		methods: {
			go() {
				window.history.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-page {
		padding: 10px;
		display: flex;
		align-content: center;
		justify-content: space-between;

		.icon-image {
			width: 26px;
			height: 26px;
		}
	}
</style>