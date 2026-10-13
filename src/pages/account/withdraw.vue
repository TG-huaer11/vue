<template>
	<view class="recharge-page">
		<tabModel />
		<view class="mymoney">
			<view class="f1">{{ $t('Withdraw.balance') }}</view>
			<view class="f2">
				USD
				<text class="nub">{{ userInfo.balance }}</text>
			</view>
		</view>
		<view class="form-view">
			<view class="label">{{ $t('Withdraw.amount') }}</view>
			<view class="value border-bot">
				<view class="item">
					<!-- <view class="item-label">USD</view> -->
					<u-input class="v-input" v-model="amount" type="number" :border="false" :placeholder="$t('Withdraw.enter.amount')"/>
				</view>
			</view>
			<view class="label">{{ $t('Withdraw.min.amount') }} {{ userLevel.tixian_min }}</view>
			<view class="label" style="color: red;" v-if='notice'>{{ $t('Recharge.tips') }}:{{ notice }}</view>
			
		</view>
		<view class="form-view">
			<view class="label">{{ $t('Withdraw.pay.password') }}</view>
			<view class="value">
				<u-input class="v-input" v-model="payPassword" type="password" :border="false" :placeholder="$t('Withdraw.enter.pay.password')" maxlength="6" />
			</view>
		</view>
		<button size="default" type="default" class="submit" @click="submit">{{ $t('Withdraw.submit') }}</button>
	</view>
</template>

<script>
	import tabModel from '@/common/tabRet.vue'
	import apis from '@/apis.js'
	export default {
		components: {
			tabModel
		},
		data() {
			return {
				addressInfo: '',
				amount: '',
				payPassword: '',
				isRequest: false,
				userInfo: {},
				timer: '',
				userLevel: {},
				notice:''
			}
		},
		computed: {},
		onLoad() {
			var userInfo = uni.getStorageSync('userInfo')
			if (userInfo) {
				this.userInfo = userInfo
			}
		},
		onShow() {
			this.getAddress()
			this.getUserInfo()
			this.getUserLevel()
		},
		methods: {
			getUserLevel(){
				var that = this
				
				that.$http.post(apis.getUserLevel).then(res => {
					
					if (res.data.code == 1) {
						that.userLevel = res.data.data
					}
					
				})
			},
			submit() {
				var that = this

				if (!that.amount) {
					uni.showToast({
						title: that.$t('Withdraw.enter.amount'),
						icon: 'none'
					})

					return false
				}

				if (!that.payPassword) {
					uni.showToast({
						title: that.$t('Withdraw.enter.pay.password'),
						icon: 'none'
					})

					return false
				}

				if (that.isRequest) {
					return false
				}

				that.isRequest = true

				uni.showLoading()

				that.$http.post(apis.withdraw, {
					paypassword: that.payPassword,
					num: that.amount,
					bk_id: that.addressInfo.id
				}).then(res => {
					that.isRequest = false
					
					that.payPassword = ''

					that.amount = ''

					uni.hideLoading()

					var icon = 'error'

					if (res.data.code == 1) {
						var icon = 'success'
						
						that.timer = setTimeout(function() {
							clearTimeout(that.timer)
							uni.reLaunch({
								url: '/pages/account/index'
							})
						}, 2000)
					}

					uni.showToast({
						title: res.data.msg,
						icon: icon
					})
				}).catch(err => {
					that.isRequest = false
				})
			},
			getAddress() {
				var that = this

				uni.showLoading()

				that.$http.post(apis.getUserAddress).then(res => {
					uni.hideLoading()
					if (res.data.code == 1) {
						that.addressInfo = res.data.data
						that.notice = res.data.data.notice
						console.log(res.data.data)
						if (!res.data.data) {
							uni.showToast({
								title: that.$t('Withdraw.bind.address'),
								icon: 'none'
							})

							that.timer = setTimeout(function() {
								clearTimeout(that.timer)

								uni.navigateTo({
									url: '/pages/account/wallet'
								})
							}, 2000)
						}
					}
				})
			},
			getUserInfo() {
				var that = this
				that.$http.post(apis.getUserInfo).then(res => {
					if (res.data.code == 1) {
						that.userInfo = res.data.data
						uni.setStorageSync('userInfo', that.userInfo)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.recharge-page {
		min-height: 100vh;
		background: #f6f6f6;
		padding: 10px 3%;

		.border-bot {
			border-bottom: 1px solid #f0f0f0;
		}

		.but {
			background: rgb(0, 0, 0);
			color: #fff;
			margin-top: 9px;
			height: 32px;
			padding: 10px 20px 10px 20px;
			line-height: 14px;
			border-radius: 25px;
			font-size: 14px;
			border: 0;
		}

		.submit {
			background: rgb(0, 0, 0);
			border-radius: 30px;
			margin-top: 30px;
			color: #fff;
			font-size: 15px;
			font-weight: 700;
			// padding: 5px;
			line-height: 50px;
			height: 50px;
		}

		.form-view {
			padding: 10px;
			margin: 10px 0;
			border-radius: 5px;
			background: #fff;

			.label {
				height: 40px;
				line-height: 40px;
				color: #999;
				font-size: 14px;
			}

			.value {

				.item {
					display: flex;
					align-items: center;
					padding-bottom: 10px;

					.item-label,
					.v-input {
						font-size: 30px;
						color: #333;
						font-weight: 700;
						margin-right: 10px;
						// height: 50px;
						// line-height: 50px;

						::v-deep input {
							font-size: 20px;
						}
					}
				}
			}

		}

		.mymoney {
			border-radius: 5px 28px 5px 5px;
			padding: 35px 30px;
			background: rgb(0, 0, 0);

			.f1 {
				color: hsla(0, 0%, 100%, .8);
				font-size: 12px;
			}

			.f2 {
				color: #fff;
				font-size: 13px;
				font-weight: 700;
				margin-top: 10px;

				.nub {
					font-size: 32px;
					margin-left: 5px;
				}
			}
		}
	}
</style>