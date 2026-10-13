<template>
	<view class="login-page">
		<tabModel :title="$t('Register.title')"></tabModel>
		<image class="banner" src="@/static/images/banner.png"></image>
		<view class="form-view">
			<view class="input-with-icon">
				<image src="./images/reg-tel.png"></image>
				<u-input class="v-input" v-model="username" type="text" :placeholder="$t('Bank.enter.username')"
					:border="false" maxlength="20" />
			</view>
			<view class="input-with-icon">
				<image src="./images/reg-pwd.png"></image>
				<u-input class="v-input" v-model="password" type="password" :placeholder="$t('Register.enter.password')"
					:border="false" />
			</view>
			<view class="input-with-icon">
				<image src="./images/reg-pwd.png"></image>
				<u-input class="v-input" v-model="pay_password" type="password"
					:placeholder="$t('Register.enter.pay.password')" :border="false" maxlength="6" />
			</view>
			<view class="input-with-icon">
				<image src="./images/reg-yqcode.png"></image>
				<u-input class="v-input" v-model="invite_code" :placeholder="$t('Register.enter.invite_code')"
					:border="false" maxlength="10" />
			</view>
			<u-checkbox-group style="margin-top: 20px;">
				<u-checkbox v-model="agree" :size="30" :label-size="28">{{ $t('Register.read') }}
					<text class="checkbox-txt">{{ $t('Register.privacy') }}</text>
				</u-checkbox>
			</u-checkbox-group>

			<button size="default" type="default" class="but" @click="register">{{ $t('Register.title') }}</button>
			<navigator url="/pages/login/index">
				<view class="txt-tip">{{ $t('Register.tips') }}</view>
			</navigator>
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
				username: '',
				password: '',
				pay_password: '',
				invite_code: '',
				agree: true,
				isRequest: false,
				timer: ''
			}
		},
		components: {
			tabModel
		},
		computed: {},
		onLoad(e) {
			this.invite_code=e.invite_code
console.log(e)
		},
		onShow() {},
		methods: {
			...mapMutations(['setToken', 'setUid']),
			register() {
				var that = this

				if (!that.username) {
					uni.showToast({
						title: that.$t('Bank.enter.username'),
						icon: 'none'
					})

					return false
				}

				if (!that.password) {
					uni.showToast({
						title: that.$t('Register.enter.password'),
						icon: 'none'
					})

					return false
				}

				if (!that.pay_password) {
					uni.showToast({
						title: that.$t('Register.enter.pay.password'),
						icon: 'none'
					})

					return false
				}

				if (!that.invite_code) {
					uni.showToast({
						title: that.$t('Register.enter.invite_code'),
						icon: 'none'
					})

					return false
				}
				
				if (!that.agree) {
					uni.showToast({
						title: that.$t('Register.agree'),
						icon: 'none'
					})
					
					return false
				}
				
				if (that.isRequest) {
					return false
				}
				
				that.isRequest = true
				
				uni.showLoading();
				
				that.$http.post(apis.register, {
					username: that.username,
					tel: that.username,
					deposit_pwd: that.pay_password,
					pwd: that.password,
					invite_code: that.invite_code
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
						
						that.timer = setTimeout(function(){
							clearTimeout(that.timer)
							
							uni.reLaunch({
								url: '/pages/home/index'
							})
						}, 2000)
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
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

			.checkbox-txt {
				margin-left: 5px;
				font-weight: bold;
			}

			.but {
				background-color: rgb(0, 0, 0);
				color: rgb(255, 255, 255);
				border-radius: 24px;
				font-size: 15px;
				margin-top: 15px;
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