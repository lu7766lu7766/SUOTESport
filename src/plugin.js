import Vue from 'vue'
import libLangs from 'src/langs'
import { currency, guid, callApi } from 'lib/myLib'
import store from 'src/store'
import RouteConf from 'src/config/RouteConf'
import swal from 'sweetalert2'
import storage from '~/store'
// console.log(config)
exports.install = (Vue, options) => {
	; (Vue.prototype.$apiHost = config.apiHost),
		(Vue.prototype.$fileHost = config.fileHost),
		(Vue.prototype.$liveHost = config.liveHost),
		(Vue.prototype.$paymentHost = config.paymentHost),
		(Vue.prototype.$platformHost = RouteConf.$platformHost),
		(Vue.prototype.$sportHost = RouteConf.$sportHost),
		(Vue.prototype.$swal = swal),
		(Vue.prototype.$clearCatch = () => {
			storage.clearAll()
			location.reload()
		}),
		(Vue.prototype.$langTick = (lang, f) => {
			if (lang) {
				let timer = setInterval(() => {
					if (options.i18n.translate('index') == libLangs[lang]['index']) {
						clearInterval(timer)
						f()
					}
				}, 30)
			}
		}),
		(Vue.prototype.$toTop = (speed = 300) => {
			$('html, body').animate(
				{
					scrollTop: 0
				},
				speed
			)
		}),
		(Vue.prototype.$moment = time => {
			return time ? new Date(time * 1000) : new Date()
		}),
		(Vue.prototype.$paddingLeft = (str, lenght) => {
			if (str.length >= lenght) return str
			else return Vue.prototype.$paddingLeft('0' + str, lenght)
		}),
		(Vue.prototype.$dataTick = f => {
			if (!store.state.isDataInit) {
				let timer = setInterval(() => {
					if (store.state.isDataInit) {
						clearInterval(timer)
						f()
					}
				}, 30)
			} else {
				f()
			}
		}),
		(Vue.prototype.$cssTick = f => {
			var $container = $('<div clas="container"></div>"')
				.css('height', 0)
				.appendTo('body')
			if (!$container.width()) {
				let timer = setInterval(() => {
					if ($container.width() > 0) {
						clearInterval(timer)
						$container.remove()
						setTimeout(f, 50)
					}
				}, 30)
			} else {
				setTimeout(f, 50)
				$container.remove()
			}
		}),
		(Vue.prototype.$imgTick = f => {
			var $img = $('img'),
				img = $img[0],
				times = 0
			if (!$img.length) {
				f()
			} else {
				let timer = setInterval(() => {
					times++
					if (($img.length && img.complete && img.naturalWidth) || times > 15) {
						clearInterval(timer)
						f()
					}
				}, 100)
			}
		}),
		(Vue.prototype.$guid = guid),
		(Vue.prototype.$currency = currency),
		(Vue.prototype.$getKeyByValue = (object, value) => {
			return _.invert(object)[value]
		}),
		Vue.filter('currency', currency),
		/**
		 * @param showLen 正數從左顯示，負數從右顯示
		 * @param replace 隱藏的取代字串
		 */
		Vue.filter('hideStr', (value, showLen = -3, replace = '*') => {
			if (!value) return ''
			value = value + ''
			let len = value.length
			let res = showLen > 0 ? value.substr(0, showLen) : value.substr(showLen)
			while (res.length < len) {
				res = showLen > 0 ? res + replace : replace + res
			}
			return res
		})
}

	; (function () {
		Vue.callApi = callApi
		// Vue.prototype.$callApi = Vue.callApi // 破壞原本流程
	})()
