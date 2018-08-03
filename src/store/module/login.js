import storage from '~/store'
import router from 'src/router/index'
import libLangs from 'src/langs'

import RouteConf from 'src/config/RouteConf'
import BranchType from 'src/config/BranchType'
import swal from 'sweetalert2'
import { getLeagueSettingsKey } from 'src/config/LeagueScaleConf'

import Vue from 'vue'
import { createApiBody } from 'lib/myLib'
const { isMobile } = config

const type = {
	loginSuccess: 'Login/loginSuccess',
	setCurrencys: 'Login/setCurrencys',
	LOGIN: 'Login/LOGIN',
	LOGOUT: 'Login/LOGOUT',
	POLLING: 'Login/POLLING',
	GET_CASH_GAME_SETTING: 'Login/GET_CASH_GAME_SETTING',
	SET_LANG: 'Login/SET_LANG',
	GET_CURRENCY: 'Login/GET_CURRENCY',
	langs: 'Login/langs',
	branchType: 'Login/branchType',
	gameSetting: 'Login/gameSetting',
	hasMemberLevel: 'Login/hasMemberLevel',
	platformAppUrl: 'Login/platformAppUrl'
}

export { type as LoginType }

export default {
	namespaced: true,
	state: {
		isLogin: false,
		userInfo: null,
		branch: null,
		branchGame: null,
		otherUrl: null,
		languages: {},
		lang: '', //storage.get('lang'),
		langOnlineVer: 0,
		currentVer: {},
		currencys: [],
		title: '',
		userPoint: {},
		cashGameSetting: {},
		webSocketToken: storage.get('webSocketToken')
	},
	mutations: {
		loginSuccess(state, userInfo) {
			state.isLogin = true
			state.userInfo = _.assign({}, state.userInfo, userInfo)
		},
		logoutSuccess(state) {
			state.isLogin = false
			state.userInfo = {}
		},
		setBranch(state, branch) {
			state.branch = branch
			if (branch) {
				// state.title = Vue.i18n.translate(branch.p32_bch_name[Vue.i18n.locale()])
				state.title = branch.p32_bch_other_data.bch_title
			}
		},
		setBranchGame(state, branchGame) {
			state.branchGame = branchGame
		},
		setOtherUrl(state, otherUrl) {
			state.otherUrl = otherUrl
		},
		setLangs(state, languages) {
			if (state.languages != languages) {
				state.languages = languages
			}
		},
		setLang(state, context) {
			storage.set('lang', context.lang)
			state.lang = context.lang
		},
		setCurrencys(state, currencys) {
			state.currencys = currencys
		},
		setLangVersion(state, ver) {
			state.langOnlineVer = ver
		},
		setCashGameSetting(state, data) {
			state.cashGameSetting = data
		},
		setWebSocketToken(state, data) {
			state.webSocketToken = data
			storage.set('webSocketToken', data)
		}
	},
	actions: {
		LOGIN: async ({ state, commit, dispatch }, payload) => {
			// 登入
			const {
				loginID: p33_ant_account,
				loginPhone: p33_ant_mobile,
				loginPwd: p33_ant_passwd,
				type: login_type
			} = payload
			var res = await Vue.callApi('doLogin', {
				p33_ant_account,
				p33_ant_mobile,
				p33_ant_passwd,
				login_type
			})
			if (res.code === 0 && res.data) {
				commit('setWebSocketToken', res.data.token)
				res = await dispatch('POLLING', { req: 'login' })
			} else {
				Vue.bus.emit('show.alert', {
					content: Vue.i18n.translate('loginError')
				})
			}
			return res
		},
		LOGOUT: async ({ state, dispatch, commit }) => {
			// 登出
			var res = (await Vue.callApi('doLogout')).data || false
			if (res) {
				commit('logoutSuccess')
				Vue.bus.emit('show.alert', {
					content: Vue.i18n.translate('logoutSuccess')
				})
			} else {
				Vue.bus.emit('show.alert', {
					content: Vue.i18n.translate('logoutError')
				})
			}
			return res
		},
		POLLING: async ({ state, commit, dispatch }, payload) => {
			// 輪詢
			var res = await Vue.callApi('polling')
			if (typeof res.data.branch == 'undefined') {
				// 被踢時會發生
				return
			}

			commit('setBranch', res.data.branch)
			commit('setLangs', res.data.languages)
			commit('setBranchGame', res.data.branch_game)

			let otherUrl = {
				video: res.data.video,
				fourm: res.data.fourm,
				service: res.data.branch.p32_bch_other_data.service_url
			}

			commit('setOtherUrl', otherUrl)

			// language start
			commit('setLangVersion', res.data.sport_language_version)
			// 直接依照後台給予的語系顯示
			// if (!storage.get('lang')) {
			commit('setLang', { lang: res.data.locale })
			Vue.i18n.set(res.data.locale)
			// storage.set('lang', res.data.locale)
			// }
			dispatch('GET_LANG')

			// account start
			if (res.data.account && _.find(res.data.account.role, { p34_role_specific: 'ROLE1' })) {
				commit('loginSuccess', {
					account: res.data.account,
					parent: res.data.parent_config_pool || []
				})
				dispatch('GET_CASH_GAME_SETTING')
				if (payload.req == 'login') {
					//alert start
					if (
						res.data.branch.p41_theme.p41_tme_code === 'CASH' &&
						!(
							res.data.account.p33_ant_profile.p33_ant_profile_lineId ||
							res.data.account.p33_ant_profile.p33_ant_profile_wechatId
						)
					) {
						swal(Vue.i18n.translate('loginSuccess')).then(result => {
							swal({
								title: '請確認',
								text: `為了確保您的權益, 建議填寫 lineID 或 wechatID, 
								日後派發獎金或獎品時, 會透過您所留下的通訊軟體通知`,
								type: 'warning',
								showCancelButton: true,
								confirmButtonColor: '#3085d6',
								cancelButtonColor: '#d33',
								confirmButtonText: '立即修改',
								cancelButtonText: '好的 知道了!'
							}).then(response => {
								if (response) {
									let routeName = isMobile ? 'cash-mobile-base-info' : 'cash-base-info'
									router.push({
										name: routeName
									})
								}
							})
						})
					} else {
						Vue.bus.emit('show.alert', {
							content: Vue.i18n.translate('loginSuccess')
						})
					}
				}
			} else {
				if (state.isLogin) {
					Vue.bus.emit('show.alert', {
						content: '閒置時間過長，或在其它主機登入，已登出'
					})
					setTimeout(() => {
						router.push(RouteConf.$platformHost())
						$('.mm-menu').remove()
					}, 2000)
				} else if (payload.req == 'login') {
					Vue.bus.emit('show.alert', {
						content: Vue.i18n.translate('loginError')
					})
				}
				commit('logoutSuccess')
				storage.remove('webSocketToken')
			}
			return res
		},
		GET_CASH_GAME_SETTING: async ({ state, commit, getters }) => {
			if (isSport && getters.branchType == BranchType.Cash) {
				const res = await Vue.callApi('getCashGameSetting')
				if (res.code === 0 && res.data.length) {
					commit('setCashGameSetting', res.data[0])
				}
			}
		},
		SET_LANG({ dispatch, commit }, context) {
			commit('setLang', context)
			dispatch('GET_LANG')
		},
		GET_LANG({ state }) {
			let lang = state.lang

			var updateLang = langObj => {
				libLangs[lang].ver = state.langOnlineVer // data.data.version //
				Vue.i18n.add(lang, _.assign({}, libLangs[lang], langObj.language))
				Vue.i18n.set('xxx') // 這樣才會刷新語系
				Vue.i18n.set(lang) // 這樣才會刷新語系
			}

			// lang = 'zh_CN' // 下載語言包用
			// 1.8 > 1.10 所以用不等於，版號也只會上升不會下降(原則上)，所以不會有降板問題
			if (libLangs[lang].ver != state.langOnlineVer) {
				var localLang = storage.get(`language_${lang}`)
				if (!localLang || localLang.version != state.langOnlineVer) {
					axios(createApiBody('get', `sportGame/language/codeMapping/${lang}`)).then(({ data }) => {
						if (data.code === 0) {
							storage.set(`language_${lang}`, data.data)
							updateLang(data.data)
						}
					})
				} else {
					updateLang(localLang)
				}
			} else {
				Vue.i18n.set(lang)
			}
		},
		GET_CURRENCY: async ({ commit, dispatch }) => {
			var res = await Vue.callApi('getChips')
			if (res.code === 0 && res.data.chils_list) {
				let datas = []
				_.forEach(res.data.chils_list, (chips, index) => {
					datas.push({
						p33_amc_denomination: chips.p33_amc_denomination,
						p33_amc_name: chips.p33_amc_name,
						index,
						isExists: true
					})
				})
				commit('setCurrencys', datas)
			}
		}
	},
	getters: {
		langs: state => {
			let res = []
			if (state.lang) {
				_.forEach(state.languages, data => {
					let o_lang = data.p39_les_name // JSON.parse(data.p39_les_name)
					const switched = libLangs.switch(data.p39_les_code)
					res.push({
						classFlag: libLangs.switch(data.p39_les_code).classFlag,
						content: o_lang[data.p39_les_code],
						langcode: data.p39_les_code
					}) // o_lang[state.lang]
				})
			}
			return res
		},
		branchType: state => (state.branch ? BranchType[state.branch.p32_bch_type] : ''),
		gameSetting: (state, getters, rootState) => {
			// let res = []
			let tmp = {}
			if (isSport) {
				if (getters.branchType == BranchType.Credit && state.userInfo && state.userInfo.parent) {
					// 由最上層開始往回蓋
					// _.mapKeys加上key值，讓該物件可以被辨識
					if (!rootState.plays.length) return
					var spysIndex = _.keyBy(rootState.plays, 'spy_code')
					_.forEach(_.reverse(_.cloneDeep(state.userInfo.parent)), parent => {
						_.forEach(getLeagueSettingsKey(), (leagueID, leagueKey) => {
							_.forEach(parent[`p43_game_mode_account_config_${leagueKey}`], config => {
								var newConf = _.cloneDeep(config)
								newConf.p43_gmac_league = leagueID
								setConfigCredit(tmp, newConf, spysIndex)
								// setConfig(tmp, config)
							})
						})
					})
					// 最後蓋自己(如果有設定的話)
					_.forEach(getLeagueSettingsKey(), (leagueID, leagueKey) => {
						_.forEach(state.userInfo.account[`p43_game_mode_account_config_${leagueKey}`], config => {
							var newConf = _.cloneDeep(config)
							newConf.p43_gmac_league = leagueID
							setConfigCredit(tmp, newConf, spysIndex)
							// setConfig(tmp, config)
						})
					})
					// 把key直拿掉
					// res = _map(tmp)
					// _.forEach(tmp, config => {
					// 	res.push(config)
					// })
				} else if (getters.branchType == BranchType.Cash && state.cashGameSetting) {
					_.forEach(state.cashGameSetting.mode_templet, config => {
						var newConf = _.reduce(
							config,
							(result, value, key) => {
								result[
									key.replace('p100_smt', 'p43_gmac').replace('p43_gmac_gmac', 'p43_gmac_config')
								] = value
								return result
							},
							{}
						)
						newConf['p43_gmac_config_commission'] = state.cashGameSetting.SPORT_commission
						setConfig(tmp, newConf)
					})
				}
			}
			return tmp
		},
		hasMemberLevel: state => state.userInfo && _.keys(state.userInfo.memberLevel).length,
		platformAppUrl: state => {
			let prop = config.isAndroid ? 'android_url' : config.isIOS ? 'ios_url' : ''
			return state.branch ? state.branch.p32_bch_other_data[prop] : ''
		}
	}
}

const tLayout = location.pathname
	.split('/')
	.slice(0, 2)
	.join('/')
const isSport = [RouteConf.sSPORT, RouteConf.sSPORT_MOBILE].indexOf(tLayout) > -1

var setConfig = (tmp, config) => {
	tmp[
		getGameSettingKey({
			sle_scale: config.p43_gmac_league,
			sbl_id: config.p43_gmac_sbl_id,
			spy_id: config.p43_gmac_spy_id,
			sge_id: config.p43_gmac_sge_id
		})
	] = config
}

export function getGameSettingKey(data) {
	return `${data.sle_scale}-${data.sbl_id}-${data.spy_id}-${data.sge_id}`
}

var setConfigCredit = (tmp, config, spysIndex) => {
	if (!config) return
	_.forEach(['spread', 'total', 'oddeven', 'capot', 'advantage', 'PLAY_OTHER'], spy_code => {
		if (!spysIndex[spy_code]) return
		let spy_id = spysIndex[spy_code].spy_id,
			key = getGameSettingKey({
				sle_scale: config.p43_gmac_league,
				sbl_id: config.p43_gmac_sbl_id,
				spy_id,
				sge_id: config.p43_gmac_sge_id
			}),
			targetConfig = {
				p43_gmac_config_bet_max: config[`p43_gmac_config_bet_max_${spy_code}`],
				p43_gmac_config_commission: config[`p43_gmac_config_commission_${spy_code}`],
				p43_gmac_config_team_max: config[`p43_gmac_config_team_max_${spy_code}`],
				p43_gmac_league: config.p43_gmac_league,
				p43_gmac_sbl_id: config.p43_gmac_sbl_id,
				p43_gmac_sge_id: config.p43_gmac_sge_id,
				p43_gmac_spy_id: spy_id
			}
		tmp[key] = targetConfig
	})
}
