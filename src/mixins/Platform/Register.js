import { mapActions } from 'vuex'
//import mixins from 'src/mixins'
import { LoginType } from 'src/store/module/login'
import storage from '~/store'

export default {
	components: {},
	data: () => ({
		registerData: {},
		check: false,
		checkMsg: '',
		second: 30,
		timer: null,
		resetTime: false,
		promotion: storage.get('promotion') || {}
	}),
	methods: {
		...mapActions(['memberRegister', 'memberRegisterCheck']),
		async onRegister() {
			var res = await this.memberRegister(this.registerData)

			if (res.code === 0) {
				this.$bus.emit('show.alert', {
					content: this.$t('registerCheckSuccess')
				})
				return true
			} else {
				this.$bus.emit('show.alert', {
					content: this.$t('registerCheckFail')
				})
			}
			return false
		},
		async setResetTime() {
			this.resetTime = true
			this.registerData.phone = this.$route.query.phone
			this.registerData.p33_apc_promotion_code = this.promotion.code
			await this.onRegister()
			this.timer = setInterval(this.calculateTime, 1000)
		},
		calculateTime() {
			this.second--
			if (this.second < 1) {
				clearInterval(this.timer)
				this.second = 30
				this.resetTime = false
			}
		},
		async getSmsAndToStep2(name) {
			if (this.registerData.phone && this.registerData.phone !== '') {
				this.registerData.p33_apc_promotion_code = this.promotion.code

				var red = await this.onRegister()
				if (red) {
					this.$router.push({
						name,
						query: {
							phone: this.registerData.phone
						}
					})
				}
			} else {
				this.$bus.emit('show.alert', {
					content: '請輸入手機號碼'
				})
			}
		},
		async checkRegister(registerSuccessRouteName, downloadAPPRouteName) {
			const res = await this.memberRegisterCheck(this.registerData)
			if (res.code === 0) {
				this.$bus.emit('show.alert', {
					content: this.$t('registerSuccess')
				})
				storage.remove('promotion')
				this.$store.dispatch(LoginType.POLLING, { req: 'checking' })

				this.$router.push(
					this.promotion.app
						? { name: downloadAPPRouteName }
						: {
								name: registerSuccessRouteName,
								query: {
									s: 'registed'
								}
							}
				)
			} else {
				this.check = true
				this.checkMsg = res.text.p33_rss_auth_sms[0]
				this.$bus.emit('show.alert', {
					content: res.text.p33_rss_auth_sms[0]
				})
			}
		}
	},
	destroyed() {
		clearInterval(this.timer)
	}
}
