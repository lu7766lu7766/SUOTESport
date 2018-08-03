import { BetType } from 'src/store/module/bet'
import { mapState, mapGetters } from 'vuex'
import SpyFactory from 'lib/SpyFactory'
import mixins from 'src/mixins'
import { SportsType } from 'src/store/module/sports'

export default {
	mixins: [mixins],
	methods: {
		getSleCode(sle_guid) {
			// 聯盟code
			const sle = this.getSleByGuid(sle_guid)
			return sle ? sle.sle_code : ''
		},
		getSpyCode(spy_guid) {
			// 玩法code
			const spy = this.getSpyByGuid(spy_guid)
			return spy ? spy.spy_code : ''
		},
		getSgeCode(sge_guid) {
			// 場次code
			const sge = this.getSgeByGuid(sge_guid)
			return sge ? sge.sge_code : ''
		},
		getSblCode(sbl_guid) {
			// 球類code
			const sbl = this.getSblByGuid(sbl_guid)
			return sbl ? sbl.sbl_code : ''
		},
		getScyCode(scy_guid) {
			// 球種code
			const scy = this.getScyByGuid(scy_guid)
			return scy ? scy.scy_code : ''
		},
		getScyCodeBySblSra(sblGuid, sraGuid) {
			// 球種code by sblGuid & sraGuid
			var scy = _.find(this.categorys, {
				scy_sbl_guid: sblGuid,
				scy_sra_guid: sraGuid
			})
			return scy ? scy.scy_code : ''
		},
		getSraCode(sra_guid) {
			// 地區code
			const sra = this.getSraByGuid(sra_guid)
			return sra ? sra.sra_code : ''
		},
		getStmCode(stms, odd) {
			// 隊伍code
			const stm = this.getStmByGuid(stms, odd.spo_stm_guid)
			return stm
				? stm.stm_code
				: this.isHasToTransTeamName(odd.spo_distinguish) ? odd.spo_distinguish : odd.fightStmsName
		},
		getDisplayCode(odd) {
			// 隊伍code
			const stm = this.getStmByGuid(odd.teams, odd.spo_stm_guid)
			return stm
				? stm.stm_code
				: this.isHasToTransTeamName(odd.spo_distinguish)
					? odd.spo_distinguish
					: this.getFightStmsName(odd.teams)
		},
		getStmCodeByOdd(odd) {
			let stm = this.getStmByGuid(odd.teams, odd.spo_stm_guid)
			let res = ''
			if (stm) {
				res = stm.stm_code
			} else {
				stm = _.find(odd.teams, { stm_sort: odd.sort })
				res = stm ? stm.stm_code : odd.spo_distinguish
			}
			return res
		},
		isHasToTransTeamName(code) {
			return SpyFactory.createObj().hasToTransTeamNameList.indexOf(code) > -1
		},

		getFightStmsName(stms, middle = ' V.S ') {
			let res = []
			_.forEach(stms, stm => {
				res.push(this.$t(stm.stm_code))
			})
			return res.length ? res.join(middle) : 'X'
		},

		//
		getSleByGuid(sle_guid) {
			// 聯盟物件
			return _.find(this.$store.state.leagues, ['sle_guid', sle_guid])
		},
		getSpyByGuid(spy_guid) {
			// 玩法物件
			return _.find(this.$store.state.plays, ['spy_guid', spy_guid])
		},
		getSgeByGuid(sge_guid) {
			// 場次物件
			return _.find(this.$store.state.games, ['sge_guid', sge_guid])
		},
		getSblByGuid(sbl_guid) {
			// 球類物件
			return _.find(this.$store.state.sports, ['sbl_guid', sbl_guid])
		},
		getStmByGuid(stms, stm_guid) {
			return _.find(stms, ['stm_guid', stm_guid])
		},
		getScyByGuid(scy_guid) {
			return _.find(this.categorys, ['scy_guid', scy_guid])
		},
		getSraByGuid(sra_guid) {
			// 地區物件
			return _.find(this.areas, ['sra_guid', sra_guid])
		},
		//
		getSpyById(spy_id) {
			return _.find(this.$store.state.plays, ['spy_id', spy_id])
		},
		getSpyCodeById(spy_id) {
			// 玩法code
			const spy = this.getSpyById(spy_id)
			return spy ? spy.spy_code : ''
		},
		//
		getSgeById(sge_id) {
			return _.find(this.$store.state.games, ['sge_id', sge_id])
		},
		getSgeCodeById(sge_id) {
			// 場次code
			const sge = this.getSgeById(sge_id)
			return sge ? sge.sge_code : ''
		},
		getSleScaleByGuid(sle_guid) {
			const sle = this.getSleByGuid(sle_guid)
			return sle ? sle.sle_scale : -1
		},
		//////////////////////////////////////////////////////////////////////

		// 寫入下注
		onBetChange(spo, e) {
			if (e) {
				e.stopPropagation()
				e.preventDefault()
			}
			this.$store.commit(BetType.onChange, spo)
		},

		getAddDayTime(addDay) {
			return this.$moment()
				.AddDay(addDay)
				.Format('Y-m-d')
				.GetTime()
		},

		getHandicapStmCode(teams, odds) {
			const odd = _.find(odds, { spo_has_handicap: 1 })
			const stm = this.getStmByGuid(teams, odd ? odd.spo_stm_guid : '')
			return stm ? stm.stm_code : ''
		},

		/**
		 * 配合spo_has_handicap才可以用單一投注目標來取得正確盤口
		 * @param {投注目標:Object} odd
		 */
		getHandicap(odd) {
			return this.setHandicap([odd]).getHandicap()
		},
		/**
		 * 因為進入bet-box後，只剩單一投注目標，因此透過這函數把正確盤口寫進每個投注目標內
		 * @param {投注目標s:Array} odds
		 */
		getCurrentHandicap(odds) {
			const { fraction, percent } = this.setHandicap(odds)
			return { fraction, percent }
		},
		/**
		 * 把投注目標寫入factory來取得盤吼
		 * @param {投注目標s:Array} odds
		 */
		setHandicap(odds) {
			let spyF = SpyFactory.createObj(this.getSpyCode(odds[0].spo_spy_guid))
			spyF.spos = _.reduce(
				odds,
				(result, odd) => {
					result.push({
						fraction: odd.spo_fraction,
						percent: odd.spo_percentage
					})
					return result
				},
				[]
			)
			spyF.isSoccer = odds[0].isSoccer
			return spyF
		},

		/**
		 * 處理取得賽玩資料
		 * @param {*} seps
		 */
		proccessSeps(seps) {
			_.forEach(seps, sep => {
				sep.sep_start_date = this.$moment(parseInt(sep.sep_start_time)).Format('Y-m-d')
				sep.sep_info =
					sep.sep_info && typeof sep.sep_info == 'string' ? $.parseJSON(sep.sep_info) : sep.sep_info
				sep.p46_sad_live_origin_data =
					sep.p46_sad_live_origin_data && typeof sep.p46_sad_live_origin_data != 'object'
						? $.parseJSON(sep.p46_sad_live_origin_data)
						: sep.p46_sad_live_origin_data
				sep.sep_set_detail_content =
					sep.sep_set_detail_content && typeof sep.sep_set_detail_content == 'string'
						? $.parseJSON(sep.sep_set_detail_content)
						: sep.sep_set_detail_content

				const handicapStmCode = this.getHandicapStmCode(sep.sep_info.team, sep.odds)
				const handicap = this.getCurrentHandicap(sep.odds)
				const isSoccer = this.isSoccerByScyCode(sep.sep_info.category.code)

				_.forEach(sep.odds, odd => {
					odd.isSoccer = isSoccer
					odd.spo_odds = this.$currency(odd.spo_odds, 3)
					odd.teams = sep.sep_info.team // bet元件需要隊伍名稱
					odd.handicapStmCode = handicapStmCode // bet元件需要盤口隊伍名稱
					odd.currentHandicap = handicap // 讓分隊的盤口
					odd.set_guid = sep.sep_set_guid // bet元件需要賽事guid，過關要過濾
					odd.sep_guid = sep.sep_guid // bet元件需要賽玩guid，更新盤口後尋找原始目標用
					odd.sep_sbl_guid = sep.sep_sbl_guid // bet元件需要球類guid查賽事設定用
					odd.complex_odds_diff = sep.sep_complex_odds_diff // 減水，過關需要扣掉的賠率
					odd.sep_single_bet_limit = sep.sep_single_bet_limit // 場次單注上限
					odd.sep_complex = sep.sep_complex // 能否進到過關
					odd.isChecked = true
					odd.sleScale = this.getSleScaleByGuid(sep.sep_sle_guid)
					const stm = this.getStmByGuid(odd.teams, odd.spo_stm_guid)
					const spy = this.getSpyByGuid(odd.spo_spy_guid)
					if (spy) {
						if (spy.spy_code == 'total') {
							odd.sort = odd.spo_distinguish == 'over' ? 1 : 0 // 大在前，小在後
						} else if (spy.spy_code == 'oddeven') {
							odd.sort = odd.spo_distinguish == 'odd' ? 1 : 0 // 單在前，雙在後
						} else {
							odd.sort = stm ? stm.stm_sort : 0 // 客在前主在後
						}
						// 足球排序反過來，特殊玩法例外
						if (isSoccer && (spy.spy_code == 'total' || spy.spy_code == 'oddeven')) {
							odd.sort = Math.abs(odd.sort - 1)
						}
					}
					odd.sep_scy_guid = sep.sep_scy_guid
				})
				if (isSoccer) {
					// 足球改正序排列
					sep.odds = _.orderBy(sep.odds, 'sort') // 主前客後
				} else {
					sep.odds = _.orderBy(sep.odds, 'sort', 'desc')
				}
			})
			seps = this.getCorrectOrderSeps(seps)
			return seps
		},
		/**
		 * 判斷是否是足球
		 * @param {*球種code} scy_code
		 */
		isSoccerByScyCode(scy_code) {
			return (
				this.getSblCode(this.scyCodeIndex[scy_code] ? this.scyCodeIndex[scy_code].scy_sbl_guid : '') === 'SOCR'
			)
		},
		getSocrHandicap(handicap) {
			const { fraction, percent } = handicap
			switch (percent) {
				case 50:
					return parseInt(fraction) - 1 + `.5/${fraction}`
					break
				case 0:
					return fraction + ''
					break
				case -50:
					return `${fraction}/${fraction}.5`
					break
				case -100:
					return `${fraction}.5`
					break
			}
		},
		getCorrectOrderList(prop, list) {
			return this[prop] ? _.pullAll(_.cloneDeep(this[prop]), _.pullAll(_.cloneDeep(this[prop]), list)) : list
		},
		getCorrectOrderSeps(seps) {
			return _.orderBy(seps, [
				sep => this.gameGuidList.indexOf(sep.sep_sge_guid), // 先依場次
				sep => this.playGuidList.indexOf(sep.sep_spy_guid) // 再依玩法
			])
		},
		/**
		 * 取得正確隊伍排序
		 * @param {*} setData
		 */
		getCTeamOrder(setData) {
			const isSoccer = this.isSoccerByScyCode(this.getScyCode(setData.set_scy_guid))
			var res = []
			if (isSoccer) {
				// 足球改正序排列
				res = _.orderBy(setData.set_teams_info, 'stm_sort') // 主前客後
			} else {
				res = _.orderBy(setData.set_teams_info, 'stm_sort', 'desc')
			}
			return res
		}
	},
	computed: {
		...mapState({
			sports: 'sports',
			plays: 'plays',
			games: 'games',
			areas: 'areas',

			isLive: state => state.Sports.isLive,
			cSgeCodeList: state => state.Sports.cSgeCodeList
		}),
		...mapGetters({
			playCodeList: 'playCodeList',
			gameCodeList: 'gameCodeList',
			playGuidList: 'playGuidList',
			gameGuidList: 'gameGuidList',
			scyCodeIndex: 'scyCodeIndex',
			scyGuidIndex: 'scyGuidIndex',
			sblGuidIndex: 'sblGuidIndex',
			spyCodeIndex: 'spyCodeIndex',
			sgeCodeIndex: 'sgeCodeIndex',
			showSgeCodeList: SportsType.showSgeCodeList
		})
	}
}
