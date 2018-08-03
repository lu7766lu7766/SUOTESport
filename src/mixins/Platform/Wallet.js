import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import Game from 'src/mixins/Platform/GameEnter'
import { mapActions } from 'vuex'

export default {
	mixins: [CheckLogin, Game],
	data: () => ({
		walletData: {
			s_wallet: 0
		}
	}),
	methods: {
		...mapActions(['getBalnce']),
		getGameClass(code) {
			switch (code) {
				case 's_wallet':
					return 'icon-sports'
					break
				case 'PHALE':
					return 'icon-casino'
					break
				case 'PHAGO':
					return 'icon-option'
					break
				case 'PHAST':
					return 'icon-slot'
					break
				case 'PHA3D':
					return 'icon-slot'
					break
				case 'PHABL':
					return 'icon-lottery'
					break
				default:
					return 'icon-sports'
					break
			}
		}
	},
	created() {
		_.forEach(this.checkGames, (isActive, code) => {
			if (isActive) {
				this.walletData[code] = 0
			}
		})
	},
	async mounted() {
		var res = await this.getBalnce()
		if (res.code === 0) {
			var sWallet = res.data.s_wallet
			this.walletData = _.assign(
				typeof sWallet != 'undefined' ? { s_wallet: sWallet } : {},
				_.omit(res.data, 'sport')
			)
			_.forEach(this.checkGames, (isActive, code) => {
				if (isActive) {
					if (typeof this.walletData[code] == 'undefined') {
						this.walletData[code] = 0
					}
				} else {
					this.walletData = _.omit(this.walletData, code)
				}
			})
		}
	}
}
