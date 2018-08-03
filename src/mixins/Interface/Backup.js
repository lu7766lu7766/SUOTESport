import { mapActions } from 'vuex'
import Loading from 'src/mixins/Common/Check/Loading'
import InterfaceConf from 'src/config/InterfaceConf'
import TmeCodeConf from 'src/config/TmeCodeConf'
import BranchType from 'src/config/BranchType'
import RouteConf from 'src/config/RouteConf'
import { LoginType } from 'src/store/module/login'

export default {
	mixins: [Loading],
	data: () => ({
		urls: []
	}),
	methods: {
		...mapActions(['getBackupUrl']),
		openLink(url) {
			window.open(url)
		},
		async onGetBackUrl() {
			var res = await this.getBackupUrl()
			if (res.code === 0) {
				// 可考慮用_.reject
				this.urls = _.filter(res.data, data => {
					return (
						data &&
						data.domain.indexOf(this.domain) == -1 && // 不等於目前的網址
						data.domain != InterfaceConf.Host.Payment && // 不等於金流網址
						InterfaceConf.Host.BlackList.indexOf(data.domain) == -1 // 不存在於黑名單之中
					)
				})
				_.forEach(this.urls, data => {
					this.ping(data.domain)
				})
			}
		},
		ping(url) {
			$.ping(url, data => {
				if (data.status == 'success') {
					this.urls[_.findIndex(this.urls, { domain: url })].speed = data.speed
					this.urls = _.cloneDeep(this.urls)
				}
			})
		},
		getCurrentSpeed(speed) {
			return speed ? speed + ' ms' : '-'
		}
	},
	computed: {
		cLogo() {
			if (RouteConf.tmeCode() == TmeCodeConf.CASH) {
				return '/resource/static/platform-cash/images/logo.png'
			} else if (RouteConf.tmeCode() == TmeCodeConf.CREDIT) {
				return '/resource/static/platform-credit/images/logo.png'
			} else if (RouteConf.tmeCode() == TmeCodeConf.SIN) {
				return '/resource/static/platform-credit/images/logo.png'
			}
		},
		title() {
			return this.$store.state.Login.title
		},
		type() {
			const branch = this.$store.state.Login.branch
			if (branch) {
				return BranchType[branch.p32_bch_type]
			}
			return ''
		},
		domain() {
			return _.find(InterfaceConf.Host.BackupList, domain => location.host.indexOf(domain) > -1)
		},
		datas() {
			return _.orderBy(this.urls, data => data.speed || 9999)
		}
	},
	async created() {
		await this.$store.dispatch(LoginType.POLLING, { req: 'checking' })
		document.title = this.title + '備用網址'
		this.onGetBackUrl()
	}
}
