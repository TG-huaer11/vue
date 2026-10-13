<!-- 登录注册页面 -->
<template>
	<view class="login-page">
		<tabModel></tabModel>
		<image class="banner" src="@/static/images/banner.png"></image>
		<view class="form-view">
			<view class="txt login">{{ $t('Login.title') }}</view>
			<view class="txt">{{ $t('Login.tips') }}</view>

			<!-- <u-input class="v-input" v-model="phone" :placeholder="$t('Bank.enter.username')" :border="true"
				maxlength="140" input-align="center" /> -->
			<!-- 新增：区号 + 手机号码 -->
			<view class="input-with-icon phone-row">
				<!-- <image src="./images/reg-tel.png"></image> -->
				<!-- 区号选择 -->
				<view class="area-code" @click="showAreaPicker = true">
					<text class="area-code-text">+{{ areaCode }}</text>
					<text class="area-code-arrow">▼</text>
				</view>
				<view class="area-divider"></view>
				<u-input class="v-input" v-model="phone" type="number" :placeholder="$t('Register.enter.phone')"
					:border="false" maxlength="20" />
					
				<!-- <u-input class="v-input" v-model="username" type="text" :placeholder="$t('Bank.enter.username')" :border="false" maxlength="20" /> -->
			</view>

			<u-input class="v-input" v-model="password" type="password" :placeholder="$t('Login.enter.password')"
				:border="true" input-align="center" maxlength="140" />

			<button size="default" type="default" class="but but-login" @click="login">{{ $t('Login.title') }}</button>
			<navigator url="/pages/login/register">
				<button size="default" type="default" class="but">{{ $t('Login.register') }}</button>
			</navigator>

			<view class="txt-tip" @click="go">{{ $t('Login.forget') }}</view>
		</view>
		<!-- 区号选择弹窗 -->
		<u-popup v-model="showAreaPicker" mode="bottom" border-radius="20">
			<view class="area-picker">
				<view class="area-picker-title">选择区号</view>
				<scroll-view scroll-y class="area-list">
					<view class="area-item" v-for="(item, index) in areaList" :key="index"
						@click="selectArea(item)">
						<!-- <text>{{ item.name }}</text> -->
						<text class="area-item-code">+{{ item.code }}</text>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import apis from '@/apis.js'
	import tabModel from '@/common/tab.vue'
	export default {
		data() {
			return {
								// 新增字段
				phone: '',
				areaCode: '86',
				showAreaPicker: false,
				areaList: [
					{ name: '中国', code: '86' },
					{ name: '美国', code: '1' },
					{ name: '英国', code: '44' },
					{ name: '日本', code: '81' },
					{ name: '韩国', code: '82' },
					{ name: '新加坡', code: '65' },
					{ name: '马来西亚', code: '60' },
					{ name: '泰国', code: '66' },
					{ name: '越南', code: '84' },
					{ name: '印度尼西亚', code: '62' },
					{ name: '菲律宾', code: '63' },
					{ name: '印度', code: '91' },
					{ name: '澳大利亚', code: '61' },
					{ name: '德国', code: '49' },
					{ name: '法国', code: '33' },
					{ name: '加拿大', code: '1' },
					{ name: '俄罗斯', code: '7' },
					{ name: '巴西', code: '55' },
					{ name: '中国香港', code: '852' },
					{ name: '中国台湾', code: '886' },
					{ name: '中国澳门', code: '853' },
					{ name: '中国澳门', code: '973' },
					{ name: '中国澳门', code: '965' },
					{ name: '中国澳门', code: '971' },
					{ name: '中国澳门', code: '962' },
					{ name: '中国澳门', code: '20' },
					{ name: '中国澳门', code: '90' },
					{ name: '中国澳门', code: '98' },
					{ name: '中国澳门', code: '966' },
					{ name: '中国澳门', code: '972' },
					{ name: '中国澳门', code: '968' },
					{ name: '中国澳门', code: '974' },
					{ name: '中国澳门', code: '34' },
					{ name: '中国澳门', code: '84' },
					{ name: '中国澳门', code: '51' },
					{ name: '中国澳门', code: '54' },
					{ name: '中国澳门', code: '93' },
					{ name: '中国澳门', code: '376' },
					{ name: '中国澳门', code: '43' },
					{ name: '中国澳门', code: '880' },
					{ name: '中国澳门', code: '375' },
					{ name: '中国澳门', code: '32' },
					{ name: '中国澳门', code: '975' },
					{ name: '中国澳门', code: '55' },
					{ name: '中国澳门', code: '673' },
					{ name: '中国澳门', code: '359' },
					{ name: '中国澳门', code: '855' },
					{ name: '中国澳门', code: '237' },
					{ name: '中国澳门', code: '001' },
					{ name: '中国澳门', code: '236' },
					{ name: '中国澳门', code: '56' },
					{ name: '中国澳门', code: '57' },
					{ name: '中国澳门', code: '242' },
					{ name: '中国澳门', code: '53' },
					{ name: '中国澳门', code: '420' },
					{ name: '中国澳门', code: '45' },
					{ name: '中国澳门', code: '251' },
					{ name: '中国澳门', code: '679' },
					{ name: '中国澳门', code: '358' },
					{ name: '中国澳门', code: '30' },
					{ name: '中国澳门', code: '299' },
					{ name: '中国澳门', code: '852' },
					{ name: '中国澳门', code: '36' },
					{ name: '中国澳门', code: '354' },
					{ name: '中国澳门', code: '91' },
					{ name: '中国澳门', code: '62' },
					{ name: '中国澳门', code: '39' },
					{ name: '中国澳门', code: '49' },
					{ name: '中国澳门', code: '1876' },
					{ name: '中国澳门', code: '353' },
					{ name: '中国澳门', code: '85' },
					{ name: '中国澳门', code: '856' },
					{ name: '中国澳门', code: '52' },
					{ name: '中国澳门', code: '60' },
					{ name: '中国澳门', code: '377' },
					{ name: '中国澳门', code: '47' },
					{ name: '中国澳门', code: '212' },
					{ name: '中国澳门', code: '95' },
					{ name: '中国澳门', code: '31' },
					{ name: '中国澳门', code: '64' },
					{ name: '中国澳门', code: '63' },
					{ name: '中国澳门', code: '48' },
					{ name: '中国澳门', code: '351' },
					{ name: '中国澳门', code: '92' },
					{ name: '中国澳门', code: '40' },
					{ name: '中国澳门', code: '250' },
					{ name: '中国澳门', code: '65' },
					{ name: '中国澳门', code: '421' },
					{ name: '中国澳门', code: '27' },
					{ name: '中国澳门', code: '94' },
					{ name: '中国澳门', code: '46' },
					{ name: '中国澳门', code: '41' },
					{ name: '中国澳门', code: '886' },
					{ name: '中国澳门', code: '66' },
					{ name: '中国澳门', code: '670' },
					{ name: '中国澳门', code: '380' },
					{ name: '中国澳门', code: '598' },
					{ name: '中国澳门', code: '356' },
				],
				password: '',
				isRequest: false,
				timer: '',
				kefu: '',
			}
		},
		components: {
			tabModel
		},
		computed: {},
		onLoad() {
			//this.getConfig()
		},
		onShow() {},
		methods: {
			...mapMutations(['setToken', 'setUid']),
			getConfig() {
			
			},
						// 新增：选择区号
			selectArea(item) {
				this.areaCode = item.code
				this.showAreaPicker = false
			},
			go(){
				window.location.href ='/kefu.html';
			},
			login() {
				var that = this;

				if (!that.phone) {
					uni.showToast({
						title: that.$t('Login.enter.phone'),
						icon: 'none'
					});
					return false
				}

				if (!that.password) {
					uni.showToast({
						title: that.$t('Login.enter.password'),
						icon: 'none'
					});
					return false
				}

				if (that.isRequest) {
					return false
				}

				that.isRequest = true

				uni.showLoading();

				that.$http.post(apis.login, {
					// username: that.phone,
					area_code: that.areaCode,        // 新增：区号
					tel: that.phone,
					pwd: that.password
				}).then(res => {
					that.isRequest = false
					uni.hideLoading()
					if (res.data.code == 1) {
						that.$store.commit('setUid', res.data.data.user_id)
						uni.setStorageSync('user_id', res.data.data.user_id)
						uni.showToast({
							title: res.data.msg,
							icon: 'success'
						})
						that.timer = setTimeout(function() {
							uni.reLaunch({
								url: '/pages/home/index'
							})
						}, 2000)
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
		},
	}
</script>

<style lang="scss" scoped>
	.login-page {

		.banner {
			width: 100%;
			height: 200px;
		}

		.form-view {
			padding: 33px 25px 0;

			.input-with-icon {
				display: flex;
				align-items: center;
				border-bottom: thin solid #f0f3f6;
				padding: 5px 0px;
				margin-bottom: 10px;

				image {
					width: 22px;
					height: 22px;
					margin-right: 10px;
				}
			}
			.txt {
				text-align: center;
				font-size: 15px;
				font-weight: bold;
				padding: 8px;
				color: #000000e6;
			}

			.login {
				font-size: 30px;
				padding: 0px;
			}

			.v-input {
				margin-top: 15px;
				// border: 1px solid rgb(245, 246, 248);
				// border-radius: 20px;
				// background: rgb(255, 255, 255);
			}

			.but {
				background-color: rgb(0, 0, 0);
				color: rgb(255, 255, 255);
				border-radius: 24px;
				font-size: 15px;
				margin-top: 15px;
			}

			.but-login {
				margin-top: 30px;
			}

			.txt-tip {
				font-size: 15px;
				font-weight: bold;
				color: #fe2b54;
				padding: 10px 0;
			}

						/* 新增：手机号行样式 */
			.phone-row {
				.area-code {
					display: flex;
					align-items: center;
					flex-shrink: 0;

					.area-code-text {
						font-size: 15px;
						color: #333;
						font-weight: bold;
					}

					.area-code-arrow {
						font-size: 10px;
						color: #999;
						margin-left: 4px;
					}
				}

				.area-divider {
					width: 1px;
					height: 20px;
					background-color: #ddd;
					margin: 0 10px;
					flex-shrink: 0;
				}
			}
		}
	}
	/* 新增：区号选择弹窗样式 */
	.area-picker {
		padding: 20px;
		max-height: 60vh;

		.area-picker-title {
			font-size: 16px;
			font-weight: bold;
			text-align: center;
			padding-bottom: 15px;
			border-bottom: 1px solid #f0f3f6;
		}

		.area-list {
			max-height: 50vh;
		}

		.area-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 14px 10px;
			border-bottom: 1px solid #f5f5f5;
			font-size: 15px;

			.area-item-code {
				color: #fe2b54;
				font-weight: bold;
			}
		}
	}

</style>