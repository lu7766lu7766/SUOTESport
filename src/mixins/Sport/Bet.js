import { mapState, mapGetters, mapActions } from 'vuex'
import { BetType, getTargets, getBallSetting } from 'src/store/module/bet'
import { LoginType, getGameSettingKey } from 'src/store/module/login'
import SpyFactory from 'assets/scripts/SpyFactory'
import BetCodeConf from 'src/config/BetCodeConf'
import SportIndex from 'src/mixins/Sport/SportIndex'
import Quota from 'src/mixins/Common/Quota'

export default {
	mixins: [SportIndex, Quota],
	components: {
		MyNumeric: () => import('@/shared/MyNumeric')
	},
	data: () => ({
		multiBetCash: 0,
		betList: [],
		isRequest: false,
		isBetting: false
	}),

	methods: {
		...mapActions(['betSport', 'getBetList', 'getFavorites']),
		/**
		 * 驗證項目
		 */
		validate() {
			// 符合規範為true 不符合為false
			return {
				single: [
					{
						// 是否有投注目標
						result: (betBody, spo) => !!spo,
						message: 'alert.betSingleAtLeastOne'
					},
					{
						// 超過場次單注上限
						result: (betBody, spo) => !(betBody.cash > spo.sep_single_bet_limit),
						message: 'alert.overSgeBetMax'
					},
					{
						// 超過單式單注上限
						result: (betBody, spo) => {
							var singleMaxBet = getBallSetting(spo, this.$store.state, this.$store.getters, 'p43_gmac_config_bet_max')
							return !(singleMaxBet && betBody.cash > singleMaxBet)
						},
						message: 'alert.overSingleBetMax'
					}
				],
				multi: [
					{
						// 過關投注目標必須大於1
						result: () => !(this.multiBetBody.targets.length < 2),
						message: 'alert.betMultiMustMoreThanOne'
					},
					{
						// 超過最大派彩金額
						result: () => !(this.multiWinMoney > this.multiWinMax),
						message: 'alert.betMultiMustMoreWinMax'
					},
					{
						// 超過過關單注上限
						result: () => !(this.multiMaxBet && this.multiBetCash > this.multiMaxBet),
						message: 'alert.overMultiBetMax'
					}
				],
				common: [
					{
						// 不允許同時多次投注，防止連點
						result: () => !this.isBetting,
						message: ''
					},
					{
						// 餘額不足
						result: betBody => !(betBody.cash > this.surplus),
						message: 'alert.quotaNotEnough'
					},
					{
						// 投注金額是否大於1
						result: betBody => !(betBody.cash < 1),
						message: 'alert.betMoneyAlert'
					},
					{
						// 是否有投注目標
						result: betBody => !(betBody.targets.length == 0),
						message: 'alert.leastOneSpo'
					}
				]
			}
		},
		/**
		 * 驗證邏輯
		 */
		checkBet(type, betBody, spo) {
			let res = true
			_.forEach([...this.validate()[type], ...this.validate().common], validate => {
				if (!validate.result(betBody, spo)) {
					if (validate.message) {
						this.validAlert(validate.message)
						// console.log(validate.message)
					}
					res = false
				}
				return res
			})
			return res
		},
		/**
		 * 驗證失敗的警告
		 */
		validAlert(msg) {
			this.$bus.emit('show.alert', {
				type: 'mainten',
				content: this.$t(msg)
			})
		},
		/**
		 * 快速投注
		 */
		fastBetting(sspo) {
			const spo = _.cloneDeep(sspo)
			spo.isChecked = true
			const betBody = {
				cash: this.fastMoney,
				targets: getTargets([spo], 'single')
			}
			// console.log(betBody, spo)
			if (!this.checkBet('single', betBody, spo)) return
			this.sendBetting(betBody, [spo], 'fastBetting')
		},
		/**
		 * 單式投遞
		 */
		async singleBetting() {
			let betBody = _.cloneDeep(this.singleBetBody)

			if (!this.checkBet('single', betBody, this.currentSingleBet)) return

			var resIndex = await this.sendBetting(betBody, [this.currentSingleBet], 'singleBetting')
			// 投注歸0
			if (typeof resIndex == 'number' && resIndex > -1) {
				this.singleBet[resIndex].cash = 0
			}
		},
		/**
		 * 過關投遞
		 */
		async multiBetBetting() {
			let betBody = _.cloneDeep(this.multiBetBody)
			betBody.cash = this.multiBetCash

			if (!this.checkBet('multi', betBody)) return
			var res = await this.sendBetting(betBody, this.multiBet, 'multiBetBetting')
			// 投注歸0
			if (res) {
				this.multiBetCash = 0
			}
		},
		async sendBetting(betBody, bets, func = 'singleBetting') {
			// 顯示投遞中
			this.$bus.emit('show.alert', {
				type: 'mainten',
				content: this.$t('label.betSending'),
				canClose: false,
				time: 0
			})

			this.isBetting = true
			var res = await this.betSport(JSON.stringify(betBody))
			this.isBetting = false
			this.$bus.emit('hide.alert')
			if (res.code === 0) {
				let index
				if (func == 'singleBetting') {
					index = _.findIndex(this.singleBet, ['isChecked', true])
				}
				this.onGetBetList()
				this.cnacelChecked(bets)
				this.updateSportQuota()
				this.$bus.emit('show.alert', {
					type: 'html',
					content: `${BetCodeConf[res.code]} <br>` + this.$t('alert.pls-check-bet-detail')
				})
				// 返回值把金額歸0
				return index
			} else if ([400003, 400053, 400054, 400055].indexOf(res.code) > -1 && func == 'singleBetting') {
				this.$bus.emit('hide.alert')
				var sSpo = bets[0]
				var setRes = await this.getFavorites({ set_guid: [sSpo.set_guid] })
				if (setRes.code === 0) {
					var cSep = _.find(this.proccessSeps(setRes.data.data[0].plays), {
						sep_guid: sSpo.sep_guid
					})
					if (cSep) {
						var cSpo = _.find(cSep.odds, { spo_guid: sSpo.spo_guid })

						if (cSpo) {
							var sSpyF = SpyFactory.createObj(sSpo.spo_spy_code)
							sSpyF.data = {
								handicapStmCode: sSpo.handicapStmCode,
								fraction: sSpo.currentHandicap.fraction,
								percent: sSpo.currentHandicap.percent
							}
							var cSpyF = SpyFactory.createObj(cSpo.spo_spy_code)
							cSpyF.data = {
								handicapStmCode: cSpo.handicapStmCode,
								fraction: cSpo.currentHandicap.fraction,
								percent: cSpo.currentHandicap.percent
							}

							var handicapHtml = cSpyF.isShowHandicap()
								? `盤口: ${this.$t(sSpyF.getHandicapSpoName())} ${sSpyF.getHandicap()} -> 
									<span class="c_red">
										${this.$t(cSpyF.getHandicapSpoName())} ${cSpyF.getHandicap()}
									</span><br>`
								: ''
							var resReBet = await this.$swal({
								title: '資訊異動，是否需要重新下注',
								html: `
									${handicapHtml}
									賠率: ${sSpo.spo_odds} -> <span class="c_red">${cSpo.spo_odds}</span>
								`,
								type: 'warning',
								showCancelButton: true,
								confirmButtonText: '是',
								cancelButtonText: '否'
							}).catch(err => { })
							if (resReBet) {
								cSpo.cash = betBody.cash
								this.$store.commit(BetType.onChange, cSpo) // remove spo
								this.$store.commit(BetType.onChange, cSpo) // add spo and bet again
								this[func]()
							}
						}
					}
				}
			} else if (res.status === 200) {
				// 找不到統一顯示下注失敗
				this.$bus.emit('show.alert', {
					type: 'html',
					content: (BetCodeConf[res.code] ? BetCodeConf[res.code] : BetCodeConf['400001']) + ` (${res.code})`
				})
			} else {
				// 網路不穩 請至投注明細確認注單
				this.$bus.emit('show.alert', {
					type: 'html',
					content: this.$t('alert.net-not-stable-pls-check-bet-detail')
				})
			}
		},
		cnacelChecked(bets) {
			_.forEach(bets, bet => {
				// this.$store.commit(BetType.onChange, bet)
				bet.isChecked = false
			})
		},
		singleResetChecked(index) {
			_.forEach(this.singleBet, (bet, i) => {
				if (index != i) {
					bet.isChecked = false
				}
			})
		},
		filterSameSet(index) {
			const set_guid = this.multiBet[index].set_guid
			if (_.filter(this.multiBet, { set_guid: set_guid }).length > 1) {
				_.forEach(this.multiBet, bet => {
					if (bet.set_guid == set_guid) {
						bet.isChecked = false
					}
				})
				this.multiBet[index].isChecked = true
			}
		},

		async onGetBetList() {
			this.isRequest = true
			var res = await this.getBetList()
			this.isRequest = false
			this.betList = res.data
		},

		getStmListByStms(stms) {
			return _.map(stms, _.property('stm_code'))
		},
		getBetListTitle(data) {
			if (!data) return
			var spyF = SpyFactory.createObj(data.spy_code)
			spyF.data = data
			return spyF.getBetListTitle()
		},
		// no use
		/**
		 * 單式可贏金額異動
		 * @param {*} e event
		 */
		chgSingleWinMoney(e) {
			const spo = _.filter(this.singleBet, 'isChecked')[0]
			let money = parseFloat(e.target.value)
			money /= parseFloat(spo.spo_odds)
			spo.cash = parseInt(money)
		},
		// no use
		/**
		 * 過關可贏金額異動
		 * 簡易算式：m = t/(pz -1)
		 * m = 投注金額
		 * t = 可贏金額
		 * pz = 賠率總乘數
		 * @param {*} e event
		 */
		chgMultiWinMoney(e) {
			const spos = _.filter(this.multiBet, 'isChecked')
			let money = parseFloat(e.target.value)
			let dividend = 1
			_.forEach(spos, spo => {
				dividend *= math.eval(`1 + ${spo.spo_odds} + ${spo.complex_odds_diff}`)
			})
			this.multiBetCash = parseInt(money / (dividend - 1))
		},
		/**
		 * 可贏金額計算
		 */
		countWinMoney(money, odds) {
			return parseInt(money * odds - money)
		},
		/**
		 * 投注明細 - 可贏金額
		 * @param {*} detail
		 */
		getWinMoney(detail) {
			let totalOdds = 1
			_.forEach(detail.targets_info, target => {
				totalOdds *= math.eval(`1 + ${target.bet_info.odds}`)
			})
			return this.countWinMoney(detail.cash, totalOdds)
		},
		clearBetList() {
			_.forEach(_.cloneDeep(this.singleBet), bet => {
				this.onBetChange(bet)
			})
		}
	},
	computed: {
		...mapState({
			account: state => state.Login.userInfo.account,

			favoritesLen(state) {
				return this.isLogin ? state.Favorite.datas.length : 0
			},

			singleBet: state => state.Bet.singleDatas,
			multiBet: state => state.Bet.multiDatas,

			currencys: state => state.Login.currencys,

			fastMoney: state => state.Bet.fastMoney
		}),
		...mapGetters({
			currentSingleBet: BetType.currentSingleBet,
			singleBetBody: BetType.singleBetBody,
			multiBetBody: BetType.multiBetBody,
			minBet: BetType.minBet,
			singleMaxBet: BetType.singleMaxBet,
			singleMaxTeam: BetType.singleMaxTeam,
			multiMaxBet: BetType.multiMaxBet,
			multiMaxTeam: BetType.multiMaxTeam,
			multiParlayMax: BetType.multiParlayMax,
			multiWinMax: BetType.multiWinMax,
			gameSetting: LoginType.gameSetting
		}),
		/**
		 * 單式可贏金額計算
		 */
		singleWinMoney() {
			const spo = _.filter(this.singleBet, 'isChecked')[0]
			return spo ? this.countWinMoney(spo.cash, math.eval(`1 + ${spo.spo_odds}`)) : 0
		},
		/**
		 * 過關可贏金額
		 * 算式 t = m(1+p1)(1+p2)(1+p3)... -m ，以此類推，此以三個投注目標為例
		 */
		multiWinMoney() {
			const spos = _.filter(this.multiBet, 'isChecked')
			if (spos.length) {
				let totalOdds = 1
				_.forEach(spos, spo => {
					totalOdds *= math.eval(`1 + ${spo.spo_odds} + ${spo.complex_odds_diff}`)
				})
				return this.countWinMoney(this.multiBetCash, totalOdds)
			}
			return 0
		}
	}
}
