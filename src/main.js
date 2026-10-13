import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import store from "./store/index.js";
import http from "./unit/http.js";
import uView from "uview-ui";

import i18n from '@/common/locales/config.js'
Vue.prototype._i18n = i18n;

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$http = http;
Vue.use(uView);
App.mpType = 'app'

let bus = new Vue()
Vue.prototype.bus = bus

const app = new Vue({
	i18n,
  ...App,
	store
})
app.$mount()
