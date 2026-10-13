<template>
	<view class="account-page">
		<view class="info">
			<u-avatar src="./images/avatar.png" mode="circle" style="border: 1px solid #000;"></u-avatar>
			<view class="txt">
				<view class="phone">{{ $t('Bank.username') }}: {{ userInfo.username }}</view>
				<view class="phone">{{ $t('Common.credit_score') }}: {{ userInfo.credit_score }}</view>
				<view class="code">
					{{ $t('Account.index.invite_code') }}: {{ userInfo.invite_code }} 
					<span class="copy" @click="copy">{{ $t('Common.copy') }}</span>
					</view>
				
			</view>
		</view>

		<view class="but-viw">
			<view class="txt">
				<view class="balance">{{ $t('Account.index.balance') }}</view>
				<view>{{ userInfo.balance }}</view>
			</view>
			<view class="but">
				<navigator url="/pages/account/recharge">
					<button size="default" type="default" class="but">{{ $t('Account.index.recharge') }}</button>
				</navigator>
				<navigator url="/pages/account/withdraw">
					<button size="default" type="default"
						class="but Withdrawal">{{ $t('Account.index.withdrawal') }}</button>
				</navigator>
			</view>
		</view>

		<view class="services">
			<view class="txt">{{ $t('Account.index.services') }}</view>
			<view class="icon-view">
				<view class="icon" @click="go()">
					<image src="./images/icon1.png"></image>
					<text>{{ $t('Account.index.detailed') }}</text>
				</view>
				<view class="icon" @click="go('/pages/account/wallet')">
					<image src="./images/icon2.png"></image>
					<text>{{ $t('Account.index.wallet') }}</text>
				</view>
				<view class="icon" @click="go('/pages/account/password', 1)">
					<image src="./images/icon3.png"></image>
					<text>{{ $t('Account.index.password') }}</text>
				</view>
				<view class="icon" @click="go('/pages/account/payment', 2)">
					<image src="./images/icon4.png"></image>
					<text>{{ $t('Account.index.payment') }}</text>
				</view>
				<view class="icon" @click="go('/pages/account/rule')">
					<image src="./images/icon5.png"></image>
					<text>{{ $t('Account.index.rule') }}</text>
				</view>
				<view class="icon" @click="go('/pages/account/about')">
					<image src="./images/icon6.png"></image>
					<text>{{ $t('Account.index.about') }}</text>
				</view>
				<view class="icon" @click="go('/pages/account/message')">
					<image src="./images/icon8.png"></image>
					<text>{{ $t('Account.index.message') }}</text>
				</view>
				<view class="icon" @click="logout">
					<image src="./images/icon7.png"></image>
					<text>{{ $t('Account.index.logout') }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import apis from '@/apis.js'
	export default {
		data() {
			return {
				userInfo: '',
				kefu:'',
			}
		},
		computed: {
			...mapState(['TOKEN', 'UID']),
		},
		onLoad() {
			var userInfo = uni.getStorageSync('userInfo')
			if (userInfo) {
				this.userInfo = userInfo
			}
			this.getConfig()
		},
		onShow() {
			this.getUserInfo()
			this.setTabbar()
		},
		methods: {
			...mapMutations(['setToken', 'setUid']),
			getConfig() {
				var that = this
				that.$http.post(apis.getConfig, {
					keyword: 'kefu'
				}).then(res => {
					if (res.data.code == 1) {
						that.kefu = res.data.data.kefu
					}
				})
			},
			copy() {
				uni.setClipboardData({
					data: this.userInfo.invite_code,
					success: function() {
						uni.showToast({
							icon: 'success'
						})
					}
				});
			},
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
			logout() {
				this.$store.commit('setToken', '')
				this.$store.commit('setUid', '')
				uni.setStorageSync('user_id', '')
				uni.reLaunch({
					url: '/pages/login/index'
				}) 
				
				window.location.href='/h5/login.html'
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
			go(url = '/pages/account/bills', type = 1) {
				if (type == 2) {
					window.location.href = this.kefu
					return false
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.copy {
		margin-left: 20px;
		color: #fff;
		background-color: #000;
		padding: 8px;
		border-radius: 7px;
	}

	.account-page {
		padding: 10px 3%;
		background: #fff;

		.services {
			margin-top: 30px;
			padding: 10px 26px;

			.txt {
				color: rgb(51, 51, 51);
				font-size: 19px;
				font-weight: 700;
			}

			.icon-view {
				display: flex;
				flex-wrap: wrap;

				.icon {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 33.3%;
					padding: 15px 0px 30px;

					image {
						width: 45px;
						height: 45px;
					}

					text {
						line-height: 1.8;
						color: rgb(51, 51, 51);
						font-size: 16px;
						font-weight: 500;
					}
				}
			}
		}

		.but-viw {
			padding: 10px 5px 10px 10px;
			border: 1px solid #000;
			border-radius: 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 30px;

			.txt {
				font-size: 20px;
				font-weight: 700;
				color: rgb(0, 0, 0);

				.balance {
					font-size: 17px;
				}
			}

			.but {
				display: flex;

				.but {
					width: 100px;
					background-color: rgb(0, 0, 0);
					font-size: 13px;
					font-weight: 800;
					margin-right: 7px;
					text-align: center;
					border-radius: 7px;
					color: rgb(255, 255, 255);
					text-align: center;
				}

				.Withdrawal {
					background-color: rgb(255, 255, 255);
					color: rgb(0, 0, 0);
					border: 1px solid rgb(0, 0, 0);
				}
			}
		}

		.info {
			padding: 10px 5px 10px 10px;
			border: 1px solid #000;
			border-radius: 12px;
			display: flex;
			align-items: center;

			.txt {
				font-size: 14px;
				font-weight: 600;
				color: #000000e6;
				margin-left: 20px;
			}
		}
	}
</style>