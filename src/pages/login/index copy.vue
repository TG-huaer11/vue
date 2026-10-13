<!-- 登录注册页面 -->
<template>
	<view class="login-page">
		<tabModel></tabModel>
		<image class="banner" src="@/static/images/banner.png"></image>
		<view class="form-view">
			<view class="txt login">{{ $t('Login.title') }}</view>
			<view class="txt">{{ $t('Login.tips') }}</view>

			<u-input class="v-input" v-model="phone" :placeholder="$t('Bank.enter.username')" :border="true"
				maxlength="140" input-align="center" />
			<u-input class="v-input" v-model="password" type="password" :placeholder="$t('Login.enter.password')"
				:border="true" input-align="center" maxlength="140" />

			<button size="default" type="default" class="but but-login" @click="login">{{ $t('Login.title') }}</button>
			<navigator url="/pages/login/register">
				<button size="default" type="default" class="but">{{ $t('Login.register') }}</button>
			</navigator>

			<view class="txt-tip" @click="go">{{ $t('Login.forget') }}</view>
		</view>

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
				phone: '',
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
					username: that.phone,
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
		}
	}
</style>