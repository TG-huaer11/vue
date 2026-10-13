import store from "@/store/index.js";
import i18n from '@/common/locales/config.js'
var lang = i18n.messages[i18n.locale];

// const { base64decode, base64encode } = require("nodejs-base64");
// import CryptoJS from "crypto-js";
// import md5 from "js-md5";

export default {
	post: (url, data = {}, header = {}) => {
		var user_id = store.state.uid
		if (!user_id) {
			user_id = uni.getStorageSync('user_id')
		}
		
		return new Promise((reslove, reject) => {
			uni.request({
				url,
				data,
				method: "POST",
				header: {
					...header,
					"Authorization": user_id,
				},
				success: (result) => {
					reslove(result);
				},
				fail: (fail) => {
					reject(fail);
				},
				complete: (result) => {
					// 401:重新登录
					if (result.data.code === 401) {
						store.commit('setToken', '')
						store.commit('setUid', '')
						uni.setStorageSync('user_id', '')
						uni.reLaunch({
							url: '/pages/login/index'
						})
					}
				},
			});
		});
	},
	get: (url, data, header) => {
		var user_id = store.state.uid
		if (!user_id) {
			user_id = uni.getStorageSync('user_id')
		}
		return new Promise((reslove, reject) => {
			uni.request({
				url,
				data,
				method: "GET",
				header: {
					...header,
					"Authorization": user_id,
				},
				success: (result) => {
					reslove(result);
				},
				fail: (fail) => {
					reject(fail);
				},
				complete: (result) => {
					// 40000:重新登录
					// 0:正常返回
					// -1:报错，提示信息
					uni.hideLoading();
					if (result.data.code === -1) {
						uni.showToast({
							title: result.data.msg,
							icon: "none",
							duration: 3000,
						});
					} else if (result.data.code === 40000) {
						store.commit('setToken', '')
						store.commit('setUid', '')
						uni.reLaunch({
							url: '/pages/login/index'
						})
					}
				},
			});
		});
	},
	upload: (url, filePath, header = {}) => {
		uni.showLoading({
			title: titleMsg,
			mask: true,
		});
		var user_id = store.state.uid
		if (!user_id) {
			user_id = uni.getStorageSync('user_id')
		}
		return new Promise((reslove, reject) => {
			uni.uploadFile({
				url,
				filePath,
				header: {
					...header,
					"Authorization": user_id,
				},
				formData: {
					directory: "authorization",
				},
				name: "imgPath",
				success: (result) => {
					reslove(result);
				},
				fail: (fail) => {
					reject(fail);
				},
				complete: (result) => {
					reslove(result);
				},
			});
		});
	},
};
