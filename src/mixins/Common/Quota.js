import { mapActions } from 'vuex'
import { LoginType } from 'src/store/module/login'

export default {
	methods: {
		...mapActions(['getSportQuota', 'getQuota', 'getOutterGame']),
		updateSportQuota() {
			this.getSportQuota().then(this.setQuota)
		},
		updateQuota() {
			this.getQuota().then(this.setQuota)
		},
		async updateUserPoint() {
			var res = await this.getOutterGame()
			if (res.code === 0) {
				this.$store.commit(LoginType.loginSuccess, {
					userPoint: res.data.userPoint
				})
			}
		},
		setQuota(res) {
			if (res.code === 0) {
				this.$store.commit(LoginType.loginSuccess, {
					surplus: res.data
				})
			}
		}
	},
	computed: {
		surplus() {
			return this.userInfo && this.userInfo.surplus ? this.userInfo.surplus : 0
		}
	}
}
