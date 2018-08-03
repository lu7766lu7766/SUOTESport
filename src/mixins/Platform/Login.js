import { LoginType } from 'src/store/module/login'

export default {
	data() {
		return {
			loginID: '',
			loginPhone: '',
			loginPwd: '',
			isSubmit: false
		}
	},
	methods: {
		async login() {
			if (!this.isSubmit) {
				this.isSubmit = true
				var res = await this.$store.dispatch(LoginType.LOGIN, {
					type: this.type,
					loginID: this.loginID,
					loginPhone: this.loginPhone,
					loginPwd: this.loginPwd
				})
				if (res.code === 0) {
					this.$router.push(this.$platformHost())
				}
				this.isSubmit = false
			}
		},
		async logout() {
			var res = await this.$store.dispatch(LoginType.LOGOUT)
			if (res) {
				this.resetAll()
				this.$router.push(this.$platformHost())
			}
		},
		resetAll() {
			this.loginID = ''
			this.loginPwd = ''
			this.loginPhone = ''
		}
	},
	computed: {
		isLogin() {
			return this.$store.state.Login.isLogin
		},
		site() {
			return this.$store.state.Info.site
		}
	}
}
