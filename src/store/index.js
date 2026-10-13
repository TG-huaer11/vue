/*
 * @Author: Xiong Pengzhan
 * @Date: 2021-11-30 19:01:33
 * @LastEditTime: 2022-03-17 10:13:57
 * @LastEditors: Xiong Pengzhan
 * @Description: vuex
 * @FilePath: \uni-wx\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";
import CreatePersistedstate from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		CreatePersistedstate({
			path: ['token', 'uid'],
			storage: {
				getItem: key => uni.getStorageSync(key),
				setItem: (key, value) => uni.setStorageSync(key, value),
				removeItem: key => uni.removeStorageSync(key)
			}
		})
	],
	state: {
		token: "",
		uid: "",
	},
	mutations: {
		setToken(state, value) {
			state.token = value;
		},
		setUid(state, value) {
			state.uid = value;
		},
	},
	actions: {},
});
