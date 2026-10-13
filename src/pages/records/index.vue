<template>
	<view class="records-page">
		<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" active-color="#333"
			inactive-color="#999" :is-scroll="false" :bold="false"></u-tabs-swiper>

		<scroll-view class="scroll-text" scroll-y="true" ref="scrollView" @scrolltoupper="upperHandler"
			@scrolltolower="lowerHandler" v-if="list.length> 0">
			<view class="text-content">
				<view class="cont-li" v-for="item in list">
					<view class="title">
						<image class="img" src="@/static/images/logo.png"></image>
						<text class="time">{{ item.create_at }}</text>
					</view>
					<view class="cont" :style="item.status !== 0 ? 'border-bottom: unset;' :''">
						<image :src="item.goods[0].goods_pic" mode="scaleToFill"></image>
						<view class="text-view">
							<view class="txt1">{{ item.goods[0].goods_name }}</view>
							<view>
								<view class="commission">
									<text>{{ $t('Order.total_value') }}:</text>
									<text>{{ item.total }} USD</text>
								</view>
								<view class="commission">
									<text class="ffc">{{ $t('Order.commission') }}:</text>
									<text class="ffc">{{ item.commission }} USD</text>
								</view>
							</view>
						</view>
					</view>
					<view class="title" style="border-bottom: unset;" v-if="item.status == 0">
						<image class="img"></image>
						<text class="time submit-btn" @click="getOrderInfo(item.id)">{{ $t('Order.submit')}} </text>
					</view>
				</view>
			</view>
		</scroll-view>

		<u-empty :text="$t('Common.no_data')" mode="list" style="margin-top: 20vh;" v-else></u-empty>

		<uPopup :show="showOrderInfo" :orderInfo="orderInfo" />
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
				dataArr: [1],
				tabs: [{
						name: 'All',
						// count: 0
					},
					{
						name: 'Submission',
						// count: 1
					},
					{
						name: 'Completed',
						// count: 2
					},
					{
						name: 'Frozen',
						// count: 3
					}
				],
				current: 0,
				page: 1,
				isMore: true,
				list: [],
				showOrderInfo: false,
				orderInfo: {},
				isRequest: false
			}
		},
		computed: {
			...mapState(['TOKEN', 'UID']),
		},
		onLoad() {
			var that = this
			that.getList()
			that.bus.$on('completedOrder', (oid) => {
				if (that.list) {
					let order = that.list.find(order => order.id === oid);
					if (order) {
						order.status = 1
					}
					
					that.showOrderInfo = false
					that.orderInfo = {}
				}
			});
			this.setTabbar()
			
			const nav = that.$t("records_nav")
			this.tabs = nav.map((status, index) => {
			  return {
			    name: status
			  };
			});
		},
		onShow() {},
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
			getList() {
				var that = this
				uni.showLoading()
				that.$http.post(apis.orderRecords, {
					status: that.current,
					page: that.page
				}).then(res => {
					uni.hideLoading()
					if (res.data.code == 1) {
						if (that.page == 1) {
							that.list = []
						}
						if (res.data.data.data.length > 0) {
							var pageList = res.data.data.data
							that.page++
							that.list = that.list.concat(pageList)
						} else {
							that.isMore = false
						}
					}
				})
			},
			tabsChange(current) {
				this.current = current
				this.page = 1
				this.isMore = true
				this.getList()
			},
			upperHandler() {
				// 滚动到顶部时的事件处理
				// console.log('滚动到顶部');
			},
			lowerHandler() {
				// 滚动到底部时的事件处理
				console.log('滚动到底部');
				if (this.isMore) {
					this.getList()
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.records-page {
		background-color: #f6f6f6;
		min-height: calc(100vh - 50px);

		.scroll-text {
			height: calc(100vh - 101px);
			box-sizing: border-box;
			padding: 0 3%;

			.cont-li {
				margin: 5px 0 10px;
				box-sizing: border-box;
				padding: 3px 3%;
				background: #fff;
				border-radius: 8px;

				.cont {
					display: flex;
					padding: 8px 0;
					border-bottom: 1px #f4f4f4 solid;

					image {
						width: 70px;
						height: 70px;
						margin-right: 7px;
					}

					.text-view {
						flex-grow: 1;
						max-width: calc(100% - 77px);

						text {
							color: #000;
						}

						.txt1 {
							font-size: 13px;
							line-height: 18px;
							margin-bottom: 5px;
						}

						.commission {
							display: flex;
							justify-content: space-between;
						}

						.ffc {
							color: #ff4246;
						}
					}
				}

				.title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px #f4f4f4 solid;
					height: 35px;

					.img {
						width: 50px;
						height: 17px;
					}

					.time {
						color: #999;
						font-size: 14px;
					}

					.submit-btn {
						color: rgb(255, 255, 255);
						background-color: rgb(0, 208, 234);
						border-radius: 10px;
						width: 60px;
						height: 30px;
						text-align: center;
						line-height: 30px;
						margin-top: 10px;
						margin-bottom: 10px;
					}
				}
			}
		}
	}
</style>