<template>
	<view class="">

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import apis from '@/apis.js'
	export default {
		data() {
			return {
				kefu:'',
			}
		},
		computed: {
			...mapState(['TOKEN', 'UID']),
		},
		onLoad() {
			this.getConfig()
			this.setTabbar()
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
			getConfig() {
				var that = this
				that.$http.post(apis.getConfig, {
					keyword: 'kefu'
				}).then(res => {
					if (res.data.code == 1) {
						var kefu = that.kefu = res.data.data.kefu
						window.location.href = kefu
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>