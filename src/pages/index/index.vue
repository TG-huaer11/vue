<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

<style lang="scss" scoped>
	.login-page {
		height: 100vh;

		.back-img {
			position: fixed;
			left: 0;
			top: 0;
			width: 100vw;
			height: 100vh;
			z-index: -1;
		}

		.agreement {
			position: fixed;
			width: 100%;
			text-align: center;
			bottom: 24rpx;

			text {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #323232;
				line-height: 33rpx;
			}
		}

		.content {
			box-sizing: border-box;
			height: 100vh;
			z-index: 1;
			padding: 24rpx 35rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			.image-view {
				margin-top: 290rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.logo-img {
					width: 150rpx;
					height: 150rpx;
				}

				.title-img {
					width: 179rpx;
					height: 54rpx;
					margin-top: 40rpx;
				}
			}

			.buttom-view {
				width: 100%;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 40rpx;
				letter-spacing: 2rpx;
				background: linear-gradient(135deg, #E42F36 0%, #F44B25 100%);
				border-radius: 44rpx;
				text-align: center;
				height: 88rpx;
				line-height: 88rpx;
				margin-bottom: 153rpx;
			}

			// .buttom-view:active {
			// 	opacity: 0.6;
			// }
		}
	}
