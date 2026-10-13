<template>
    <view class="recharge-page">
        <tabModel />
        <view class="mymoney">
            <view class="f1">{{ $t('Recharge.balance') }}</view>
            <view class="f2">
                USD
                <text class="nub">{{ userInfo.balance }}</text>
            </view>
        </view>
        <view class="form-view" style="position: relative;">
            <view class="label">{{ $t('Recharge.address') }}</view>
            <view class="value border-bot">
                <radio-group style="display: flex;flex-wrap: wrap;" @change="handleAddressChange">
                  
                    <!-- 显示其他地址 -->
                    <label v-for="(addr, index) in addresses" class="radio-label" style="margin-right: 8px;">
                        <radio :value="addr.address" :checked="selectedAddress == addr.address" />
                        {{ addr.name }}
                    </label>
                </radio-group>
            </view>
			<view style="padding:10px 0">
				{{selectedAddress}}
			</view>
        </view>
        <button size="default" type="default" class="but" @click="copy">{{ $t('Common.copy') }}</button>
        <view class="form-view">
            <view class="label">{{ $t('Recharge.amount') }}</view>
            <view class="value">
                <u-input class="v-input" v-model="amount" type="number" :placeholder="$t('Recharge.enter.amount')"
                    :border="false" />
            </view>
        </view>
        <view class="form-view">
            <view class="label">{{ $t('Recharge.upload') }}</view>
            <view class="value">
                <u-upload ref="uUpload" :upload-text="$t('Recharge.upload1')" :action="uploadUrl"
                    :max-count="1"></u-upload>
            </view>
        </view>
        <button size="default" type="default" class="submit" @click="submit">{{ $t('Recharge.submit') }}</button>
        <view class="tips">
            {{ $t('Recharge.tips') }}:<br>
            {{ $t('Recharge.tips1') }}<br>
            {{ $t('Recharge.tips2') }}<br>
            {{ $t('Recharge.tips3') }}<br>
            {{ $t('Recharge.tips4') }}<br>
            {{ $t('Recharge.tips5') }}
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
            addresses: [], // 存储多个地址
            selectedAddress: '', // 当前选中的地址
            amount: '',
            isRequest: false,
            userInfo: {},
            uploadUrl: '',
            lists: [],
            timer: ''
        }
    },
    computed: {},
    onLoad() {
        var userInfo = uni.getStorageSync('userInfo')
        if (userInfo) {
            this.userInfo = userInfo
        }
        this.uploadUrl = apis.upload
    },
    onShow() {
        this.getAddress()
        this.getUserInfo()
    },
    onReady() {
        this.lists = this.$refs.uUpload.lists;
    },
    methods: {
		handleAddressChange(e) {
			console.log(e)
		            // 更新选中的地址
		            this.selectedAddress = e.detail.value;
		        },
        submit() {
            var that = this
            if (that.lists.length >= 1) {
                var image = that.lists[0].response.data.url
                if (!image) {
                    uni.showToast({
                        title: that.$t('Recharge.please')
                    })
                    return false
                }
            }
            if (!that.amount) {
                uni.showToast({
                    title: that.$t('Recharge.enter.amount')
                })
                return false
            }

            if (that.isRequest) {
                return false
            }

            that.isRequest = true

            uni.showLoading()

            that.$http.post(apis.recharge, {
                price: that.amount,
                pay_type: 3,
                pay_image: image,
                address: that.selectedAddress // 使用选中的地址
            }).then(res => {
                that.isRequest = false

                that.amount = ''

                this.$refs.uUpload.lists = ''

                uni.hideLoading()

                if (res.data.code == 1) {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'success'
                    })

                    that.timer = setTimeout(function () {
                        clearTimeout(that.timer)
                        uni.reLaunch({
                            url: '/pages/account/index'
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
        uploadSuccess(file) {
            console.log(file)
        },
        copy() {
            uni.setClipboardData({
                data: this.selectedAddress,
                success: function () {
                    uni.showToast({
                        icon: 'success'
                    })
                }
            });
        },
        getAddress() {
            var that = this

            uni.showLoading()

            that.$http.post(apis.getAddress).then(res => {
                uni.hideLoading()
                if (res.data.code == 1) {
                    that.addresses = res.data.data; // 假设返回的数据是一个地址数组
                    if (that.addresses.length > 0) {
                        that.selectedAddress = that.addresses[0].address // 默认选中第一个地址
                    }
                }
            })
        },
        handleAddressChange(e) {
            this.selectedAddress = e.detail.value
        },
        getUserInfo() {
            var that = this
            that.$http.post(apis.getUserInfo).then(res => {
                if (res.data.code == 1) {
                    that.userInfo = res.data.data
                    uni.setStorageSync('userInfo', that.userInfo)
                }
            })
        }
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

   .tips {
        margin-top: 20px;
        font-size: 18px;
        color: rgb(0, 0, 0);
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
        background: rgb(0, 208, 234);
        border-radius: 10px;
        margin-top: 15px;
        color: #fff;
        font-size: 15px;
        font-weight: 700;
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
        }

       .value {}

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

   .radio-label {
        display: block;
        margin: 10px 0;
        font-size: 14px;
        color: #333;
    }
}
</style>