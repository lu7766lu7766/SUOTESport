import Link from 'src/mixins/Common/Link'
import RouteConf from 'src/config/RouteConf'
import { mapActions } from 'vuex'

export default {
	mixins: [Link],
	methods: {
		...mapActions(['getVideoUrl', 'getForumUrl']),
		checkLogin2Forum() {
			this.checkLogin(async () => {
				// document.querySelector('#forum').submit()
				let newWindow = this.windowOpenNoStatus('')
				let forum = await this.getForumUrl()
				if (forum.code === 0) {
					var form = document.createElement('form')
					form.setAttribute('method', 'post')
					form.setAttribute('action', 'http://forumapi.iwin365.cc')
					var formData = {
						token: forum.data.token,
						platform: forum.data.platform
					}
					_.forEach(formData, (val, name) => {
						var input = document.createElement('input')
						input.setAttribute('type', 'hidden')
						input.setAttribute('name', name)
						input.setAttribute('value', val)
						form.appendChild(input)
					})
					newWindow.document.body.appendChild(form)
					newWindow.document.forms[0].submit()
				} else {
					newWindow.close()
					this.$bus.emit('show.alert', { content: '目前未開放博彩論壇' })
				}
			})
		},
		checkLogin2Video() {
			this.checkLogin(async () => {
				let newWindow = this.windowOpenNoStatus('')
				let res = await this.getVideoUrl()
				if (res.code === 0) {
					newWindow.location.href = res.data.enter_url
				} else {
					newWindow.close()
					this.$bus.emit('show.alert', { content: '目前未開放影音平台' })
				}
			})
		},
		checkLogin2Sport() {
			this.checkLoginOpenLink(!this.isMobile ? RouteConf.sSPORT : RouteConf.sSPORT_MOBILE, 'sport')
		}
	},
	computed: {
		forumToken() {
			return this.isLogin ? (this.otherUrl.fourm ? this.otherUrl.fourm.token : '') : ''
		},
		forumPlatform() {
			return this.branch ? (this.otherUrl.fourm ? this.otherUrl.fourm.platform : 2) : 2
		},
		forumUrl() {
			return this.isLogin ? (this.otherUrl.fourm ? this.otherUrl.fourm.api_url : '') : ''
		},
		appQRCodeUri() {
			return this.branch && this.branch.p10_files_used[0]
				? this.branch.p10_files_used[0].p10_fud_files_folder + '/' + this.branch.p10_files_used[0].p10_fud_files_name
				: ''
		}
	}
}
