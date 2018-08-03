import { mapActions } from 'vuex'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import Quota from 'src/mixins/Common/Quota'
import Header from 'src/mixins/Common/Header'
import Yebpay from 'src/mixins/Platform/Yebpay'

export default {
	mixins: [CheckLogin, Quota, Header, Yebpay],
	data: () => ({
		source: 'e_wallet',
		target: 's_wallet',
		point: 0,
		isSubmit: false
	}),
	methods: {
		...mapActions(['getOutterGame', 'postPointTransform', 'getAllowDepositOfQuota', 'getAlreadyDepositPoint']),
		async onSubmit() {
			if (this.point === 0) {
				this.$bus.emit('show.alert', { content: '遊戲幣必須大於0' })
				return
			}

			let check = this.source === 'TAMBT' ? this.wallet + this.income : this.userPoint[this.source]
			if (check < this.point) {
				this.$bus.emit('show.alert', { content: '金額不足' })
				return
			}
			var point = parseInt(this.point)
			if (point === 0) {
				this.$bus.emit('show.alert', { content: '遊戲幣未滿1點不得轉移' })
				return
			}
			this.isSubmit = true
			var res = await this.postPointTransform({
				point,
				source: this.source,
				destination: this.target
			})
			this.isSubmit = false

			if (res.code === 0) {
				this.$bus.emit('show.alert', { content: '轉移成功' })
				this.updateQuota()
				this.updateUserPoint()
				this.setMounted()
				if (this.source === 'TAMBT' || this.target === 'TAMBT') {
					this.$bus.emit('TAMBTCange', { check: this.userPoint.TAMBT })
					this.getTotal()
				}
				this.getTAMT()
			} else if (res.code === 891007) {
				this.$bus.emit('show.alert', { content: '餘額寶結帳中，請稍後再嘗試進行轉移' })
			} else {
				this.$bus.emit('show.alert', { content: '轉移失敗' })
			}
		},
		async trans2EWallet(gmeCode) {
			var { source, target, point } = this
			this.source = gmeCode
			this.target = 'e_wallet'
			this.point = gmeCode === 'TAMBT' ? parseInt(this.wallet + this.income) : this.userPoint[gmeCode]
			await this.onSubmit()
			this.source = source
			this.target = target
			this.point = point
		},
		async getAllow() {
			let res = await this.getAllowDepositOfQuota()
			return res.code === 0 ? res.data : 0
		},
		async getAlready() {
			let res = await this.getAlreadyDepositPoint()
			return res.code === 0 ? res.data : 0
		}
	},
	computed: {
		gamesFilter() {
			return this.getCurrentUserPointOrder(_.omit(this.userPoint, this.source))
		}
	},
	watch: {
		target(newVal) {
			var gameCodeList = Object.keys(this.gamesFilter)
			if (typeof newVal == 'undefined' && gameCodeList.length) {
				setTimeout(() => {
					this.target = gameCodeList[0]
				}, 50)
			}
		}
	}
}
