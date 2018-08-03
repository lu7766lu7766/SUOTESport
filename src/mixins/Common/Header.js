import mixins from 'src/mixins'

export default {
	mixins: [mixins],
	methods: {
		getHeaderUserPoint(userPoint) {
			return this.getCurrentUserPointOrder(_.omit(userPoint, 'e_wallet'))
		},
		getCurrentUserPointOrder(userPoint) {
			var eWallet = userPoint.e_wallet
			var sWallet = userPoint.s_wallet
			return Object.assign(
				typeof eWallet != 'undefined' ? { e_wallet: eWallet } : {},
				typeof sWallet != 'undefined' ? { s_wallet: sWallet } : {},
				_.omit(userPoint, ['e_wallet', 's_wallet'])
			)
		},
		getTotalPoint(userPoint) {
			return _.reduce(
				userPoint,
				(result, point) => {
					return (result += point)
				},
				0
			)
		}
	},
	computed: {
		surplus() {
			return this.userInfo && this.userInfo.surplus ? this.userInfo.surplus : 0
		},
		unit() {
			return this.branch.p32_bch_type == 1 ? this.$t('dollar') : this.$t('point')
			// 1 // 現金 // 點數
			// 2 // 信用 // 餘額
		},
		userPoint() {
			return this.userInfo && this.userInfo.userPoint ? this.userInfo.userPoint : {}
		}
	}
}
