import Vue from 'vue'
import swal from 'sweetalert2'
import storage from '~/store'
import Cookies from 'lib/CookiesTool'

class QueryController {
	static querys

	static async proccess() {
		this.querys = this.parse()
		// console.log(this.querys)
		if (this.querys) {
			if (this.querys.cls && this.querys.device == 'app') {
				await this.setLoginCookie()
				this.overrideConsoleApp()
			} else if (this.querys.c) {
				await this.resetPwd()
			} else if (this.querys.promotion) {
				this.setPromotionCode()
			} else if (this.querys.reg == 'app') {
				this.setAPPPromotion()
			} else if (this.querys.hashUrl) {
				await this.checkSportLogin()
			}
		}
	}

	/**
	 * 解析query
	 */
	static parse() {
		var tmp = location.search.split('?')[1]
		if (tmp) {
			var querys = {}
			var queryList = tmp.split('&')
			queryList.forEach(queryString => {
				var query = queryString.split('=')
				querys[query[0]] = query[1]
			})
			return querys
		}
	}

	/**
	 * 物件反序列化
	 * @param {*} data {}
	 */
	static stringify(data) {
		if (typeof data === 'object') {
			var search = ''
			data.forEach((v, k) => {
				search += search ? '&' : '' + `${k}=${v}`
			})
			return search
		}
	}

	/**
	 * 寫入登入狀態
	 * for android & ios to currency store
	 */
	static async setLoginCookie() {
		return new Promise((resolve, reject) => {
			// 防止有網址內碼
			this.querys.cls = decodeURIComponent(this.querys.cls)
			console.log('初始session: ' + Cookies.get('laravel_session') + '參數: ' + this.querys.cls)
			Cookies.set('laravel_session', this.querys.cls, { expires: 1, path: '/' })

			if (Cookies.get('laravel_session') == this.querys.cls) {
				console.log('session 寫入成功')
				resolve(1)
			} else {
				setTimeout(() => {
					console.log('目前session: ' + Cookies.get('laravel_session'))
					if (Cookies.get('laravel_session') == this.querys.cls) {
						console.log('session 寫入成功')
						resolve(1)
					} else {
						console.log('session 寫入失敗')
						resolve(0)
					}
				}, 50)
			}
		})
	}

	/**
	 * 複寫console.app
	 * for android & ios to currency store
	 */
	static overrideConsoleApp() {
		console.app = val => {
			location = `app://${val}`
		}
	}

	/**
	 * 重設密碼
	 */
	static async resetPwd() {
		let res = await Vue.callApi('getRestPasswordCheck', {
			code: this.querys.c
		})
		// console.log(res.data.url)
		if (res.code === 0) {
			window.location.href = res.data.url + '?code=' + this.querys.c
		} else {
			swal('無效的驗證碼')
		}
	}

	/**
	 * 推廣代碼
	 */
	static setPromotionCode() {
		storage.set('promotion', {
			code: this.querys.promotion
		})
	}

	/**
	 * app推廣
	 */
	static setAPPPromotion() {
		storage.set('promotion', {
			app: true
		})
	}

	/**
	 * 第三方直接登入運彩
	 * check sport login
	 */
	static async checkSportLogin() {
		await Vue.callApi('checkSportLogin', { hashUrl: this.querys.hashUrl })
	}
}

export { QueryController as default }
