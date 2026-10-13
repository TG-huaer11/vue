<template>
	<view class="records-page">
		<tabModel />

		<scroll-view class="scroll-text" scroll-y="true" ref="scrollView" @scrolltoupper="upperHandler"
			@scrolltolower="lowerHandler" v-if="list.length> 0">
			<view class="text-content">
				<view class="cont-li" v-for="item in list">
					<view class="title">
						<image class="img" src="@/static/images/logo.png"></image>
						<text class="time">{{ item.create_at }}</text>
					</view>
					
					<view class="text">{{ item.title }}</view>
					<text class="text">{{ item.content }}</text>
					<view class="text"></view>
					<!-- <view class="cont">
					</view> -->
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
				
				that.$http.post(apis.getMessage,{
					page: that.page
				}).then(res => {
					uni.hideLoading()
					
					if (res.data.code == 1) {
						if (that.page == 1) {
							that.list = []
						}
						
						var pageList = res.data.data.info
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
		.text{
			margin: 10px 10px 10px 0px;
		}
		
		.text1{
			margin: 0px 10px 20px 0px;
		}
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