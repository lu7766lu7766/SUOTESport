import { mapState, mapActions } from 'vuex'
import Link from 'src/mixins/Common/Link'
import CheckGame from 'src/mixins/Platform/CheckGame'
import OuterGameConf from 'src/config/OuterGameConf'

export default {
	mixins: [Link, CheckGame],
	data() {
		return {
			gameToken: ''
		}
	},
	methods: {
		...mapActions(['getGameUrl']),
		checkLogin2Games(type) {
			this.checkLogin(() => {
				this.checkGames[type] ? this.checkIsMobileAndConfig(type) : this.toBeContinued()
			})
		},
		checkIsMobileAndConfig(type) {
			// 黃金期權，3D電子遊戲走 h5
			this.isMobile && OuterGameConf[type] ? this.checkActiveAndOpenAPP(type) : this.checkActiveAndOpenGame(type)
		},
		async onGetGameUrl(type) {
			return await this.getGameUrl({
				game_category: type,
				is_mobile: this.isMobile
			})
		},
		async checkActiveAndOpenAPP(type) {
			var res = await this.onGetGameUrl(type)
			if (res.code === 0) {
				this.gameToken = res.data.enter_url.split('token=')[1]
				window.location.href = this.getAPPActiveLink(type)
				setTimeout(() => {
					if (confirm('尚未安裝APP 請先安裝')) {
						this.$router.push({ name: this.teachRouteName, query: { type } })
					}
				}, 800)
			} else {
				this.$bus.emit('show.alert', {
					content: '尚未啟用遊戲'
				})
			}
		},
		async checkActiveAndOpenGame(type) {
			var newWindow = this.windowOpenNoStatus('', {}, type)
			var res = await this.onGetGameUrl(type)
			if (res.code === 0) {
				newWindow.location.href = res.data.enter_url
			} else if (res.code === 330127) {
				newWindow.close()
				this.$bus.emit('show.alert', {
					content: '未設定相關項目，請洽詢您的遊戲管理人'
				})
			} else {
				newWindow.close()
				this.$bus.emit('show.alert', {
					content: '尚未啟用遊戲'
				})
			}
		},
		getAPPActiveLink(type) {
			if (OuterGameConf[type]) {
				return OuterGameConf[type].ActiveUtl + `?token=${this.gameToken}&lang=zh_TW&platformURL=${location.origin}`
			} else {
				return this.platformAPPActiveLink
			}
		},
		toBeContinued() {
			this.$bus.emit('show.alert', {
				content: '敬請期待'
			})
		}
	}
}
