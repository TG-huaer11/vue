<template>
	<u-popup v-model="show" mode="center" width="96%" border-radius="20" :mask-close-able="true">
		<view class="popup-view" style="position: relative;">
			<svg @click="show=false" style="position: absolute;right:4px;top:2px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			        <line x1="4" y1="4" x2="20" y2="20" stroke="black" stroke-width="2" />
			        <line x1="4" y1="20" x2="20" y2="4" stroke="black" stroke-width="2" />
			    </svg>
			<view class="txt1">{{ $t('Order.time') }}: {{ orderInfo.receive_at }}</view>
			<view class="txt1">{{ $t('Order.number') }}: {{ orderInfo.oid }}</view>
			<view class="cont" v-for="item in orderInfo.goods">
				<image :src="item.goods_pic"></image>
				<view class="cont-text">
					<view class="txt2">{{ item.goods_name }}
					</view>
					<view class="txt-view">
						<text>{{ item.goods_price }}</text>
						<text class="nub">x{{ orderInfo.num }}</text>
					</view>
				</view>
			</view>
			<view class="txt-view">
				<text>{{ $t('Order.total') }}</text>
				<text class="nub">{{ orderInfo.total }}</text>
			</view>
			<view class="txt-view">
				<text>{{ $t('Order.commission') }}</text>
				<text class="nub">{{ orderInfo.commission }}</text>
			</view>
			<!-- <view class="txt-view">
				<text>{{ $t('Order.expected') }}</text>
				<text class="nub">{{ orderInfo.expected }}</text>
			</view> -->
			<button size="default" type="default" class="submit" @click="submit">{{ $t('Order.submit') }}</button>
		</view>
	</u-popup>
</template>

<script>
	import apis from '@/apis.js'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			orderInfo: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				isRequest: false
			}
		},
		computed: {},
		onLoad() {},
		onShow() {},
		methods: {
			submit(){
				var that = this
				
				if (that.isRequest) {
					return false
				}
				
				that.isRequest = true
				
				uni.showLoading()
				
				that.$http.post(apis.submitOrder,{
					oid: that.orderInfo.oid
				}).then(res => {
					that.isRequest = false
					
					uni.hideLoading()
					
					if (res.data.code == 1) {
						
						uni.showToast({
							title: res.data.msg,
							duration: 2000
						})
						
						that.bus.$emit('completedOrder', that.orderInfo.oid);
						
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'error'
						})
					}
				}).catch(err => {
					that.isRequest = false
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.popup-view {
		padding: 18px 18px 24px;

		.txt1 {
			font-size: 13px;
			color: #666666;
			line-height: 2;
		}

		.cont {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 0;

			image {
				width: 60px;
				height: 60px;
				margin-right: 10px;
			}

			.cont-text {
				max-width: calc(100% - 70px);
				font-size: 13px;
				color: #333;
				line-height: 1.8;
			}
		}

		.txt-view {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 20px;
			font-weight: bold;
			color: #000;
			line-height: 2;

			.nub {
				color: #6666669e;
			}
		}

		.submit {
			background: rgb(0, 0, 0);
			border-radius: 10px;
			margin-top: 10px;
			color: #fff;
			font-size: 15px;
			font-weight: 700;
			// padding: 5px;
			line-height: 50px;
			height: 50px;
		}
	}
</style>