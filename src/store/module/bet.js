import { LoginType, getGameSettingKey } from './login'
import swal from 'sweetalert2'
import Vue from 'vue'

const type = {
	setFastMoney: 'Bet/setFastMoney',
	betFasterChange: 'Bet/betFasterChange',
	onChange: 'Bet/onBetChange',
	spoGuids: 'Bet/spoGuids',
	currentSingleBet: 'Bet/currentSingleBet',
	multiBetBody: 'Bet/multiBetBody',
	singleBetBody: 'Bet/singleBetBody',
	minBet: 'Bet/minBet',
	singleMaxBet: 'Bet/singleMaxBet',
	singleMaxTeam: 'Bet/singleMaxTeam',
	multiMaxBet: 'Bet/multiMaxBet',
	multiMaxTeam: 'Bet/multiMaxTeam',
	multiParlayMax: 'Bet/multiParlayMax',
	multiWinMax: 'Bet/multiWinMax'
}

export { type as BetType }

export default {
	namespaced: true,
	state: {
		multiDatas: [],
		singleDatas: [],
		isFaster: false,
		fastMoney: ''
	},
	mutations: {
		setFastMoney(state, val) {
			state.fastMoney = val
		},
		betFasterChange(state) {
			state.isFaster = !state.isFaster
			if (state.isFaster) {
				swal({
					title: Vue.i18n.translate('alert.sysMsg'),
					html: Vue.i18n.translate('alert.betFaster'),
					type: 'warning',
				})
			}
		},
		onBetChange(state, spo) {
			let spo_index = _.findIndex(state.singleDatas, { spo_guid: spo.spo_guid })
			if (spo_index > -1) {
				// remove
				// single part
				state.singleDatas.splice(_.findIndex(state.singleDatas, { spo_guid: spo.spo_guid }), 1)

				// multi part
				spo_index = _.findIndex(state.multiDatas, { spo_guid: spo.spo_guid })
				if (spo_index > -1) {
					state.multiDatas.splice(spo_index, 1)
				}
			} else {
				// add
				// single part
				let tmp = []
				let tmp_spo = _.cloneDeep(spo)
				tmp_spo.cash = tmp_spo.cash ? tmp_spo.cash : 0
				tmp = _.concat([tmp_spo], state.singleDatas)
				_.forEach(tmp, (spo, i) => {
					if (!_.isEqual(spo, tmp_spo)) {
						spo.isChecked = false
					}
				})
				state.singleDatas = _.cloneDeep(tmp)

				// multi part
				tmp = []
				const { set_guid, sep_complex } = spo
				if (sep_complex) {
					tmp = _.concat(state.multiDatas, _.cloneDeep(spo))
					_.forEach(tmp, (spo, i) => {
						if (spo.set_guid == set_guid) {
							spo.isChecked = false
						}
					})
					tmp[tmp.length - 1].isChecked = true
					state.multiDatas = _.orderBy(_.cloneDeep(tmp), 'set_guid')
				}
			}
		}
	},
	getters: {
		spoGuids: state => {
			// 目前選取的投注目標
			return _.map(state.singleDatas, _.property('spo_guid')) // 陣列物件底下的某個屬性匯集成陣列
		},
		currentSingleBet: state => _.find(state.singleDatas, ['isChecked', true]),
		multiBetBody: state => {
			return {
				cash: 0,
				targets: getTargets(state.multiDatas, 'multi')
			}
		},
		singleBetBody: (state, getters) => {
			const spo = getters.currentSingleBet
			const cash = spo && spo.cash ? spo.cash : 0
			return {
				cash,
				targets: getTargets([spo], 'single')
			}
		},
		minBet: (state, getters, rootState) => {
			return rootState.Login.userInfo &&
				rootState.Login.userInfo.account &&
				rootState.Login.userInfo.account.p43_sport_account_config
				? rootState.Login.userInfo.account.p43_sport_account_config.p43_sac_min_bet
				: 0
		},
		singleMaxBet: (state, getters, rootState, rootGetters) => {
			return getSingleMax(state, getters, rootState, rootGetters, 'p43_gmac_config_bet_max')
		},
		singleMaxTeam: (state, getters, rootState, rootGetters) => {
			return getSingleMax(state, getters, rootState, rootGetters, 'p43_gmac_config_team_max')
		},
		multiMaxBet: (state, getters, rootState) => {
			var login = rootState.Login
			if (login.cashGameSetting.parlay_templet) {
				return login.cashGameSetting.parlay_templet.p100_spt_parlay_bet_max
			} else if (
				login.userInfo &&
				login.userInfo.account &&
				login.userInfo.account.p43_sport_account_config &&
				login.userInfo.account.p43_sport_account_config.p43_sac_parlay_bet_max
			) {
				return login.userInfo.account.p43_sport_account_config.p43_sac_parlay_bet_max
			} else {
				return 0
			}
		},
		multiMaxTeam: (state, getters, rootState) => {
			var login = rootState.Login
			if (login.cashGameSetting.parlay_templet) {
				return login.cashGameSetting.parlay_templet.p100_spt_parlay_bet_team_max
			} else if (
				login.userInfo &&
				login.userInfo.account &&
				login.userInfo.account.p43_sport_account_config &&
				login.userInfo.account.p43_sport_account_config.p43_sac_parlay_team_max
			) {
				return login.userInfo.account.p43_sport_account_config.p43_sac_parlay_team_max
			} else {
				return 0
			}
		},
		multiParlayMax: (state, getters, rootState) => {
			// 過關數
			var login = rootState.Login
			if (login.cashGameSetting.parlay_templet) {
				return login.cashGameSetting.parlay_templet.p100_spt_parlay_max
			} else if (
				login.userInfo &&
				login.userInfo.account &&
				login.userInfo.account.p43_sport_account_config &&
				login.userInfo.account.p43_sport_account_config.p43_sac_parlay_max
			) {
				return login.userInfo.account.p43_sport_account_config.p43_sac_parlay_max
			} else {
				return 0
			}
		},
		multiWinMax: (state, getters, rootState) => {
			// 最大派彩金額
			var login = rootState.Login
			if (login.cashGameSetting.parlay_templet) {
				return login.cashGameSetting.parlay_templet.p100_spt_parlay_win_max
			} else if (
				login.userInfo &&
				login.userInfo.account &&
				login.userInfo.account.p43_sport_account_config &&
				login.userInfo.account.p43_sport_account_config.p43_sac_parlay_win_max
			) {
				return login.userInfo.account.p43_sport_account_config.p43_sac_parlay_win_max
			} else {
				return 0
			}
		}
	}
}

function getSingleMax(state, getters, rootState, rootGetters, attr) {
	const spo = _.find(state.singleDatas, ['isChecked', true])
	if (spo && spo.isChecked) {
		return getBallSetting(spo, rootState, rootGetters, attr)
	}
	return 0
}

export function getBallSetting(spo, rootState, rootGetters, attr) {
	let cash = 0,
		sle_scale = -1,
		sbl_id = -1,
		spy_id = -1,
		sge_id = -1
	sle_scale = spo.sleScale
	const sport = _.find(rootState.sports, ['sbl_guid', spo.sep_sbl_guid])
	const play = _.find(rootState.plays, ['spy_guid', spo.spo_spy_guid])
	const game = _.find(rootState.games, ['sge_guid', spo.spo_sge_guid])

	sbl_id = sport ? sport.sbl_id : -1
	spy_id = play ? play.spy_id : -1
	sge_id = game ? game.sge_id : -1
	if (sle_scale > -1 && sbl_id > -1 && spy_id > -1 && sge_id > -1) {
		const settings = rootGetters[LoginType.gameSetting],
			oth_spy_id = rootGetters.playOther.spy_id,
			oth_sge_id = rootGetters.gameOther.sge_id
		// 初始數值

		const setting = _.compact([
			// 去除 null undefined ''
			settings[getGameSettingKey({ sle_scale, sbl_id, spy_id, sge_id })],
			settings[getGameSettingKey({ sle_scale, sbl_id, spy_id, sge_id: oth_sge_id })],
			settings[getGameSettingKey({ sle_scale, sbl_id, spy_id: oth_spy_id, sge_id })],
			settings[
			getGameSettingKey({
				sle_scale,
				sbl_id,
				spy_id: oth_spy_id,
				sge_id: oth_sge_id
			})
			]
		])[0]
		if (setting) {
			cash = setting[attr]
		}
	}
	return cash
}

export function getTargets(datas, type = 'single') {
	return _.reduce(
		datas,
		(result, spo) => {
			if (spo && spo.isChecked) {
				const multiplier = spo.spo_has_handicap ? 1 : -1
				const fraction = multiplier * spo.currentHandicap.fraction
				const percentage = multiplier * spo.currentHandicap.percent
				const odds = type == 'single' ? spo.spo_odds : math.eval(`${spo.spo_odds} + ${spo.complex_odds_diff}`)

				result.push({
					play_guid: spo.spo_sep_guid, // 場玩pk ,string, require
					play_odds_guid: spo.spo_guid, // 投注目標pk ,string,require
					fraction, // 盤口主分 , int,optional
					percentage, // 盤口%數 ,int, optional
					odds // 賠率, number, require, 小數點如實送回
				})
			}
			return result
		},
		[]
	)
}
