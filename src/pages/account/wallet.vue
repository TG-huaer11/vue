<template>
	<view class="password-page">
		<tabModel />
		<view class="form-view">
			<view class="item">
				<view class="label">{{ $t('Wallet.network') }}</view>
				<view class="value">
					<!-- <u-input class="v-input" value="USDT-TRC20" type="text" placeholder="" :border="false" />
				 -->
				 <select style="width:100%;border:0;outline: none;font-size: 16px;" v-model="usdt_type">
					 <option v-for="item in dizhi_list" :value='item' >{{item}}</option>
				 </select>
				</view>
			</view>
			<view class="item">
				<view class="label">{{ $t('Wallet.wallet') }}</view>
				<view class="value">
					<u-input class="v-input" v-model="address" type="text" :placeholder="$t('Wallet.enter.wallet')" :border="false"/>
				</view>
			</view>
			<view class="item">
				<view class="label">{{ $t('Wallet.payment') }}</view>
				<view class="value">
					<u-input class="v-input" v-model="pay_password" type="password" :placeholder="$t('Wallet.enter.payment')" :border="false"
						maxlength="6" />
				</view>
			</view>

			<button size="default" type="default" class="submit" @click="submit">{{ $t('Wallet.submit') }}</button>
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
				address: '',
				usdt_type:'',
				addressInfo: {},
				pay_password: '',
				isRequest: false,
				timer:'',
				dizhi_list:{}
			}
		},
		computed: {},
		onLoad() {
			this.getUserAddress();
			this.getAddress() ;
		},
		onShow() {},
		methods: {
			getAddress() {
			    var that = this
			    uni.showLoading()
			    that.$http.post(apis.getAddress).then(res => {
			        uni.hideLoading()
			        if (res.data.code == 1) {
						let arr = [];
						var datas=res.data.data;
						for(var i=0;i<datas.length;i++){
							if (!arr.includes(datas[i]['name'])) {
							        arr.push(datas[i]['name']);
							    }
						}
						
						
						
			            that.dizhi_list =arr // 假设返回的数据是一个地址数组;
						console.log(that.dizhi_list)
						if(this.usdt_type==''){
							this.usdt_type=res.data.data[0]['name']
						}
			        }
			    })
			},
			submit(){
				var that = this
				if (!that.address) {
					uni.showToast({
						title: that.$t('Wallet.enter.wallet'),
						icon: 'none'
					})
					return false
				}
				
				if (!that.pay_password) {
					uni.showToast({
						title: that.$t('Wallet.enter.payment'),
						icon: 'none'
					})
					return false
				}
				
				if (that.isRequest) {
					return false
				}
				
				that.isRequest = true
				
				uni.showLoading()
				
				that.$http.post(apis.editWallet, {
					address: that.address,
					name:that.usdt_type,
					pay_password: that.pay_password
				}).then(res => {
					that.isRequest = false
					
					that.pay_password = ''
					
					uni.hideLoading()
					
					var icon = 'error'
					
					if(res.data.code == 1) {
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
			},
			getUserAddress(){
				var that = this
				
				uni.showLoading()
				that.$http.post(apis.getUserAddress).then(res => {
					uni.hideLoading()
					
					if (res.data.code == 1) {
						that.address = res.data.data.address;
						that.usdt_type= res.data.data.name;
						that.addressInfo = res.data.data
					}
				})
			},
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