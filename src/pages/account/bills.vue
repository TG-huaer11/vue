<template>
	<view class="records-page">
		<tabModel />
		<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" active-color="#333"
			inactive-color="#999" :is-scroll="false" :bold="false"></u-tabs-swiper>

		<scroll-view class="scroll-text" scroll-y="true" ref="scrollView" @scrolltoupper="upperHandler"
			@scrolltolower="lowerHandler" v-if="dataArr.length> 0">
			<view class="text-content">
				<view class="cont-li" v-for="item in list">
					<view class="title">
						<image class="img" src="@/static/images/logo.png"></image>
						<text class="time">{{ item.created }}</text>
					</view>
					<view class="cont">
						<view class="">{{ item.remark }}</view>
						<view class="">{{ item.i == 1 ? '+' : '-' }} {{ item.number }}</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<u-empty :text="$t('Common.no_data')" mode="list" style="margin-top: 20vh;" v-else></u-empty>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import tabModel from '@/common/tabRet.vue'
	import apis from '@/apis.js'
	export default {
		components: {
			tabModel
		},
		data() {
			return {
				dataArr: [1],
				tabs: [{
						name: 'All',
						// count: 0
					},
					{
						name: 'Income',
						// count: 1
					},
					{
						name: 'Expenditure',
						// count: 2
					}
				],
				current: 0,
				page: 1,
				isMore: true,
				list: []
			}
		},
		computed: {
			...mapState(['TOKEN', 'UID']),
		},
		onLoad() {
			this.getList()
			var that = this
			const nav = that.$t("bills_nav")
			this.tabs = nav.map((status, index) => {
			  return {
			    name: status
			  };
			});
		},
		onShow() {},
		methods: {
			...mapMutations(['setToken', 'setUid']),
			getList(){
				var that = this
				
				uni.showLoading()
				
				that.$http.post(apis.bills,{
					status: that.current,
					page: that.page
				}).then(res => {
					uni.hideLoading()
					
					if (res.data.code == 1) {
						if (that.page == 1) {
							that.list = []
						}
						
						var pageList = res.data.data.data
						if (pageList.length > 0) {
							that.list = that.list.concat(pageList)
						} else {
							that.isMore = false
						}
					}
				})
			},
			tabsChange(current) {
				this.current = current
				this.page = 1;
				this.isMore = true
				this.getList()
			},
			upperHandler() {
				// 滚动到顶部时的事件处理
				// console.log('滚动到顶部');
			},
			lowerHandler() {
				// 滚动到底部时的事件处理
				// console.log('滚动到底部');
				if (this.More) {
					this.getList()
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.records-page {
		background-color: #f6f6f6;
		// min-height: calc(100vh - 50px);
		min-height: 100vh;

		.scroll-text {
			height: calc(100vh - 60px);
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
					justify-content: space-between;
					padding: 8px 0;
					font-size: 16px;
					line-height: 20px;
					color: #000;
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
				}
			}
		}
	}
</style>