<template>
	<view class="starting-page">
		<image class="banner" src="@/static/images/banner.png"></image>
		<view class="cont">
			<view class="view1">
				<view class="txt1">{{ $t('Starting.balance') }}</view>
				<view class="txt2">{{ userInfo.balance }} USD</view>
				<view class="txt-cont">
					<view>
						<view>{{ $t('Starting.income') }}</view>
						<view class="num">{{commission}} USD</view>
					</view>
					<view>
						<view>{{ $t('Starting.submit.button') }}</view>
						<view class="num">{{ userInfo.today_order_number }}/{{ userInfo.index_orders }}</view>
					</view>
				</view>
				<button size="default" type="default" class="but" @click="getOrder">{{ $t('Starting.submit.button') }}</button>
			</view>
			<view class="txt-view">
				<view class="txt1">{{ $t('Starting.steps') }}</view>
				<view class="txt2">{{ $t('Starting.steps1') }}</view>
				<view class="txt2">{{ $t('Starting.steps2') }}</view>
			</view>
		</view>
		<uPopup :show="showOrderInfo" :orderInfo="orderInfo"/>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import apis from '@/apis.js'
	import uPopup from '@/common/uPopup.vue'
	export default {
		components: {
			uPopup
		},
		data() {
			return {
				userInfo: {},
				day_order_num: 0,
				showOrderInfo: false,
				orderInfo:{},
				isRequest: false,
				commission: '0.00',
			}
		},
		computed: {
			...mapState(['TOKEN', 'UID']),
		},
		onLoad() {
			var that = this
			
			var day_order_num = uni.getStorageSync('day_order_num')
			if (day_order_num) {
				this.day_order_num = day_order_num
			}
			var commission = uni.getStorageSync('commission')
			if (commission) {
				this.commission = commission
			}
			
			this.getConfig()
			
			that.bus.$on('completedOrder', (oid) => {
				that.showOrderInfo = false
				that.orderInfo = {}
				that.getUserInfo()
				that.getCommission()
			});
			this.setTabbar()
			this.getCommission()
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			...mapMutations(['setToken', 'setUid']),
			setTabbar() {
				var that = this
				const nav = that.$t("nav")
				for (let i = 0; i < nav.length; i++) {
					uni.setTabBarItem({
						index: i,
						text: nav[i],
						fail(res) {
							console.log(res);
						}
					})
				}
			},
			getCommission() {
				var that = this
			
				that.$http.post(apis.getCommission).then(res => {
					that.isRequest = false
			
					uni.hideLoading()
			
					if (res.data.code == 1) {
						that.commission = res.data.data
						uni.setStorageSync('commission', that.commission)
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
			getOrderInfo(id) {
				var that = this
			
				if (that.isRequest) {
					return false
				}
			
				that.isRequest = true
			
				uni.showLoading()
			
				that.$http.post(apis.getOrderInfo, {
					id: id
				}).then(res => {
					that.isRequest = false
			
					uni.hideLoading()
			
					if (res.data.code == 1) {
						that.orderInfo = res.data.data
						that.showOrderInfo = true
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
			getOrder(){
				var that = this
				if (that.isRequest) {
					return false
				}
				that.isRequest = true
				uni.showLoading()
				that.$http.post(apis.getOrder).then(res => {
					uni.hideLoading()
					that.isRequest = false
					if (res.data.code == 1) {
						that.getOrderInfo(res.data.data.id)
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
			getUserInfo() {
				var that = this
				that.$http.post(apis.getUserInfo).then(res => {
					if (res.data.code == 1) {
						that.userInfo = res.data.data
						
					}
				})
			},
			getConfig() {
				var that = this
				that.$http.post(apis.getConfig, {
					keyword: 'day_order_num'
				}).then(res => {
					if (res.data.code == 1) {
						that.day_order_num = res.data.data.day_order_num
						uni.setStorageSync('day_order_num', that.day_order_num)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.starting-page {
		background-color: #f6f6f6;
		min-height: calc(100vh - 50px);

		.banner {
			width: 100%;
			height: 240px;
			border-bottom-left-radius: 60% 20px;
			border-bottom-right-radius: 60% 20px;
		}

		.cont {
			position: absolute;
			top: 175px;
			z-index: 11;
			width: 100%;

			.view1 {
				box-shadow: aqua 0.5px 0.5px 5px 0px;
				background-color: rgb(255, 255, 255);
				width: 90%;
				// height: 250px;
				margin: auto;
				border-radius: 10px;
				padding: 15px;

				.txt1 {
					font-size: 14px;
					color: rgb(142, 142, 152);
				}

				.txt2 {
					color: rgb(0, 208, 234);
					font-size: 29px;
					font-weight: 700;
					margin-top: 5px;
				}

				.txt-cont {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 15px;
					background-color: rgba(0, 208, 234, 0.1);
					border-radius: 10px;
					margin-top: 10px;

					>view {
						flex-grow: 1;

						view {
							color: rgb(142, 142, 152);
							font-size: 14px;
						}

						.num {
							color: #000000e6;
							font-weight: 600;
						}
					}
				}

				.but {
					font-size: 20px;
					margin-top: 15px;
					border-radius: 10px;
					font-weight: 700;
					color: rgb(255, 255, 255);
					background-color: rgb(0, 208, 234);
				}
			}

			.txt-view {
				width: 90%;
				margin: auto;
				margin-top: 30px;

				.txt1 {
					font-size: 20px;
					font-weight: 700;
					color: #000000e6;
				}

				.txt2 {
					font-size: 16px;
					color: rgb(142, 142, 152);
					padding: 4px 5px;
				}
			}
		}
	}
</style>