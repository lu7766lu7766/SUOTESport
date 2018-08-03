import mixins from 'src/mixins'
import { mapState } from 'vuex'
import swal from 'sweetalert2'

export default {
	mixins: [mixins],
	methods: {
		checkService2Link() {
			if (this.otherUrl.service == '') {
				this.$bus.emit('show.alert', {
					content: '目前未開放線上客服'
				})
			} else {
				let link = this.otherUrl.service
				if (this.isLogin) {
					link += `&username=${this.accountID}`
				}
				this.windowOpenNoStatus(
					link,
					!this.isMobile
						? {
							height: 640,
							width: 800
						}
						: {}
				)
			}
		},
		linkToOutside(link) {
			window.open(link)
		},
		checkLoginOpenLink(url, type = '') {
			this.checkLogin(() => {
				this.windowOpenNoStatus(url, {}, type)
			})
		},
		checkLogin2Link(name) {
			this.checkLogin(() => {
				this.$router.push({
					name
				})
			})
		},
		checkLogin(f) {
			if (this.isLogin) {
				f()
			} else {
				this.$swal(this.$t('alert.pleaseLogin'))
			}
		},
		checkCleanCache() {
			swal({
				title: '請確認',
				text: `是否要清除快取`,
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: '好',
				cancelButtonText: '不要'
			}).then(response => {
				if (response) {
					this.$clearCatch()
				}
			})
		},
		getFullRouteUrl(route) {
			return location.origin + this.$router.match(route).fullPath
		},
		openByRoute(route, config, openType) {
			this.windowOpenNoStatus(this.getFullRouteUrl(route), config, openType)
		},
		windowOpenNoStatus(url, config, openType = '') {
			config = _.assign(
				{
					toolbar: 'no',
					location: 'no',
					scrollbars: 'yes',
					resizable: 'yes'
				},
				config
			)
			var configList = _.reduce(
				config,
				(result, val, key) => {
					result.push(`${key}=${val}`)
					return result
				},
				[]
			)
			return window.open(url, openType, configList.join(','))
		}
	},
	computed: {
		...mapState({
			otherUrl: state => state.Login.otherUrl
		}),
		accountID() {
			return this.userInfo && this.userInfo.account ? this.userInfo.account.p33_ant_account : ''
		}
	}
}
