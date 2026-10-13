<template>
	<view class="password-page">
		<tabModel />
		<view class="form-view">
			<view class="item">
				<view class="label">{{ $t('Payment.old') }}</view>
				<view class="value">
					<u-input class="v-input" v-model="old_password" type="password" :placeholder="$t('Payment.old.enter')" :border="false"/>
				</view>
			</view>
			<view class="item">
				<view class="label">{{ $t('Payment.new') }}</view>
				<view class="value">
					<u-input class="v-input" v-model="new_password" type="password" :placeholder="$t('Payment.new.enter')" :border="false" />
				</view>
			</view>

			<button size="default" type="default" class="submit" @click="submit">{{ $t('Payment.submit') }}</button>
		</view>
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
				new_password: '',
				old_password: '',
				isRequest: false,
				timer:''
			}
		},
		computed: {},
		onLoad() {},
		onShow() {},
		methods: {
			submit(){
				var that = this
				
				if (!that.old_password) {
					uni.showToast({
						title: that.$t('Payment.old.enter'),
						icon: 'none'
					})
					return false
				}
				
				if (!that.new_password) {
					uni.showToast({
						title: that.$t('Payment.new.enter'),
						icon: 'none'
					})
					return false
				}
				
				if (that.isRequest) {
					return  false
				}
				
				that.isRequest = true
				
				uni.showLoading()
				
				that.$http.post(apis.editPassword, {
					old_pwd: that.old_password,
					new_pwd: that.new_password,
					type: 1
				}).then(res => {
					that.isRequest = false
					
					that.old_password = ''
					
					that.new_password = ''
					
					uni.hideLoading()
					
					var icon = 'error'
					
					if (res.data.code == 1) {
						icon = 'success'
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
			}
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