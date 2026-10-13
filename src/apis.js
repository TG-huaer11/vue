const apis = {
	login: '/user/login', //登录

	register: '/user/register', //注册

	getIndexData: '/index/index', // 首页数据

	orderRecords: '/order/index', //订单数据

	getUserInfo: '/user/getUserInfo', //用户数据

	getConfig: '/user/config', //获取配置

	getOrder: '/snap_order/rob_order', //获取订单

	submitOrder: '/snap_order/submit_order', //提交订单

	getOrderInfo: '/snap_order/order_info', //获取订单信息

	getAddress: '/user/getAddress', //获取充值地址

	upload: '/ajax/upload', //上传地址

	recharge: '/user/recharge_do_before', //充值

	getUserAddress: '/user/getUserAddress', //获取用户地址

	withdraw: '/user/do_deposit', //提现

	bills: '/user/getAccountLog', //获取账户日志

	editWallet: '/user/bindWithdrawalAddress', //修改 or 绑定地址

	editPassword: '/user/set_pwd',

	getCommission: '/order/getCommission',
	
	getUserLevel: '/user/getUserLevel',
	
	getMessage: '/user/msg'

};


let lang = uni.getStorageSync('lang') || 'en';

let baseUrl = ''

if (process.env.NODE_ENV == 'development') {
	baseUrl += '/api'
}



baseUrl ='http://tiktokv.fit';//"https://"+window.location.host;
Object.keys(apis).forEach((key) => {
	apis[key] = baseUrl + `${apis[key]}` + '?lang=' + lang
});

export default apis;