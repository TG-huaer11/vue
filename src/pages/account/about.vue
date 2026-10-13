<template>
	<view class="password-page">
		<tabModel />
		<view
			style="text-align: center; color: rgb(0, 0, 0); background-size: 100%; margin: 22px 0px 0px; padding: 5px; font-weight: normal;font-size: 25px;">
			{{ $t('About.title') }}</view>
		<view style="white-space: pre-wrap; letter-spacing: 0px; font-size: 18px; line-height: 20px;margin: 4px;">
			{{ $t('About.text1') }}<br><br>
			{{ $t('About.text2') }}<br><br>
			{{ $t('About.text3') }}<br><br>
			{{ $t('About.text4') }}<br><br>
			{{ $t('About.text5') }}<br><br>
			{{ $t('About.text6') }}<br><br>
		</view>
	</view>
</template>

<script>
	import tabModel from '@/common/tabRet.vue'
	export default {
		components: {
			tabModel
		},
		data() {
			return {
			}
		},
		computed: {},
		onLoad() {
		},
		onShow() {},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.password-page {
		.form-view {
			padding: 10px 6%;

			.item {
				display: flex;
				align-items: center;
				padding: 6px 0px;
				border-bottom: 1px #ededed solid;

				.label {
					font-size: 14px;
					color: #000;
					width: 100px;
				}

				.value {
					flex-grow: 1;
					margin-left: 15px;
				}
			}
		}

		.submit {
			background: rgb(0, 0, 0);
			border-radius: 5px;
			margin-top: 30px;
			color: #fff;
			font-size: 15px;
			font-weight: 700;
			// padding: 5px;
			line-height: 50px;
			height: 50px;
		}
	}
</style>