import Vue from "vue"
// i18n部分的配置
// 引入语言包，注意路径
import de from './de.js';
import fr from './fr.js';
import it from './it.js';
import pt from './pt.js';
import ru from './ru.js';
import spa from './spa.js';
import en from './en.js';
import zh from './zh.js';
import tr from './tr.js';
import ar from './ar.js';
// VueI18n
import VueI18n from '@/common/vue-i18n.min.js';

// VueI18n
Vue.use(VueI18n);

const i18n = new VueI18n({
	// 默认语言
	locale: uni.getStorageSync('lang') || 'en',
	// 引入语言文件
	messages: {
		'de':de,
		'fr':fr,
		'it':it,
		'pt':pt,
		'ru':ru,
		'spa':spa,
		'en':en,
		'zh':zh,
		'tr':tr,
		'ar':ar,
	}
});

export default i18n