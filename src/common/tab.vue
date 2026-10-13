<template>
	<view>
		<view class="tab-page">
			<image class="icon-image t1-image" src="@/static/images/t1.png" alt=""></image>
			<image class="tab-image" src="@/static/images/logo.png" v-if="!title"></image>
			<text class="title" v-else>{{title}}</text>
			<image class="icon-image" src="@/static/images/t2.png" alt="" @click="show = true"></image>
		</view>

		<u-popup v-model="show" mode="center" width="60%">
			<view class="popup-view">
				<view @click="setLang(item.value)" v-for="(item,index) in langList" style="margin: 0 auto;width: 55%">
					<image style="width: 20px;height: 20px;margin-right: 5px;" :src="item.image"></image>
					<span style="text-align: left;">{{ item.name }}</span>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				show: false,
				langList: [
					{
						'name': 'españols',
						'value': 'spa',
						'image': '/static/images/spa.png'
					},
					{
						'name': 'Deutsch',
						'value': 'de',
						'image': '/static/images/de.png'
					},
					{
						'name': 'English',
						'value': 'en',
						'image': '/static/images/en.png'
					},
					{
						'name': 'Français',
						'value': 'fr',
						'image': '/static/images/fr.png'
					},
					{
						'name': 'Italiano',
						'value': 'it',
						'image': '/static/images/it.png'
					},
					{
						'name': 'Português',
						'value': 'pt',
						'image': '/static/images/pt.jpg'
					},
					{
						'name': 'Русскийês',
						'value': 'ru',
						'image': '/static/images/ru.png'
					},

					{
						'name': '中文',
						'value': 'zh',
						'image': '/static/images/cn.png'
					},
					{
						'name': 'Türkçe',
						'value': 'tr',
						'image': '/static/images/tr.png'
					},
					{
						'name': 'عربي',
						'value': 'ar',
						'image': '/static/images/ar.png'
					},
				],
			}
		},
		computed: {},
		onLoad() {},
		onShow() {},
		methods: {
			//设置语言
			setLang(item) {
				this._i18n.locale = item
				this.lang = item
				uni.setStorageSync('lang', item)
				this.show = false
				window.location.reload()
			},

		}
	}
</script>

<style lang="scss" scoped>
	.tab-page {
		padding: 10px;
		display: flex;
		align-content: center;
		justify-content: space-between;

		.tab-image {
			width: 100px;
			height: auto;
		}

		.title {
			font-weight: bold;
		}

		.icon-image {
			width: 26px;
			height: 26px;
		}

		.t1-image {
			width: 32px;
		}
	}

	.popup-view {
		padding: 15px 0px;

		view {
			font-size: 16px;
			font-weight: bold;
			color: #000;
			text-decoration: none;
			text-align: left;
			padding: 8px;
		}
	}
</style>