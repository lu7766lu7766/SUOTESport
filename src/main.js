// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
import storage from '~/store'
import router from './router/index'
import { sync } from 'vuex-router-sync'
// import VueHead from 'vue-head'
import VueHead from 'lib/MyVueHead'
import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import vuexI18n from 'vuex-i18n'
import libLangs from './langs'

import VueAxios from 'vue-axios'
import VueBus from 'vue-bus'

// // import ElementUI from 'element-ui'
// // Vue.use(ElementUI)
// import 'element-ui/lib/theme-default/index.css'
// import { Select, Option } from 'element-ui'
// Vue.use(Select)
// Vue.use(Option)

import MyPlugin from 'src/plugin'

sync(store, router)

import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
Vue.use(Toast)
Vue.use(MyPlugin, { i18n: Vue.i18n })
Vue.use(VueHead)
Vue.use(VueAxios, axios)
Vue.use(VueRx, { Observable, Subscription })
Vue.use(vuexI18n.plugin, store)
Vue.use(VueBus)

Vue.i18n.add('en', libLangs['en'])
Vue.i18n.add('zh_CN', libLangs['zh_CN'])
Vue.i18n.add('zh_TW', libLangs['zh_TW'])
let lang = navigator.language || navigator.userLanguage
lang = libLangs.switch(lang)
Vue.i18n.set(storage.get('lang') || lang.langcode)

Vue.config.ignoredElements = ['t']
console.app = val => {
	console.error(val)
}

moment.suppressDeprecationWarnings = true
// 不顯示描述警告
const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

import ifvisible from 'ifvisible.js'
ifvisible.setIdleDuration(90)

import LogController from 'lib/LogController'
LogController.override()

new Vue({
	el: '#app',
	// render: h => h(require('./App')),
	template: '<router-view transition="slide"></router-view>',
	store,
	router,
	mounted() {
		ifvisible.on('idle', () => {
			this.$bus.emit('await')
		})
		ifvisible.on('wakeup', () => {
			this.$bus.emit('awake')
		})
	}
})
