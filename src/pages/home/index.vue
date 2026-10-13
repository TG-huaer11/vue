<template>
	<view class="home-page">
		<tabModel />
		<view class="cont">
			<u-divider :fontSize="42" half-width="25%" border-color="#666666" color="#333333">{{ $t('Index.commodities') }}</u-divider>
			<u-swiper class="swiper" :list="list"></u-swiper>
			<u-divider :fontSize="42" half-width="30%" border-color="#666666" color="#333333">{{ $t('Index.about') }}</u-divider>
			<view class="about-us" @click="go('/pages/account/about')">
				<view class="txt1">{{ siteName }}</view>
				<view class="txt2">{{ $t('Index.company') }}</view>
				<view class="txt3">{{ $t('Index.introduction') }}</view>
			</view>
			<u-divider :fontSize="42" half-width="27%" border-color="#666666" color="#333333">{{ $t('Index.commission') }}</u-divider>
		</view>
		<view class="withdraw">
			<scroll-view class="scroll-text" scroll-y="true" :scroll-top="currentScrollTop" :style="{ height: scrollHeight + 'px' }" ref="scrollView"
				@scrolltoupper="upperHandler" @scrolltolower="lowerHandler">
				<view class="text-content">
					<!-- 这里是你的滚动文字内容 -->
					<view class="cont-li" v-for="item in commissionList">
						<text class="txt1">{{ $t('Index.get') }}</text>
						<text class="txt2">{{ item.goods_price }}</text>
					</view>
				</view>
			</scroll-view>
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
				scrollHeight: 176, // 滚动视图的高度
				timer: null, // 定时器
				currentScrollTop: 0, // 当前滚动位置
				list: [{
						image: require('./images/31Zd0xdMARL._AC_UL320_.jpg'),
						title: ''
					},
					{
						image: require('./images/41YpgJjcD+L._AC_UL320_.jpg'),
						title: ''
					},
					{
						image: require('./images/61NjoN8kgBL._AC_UL320_.jpg'),
						title: ''
					},
					{
						image: require('./images/81On4W8SmKL._AC_UL320_.jpg'),
						title: ''
					},
					{
						image: require('./images/91fhUhNXQrL._AC_UL320_.jpg'),
						title: ''
					},
				],
				siteName: '',//站点名称
				commissionList:[],
				
			}
		},
		components: {
			tabModel
		},
		computed: {
			...mapState(['TOKEN', 'UID']),
		},
		onLaunch: function() {
			console.log('App Launch');
		
			
		},
		onLoad() {
			var config = uni.getAppBaseInfo()
			this.siteName = config.appName
			var commissionList = uni.getStorageSync('commissionList')
			if (commissionList) {
				this.commissionList = commissionList
			}
			this.setTabbar()
		},
		mounted() {
			this.startAutoScroll()
			this.getIndexData()
		},
		onShow() {},
		methods: {
			...mapMutations(['setToken', 'setUid']),
			go(url){
				uni.navigateTo({
					url
				})
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
			
			getIndexData(){
				var that = this
				
				that.$http.post(apis.getIndexData).then(res => {
					if (res.data.code == 1) {
						that.commissionList = res.data.data.list
						uni.setStorageSync('commissionList', that.commissionList)
					}
				})
			},
			startAutoScroll() {
				if (this.timer) return; // 如果定时器已经存在，则不重复创建

				this.timer = setInterval(() => {
					this.currentScrollTop++; // 每次增加一点滚动距离

					// 假设我们有一个方法来获取滚动内容的总高度
					// 这里为了简化，我们假设总高度是 1000px
					const totalHeight = 1000;

					// 当滚动到顶部时，重置滚动位置到内容底部继续滚动
					if (this.currentScrollTop >= totalHeight - this.scrollHeight) {
						this.currentScrollTop = 0;
					}

					// 调用 scroll-view 组件的 scrollTo 方法进行滚动（注意：uni-app 中可能需要使用其他方式）
					// 这里只是一个伪代码，因为 uni-app 的 scroll-view 没有直接提供 scrollTo 方法
					// 你可能需要通过修改 scroll-view 的样式或者使用其他方法来模拟滚动效果
					// 例如：使用 transform: translateY()

					// 假设你有一个方法可以设置滚动位置
					this.setScrollPosition(this.currentScrollTop);
				}, 100); // 每100毫秒滚动一次
			},
			stopAutoScroll() {
				clearInterval(this.timer);
				this.timer = null;
			},
			// 假设的 setScrollPosition 方法（在 uni-app 中需要你自己实现）
			setScrollPosition(scrollTop) {
				// 在这里，你可能需要修改 scroll-view 的样式或者使用其他方式来设置滚动位置
				// 例如：使用 uni.createSelectorQuery() 来获取 scroll-view 的 DOM 并设置其 scrollTop
				// 注意：uni-app 中没有直接的 DOM 操作，所以你需要使用 uni-app 提供的 API 来实现
			},
			upperHandler() {
				// 滚动到顶部时的事件处理
				// console.log('滚动到顶部');
			},
			lowerHandler() {
				// 滚动到底部时的事件处理
				// console.log('滚动到底部');
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home-page {

		.withdraw {
			width: 100%;
			height: 240px;
			padding: 32px 4% 32px 4%;
			background-image: url(./images/1593befdfebd015684cd01e19e74ff6b_thumb.jpg);
			background-size: cover;
			box-sizing: border-box;

			.scroll-text {
				width: 100%;
				/* 滚动视图宽度 */
				height: 176px;
				/* 滚动视图高度 */
				overflow: hidden;

				/* 隐藏超出部分 */
				.cont-li {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					width: 90%;
					margin-bottom: 10px;
					margin-left: 5%;
					height: 30px;
					padding: 0 15px;
					border-radius: 10px;
					background-color: hsla(0, 0%, 100%, .4);
					color: #000;
					
					.txt1{
						font-size: 12px;
					}
				}
			}
		}

		.cont {
			padding: 8px 3%;

			.swiper {
				width: 70%;
				margin: 14px 15%;
			}

			.about-us {
				height: 210px;
				padding: 23px 0px 0px 10px;
				background-image: url(./images/cdb046675de0df966d1ed12ac381e2c2_thumb.jpeg);
				background-size: cover;
				background-repeat: no-repeat;
				margin: 14px 0;
			}

			.txt1 {
				font-size: 20px;
				font-weight: 700;
				color: rgb(70, 70, 72);
			}

			.txt2 {
				font-size: 10px;
				font-weight: 700;
				color: rgb(70, 70, 72);
				margin-top: 0px
			}

			.txt3 {
				font-size: 13px;
				font-weight: 700;
				color: rgb(45, 44, 40);
				margin-top: 10px;
			}
		}
	}
</style>