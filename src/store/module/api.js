import { createApiBody } from 'lib/myLib'
import Vue from 'vue'
import { b64DecodeUnicode } from 'lib/base64'

export default {
	state: {
		isLoading: false,
		loadingAPIs: {}
	},
	getters: {
		loadingAPIs: state => state.loadingAPIs
	},
	mutations: {
		addLoadingApi(state, uri) {
			state.loadingAPIs[uri] = state.loadingAPIs[uri] ? state.loadingAPIs[uri] + 1 : 1
			state.isLoading = true // for page // no use now
			document.body.style.cursor = 'wait' // for web
			Vue.bus.emit('show.loading') // for mobile
		},
		removeLoadingApi(state, uri) {
			if (!--state.loadingAPIs[uri]) {
				state.loadingAPIs = _.omit(state.loadingAPIs, uri)
			}
			if (_.keys(state.loadingAPIs).length === 0) {
				state.isLoading = false
				document.body.style.cursor = 'auto'
				Vue.bus.emit('close.loading')
			}
		}
	},
	actions: {
		// getBasic: async (store) => await apiInit(store, 'get', 'sportGame/baseElement/getBaseElement' ) // for service
		// 基本物件
		getSport: async store =>
			await apiInit(
				store,
				'get',
				'sportForward/forward/getSport',
				{},
				{ stack: false, parse: false, header: { 'Content-Type': 'application/x-www-form-urlencoded' } }
			),
		getGamePlay: async store =>
			await apiInit(
				store,
				'get',
				'sportForward/forward/getGamePlay',
				{},
				{ stack: false, parse: false, header: { 'Content-Type': 'application/x-www-form-urlencoded' } }
			),
		getCategory: async store =>
			await apiInit(store, 'get', 'sportForward/forward/allCategory', {}, { stack: false, parse: false }),
		getLeagueFilter: async (store, data) => await apiInit(store, 'post', 'sportForward/forward/filterLeague', data),
		getLeagueByScale: async (store, data) => {
			var res = await apiInit(store, 'post', 'sportForward/forward/getLeagueByScale', data, { parse: false })
			return res
		},

		// 自訂籌碼
		getChips: async store => await apiInit(store, 'get', 'account/chips/edit'),
		setChips: async (store, data) => await apiInit(store, 'post', 'account/chips/do-edit', data),

		// 賽事範本(現金的賽事設定)
		getCashGameSetting: async store =>
			await apiInit(store, 'get', 'game-templet/sport-templet/my-sport-templet', {}, { stack: false, parse: false }),
		// 投注明細 投注總表
		getBetDetailReport: async (store, data) =>
			await apiInit(store, 'post', 'sportOrder/forward/getTotalTableForOrder	', data),
		// 投注明細 platform
		getBetDetail: async (store, data) => await apiInit(store, 'post', 'sportOrder/forward/getList', data),
		getBetDetailTotal: async (store, data) => await apiInit(store, 'post', 'sportOrder/forward/listTotal', data),
		getBetDetailGames: async (store, data) => await apiInit(store, 'post', 'sportOrder/forward/getBranchGames', data),
		// 運彩歷史帳務 group
		getHisstoryAccountGroup: async (store, data) =>
			await apiInit(store, 'post', 'sportOrder/forward/historyOrderListTotal', data),
		// 運彩歷史帳務 list
		getHisstoryAccountList: async (store, data) =>
			await apiInit(store, 'post', 'sportOrder/forward/getHistoryOrderList', data),
		// 運彩投注明細 group
		getBetDetailGroup: async (store, data) =>
			await apiInit(store, 'post', 'sportOrder/forward/getListOrderTotalForSport', data),
		// 運彩投注明細 list
		getBetDetailList: async (store, data) =>
			await apiInit(store, 'post', 'sportOrder/forward/getListOrderForSport', data),

		// bet 運彩投注
		betSport: async (store, body) => await apiInit(store, 'post', 'sportOrder/forward/bet', body),
		// 取得運彩投注列表
		getBetList: async store => await apiInit(store, 'get', 'sportOrder/forward/recentList'),

		//login & logout
		doLogin: async (store, data) => await apiInit(store, 'post', 'account/common/do-login', data),
		doLogout: async store => await apiInit(store, 'get', 'account/common/do-logout'),

		// polling
		polling: async store => {
			var res = await apiInit(store, 'get', 'bet-polling/common/front-end', {}, { stack: false, parse: false })
			if (res.code === 0) {
				res.data.branch.p32_bch_name = $.parseJSON(res.data.branch.p32_bch_name)
				var account = res.data.account
				if (account) {
					account.p33_ant_profile = $.parseJSON(account.p33_ant_profile)
				}
			}
			return res
		},
		checkSportLogin: async (store, data) =>
			await apiInit(store, 'post', 'account/external-Common/enterSport', data, { stack: false }),
		// 取得主錢包點數
		getQuota: async store => await apiInit(store, 'get', 'sportTrade/forward/quota', {}, { stack: false }),
		// 取得運彩點數
		getSportQuota: async store => await apiInit(store, 'get', 'sportTrade/forward/sportQuota', {}, { stack: false }),

		// 點數歷程
		getPointHistoryOption: async store => await apiInit(store, 'get', 'sportTrade/forward/pointsHistoryOptions'),
		getPointHistory: async (store, data) => await apiInit(store, 'post', 'sportTrade/forward/pointsHistory', data),
		getPointHistoryTotal: async (store, data) =>
			await apiInit(store, 'post', 'sportTrade/forward/pointsHistoryTotal', data),

		// news
		getNewsTags: async store =>
			await apiInit(store, 'post', 'BetAnnounce/forward/tagList', {
				status: 1
			}), // atg_status
		getSportNewsCategory: async store =>
			await apiInit(store, 'post', 'BetAnnounce/forward/sportNewGuid', {
				status: 1
			}),
		getNewsCategorys: async (store, data) => await apiInit(store, 'post', 'BetAnnounce/forward/categoryList', data), //'acy_status'
		getNewsContent: async (store, data) => {
			data = _.merge(data, {
				sort: 'desc',
				status: 1,
				current_time: Date().GetTime(),
				act_for_member: 1
			})
			var res = await apiInit(store, 'post', 'BetAnnounce/forward/contentList', data)
			if (res.code === 0) {
				_.forEach(res.data.data, news => {
					_.forEach(news.act_content, (content, lang) => {
						news.act_content[lang] = b64DecodeUnicode(content)
					})
				})
			}
			return res
		},
		getNewsIndex: async (store, data) => await apiInit(store, 'post', 'BetAnnounce/forward/topFive', data),

		// promotions
		getPromotions: async (store, data) => await apiInit(store, 'post', 'promotions/forward/getList', data),
		getPromotionDetail: async (store, data) => {
			var res = await apiInit(store, 'post', 'promotions/forward/getSinglePromotion', data)
			if (res.code === 0) {
				res.data.content = b64DecodeUnicode(res.data.content)
			}
			return res
		},
		joinPromotions: async (store, data) =>
			await apiInit(store, 'post', 'promotions/forward/participateManualPromotion', data),
		getPromotionTotal: async store => await apiInit(store, 'post', 'promotions/forward/total'),

		// event
		getGame: async (store, data) => await apiInit(store, 'post', 'sportForward/forward/getGame', data),
		// 賽事更多
		getEvent: async store => {
			var set_guid = store.rootState.route.params.set_guid
			var res = await apiInit(store, 'post', `sportForward/forward/event/${set_guid}`, {}, { parse: false })
			if (res.code === 0) {
				parseEventJSON(res.data.data)
			}
			return res
		}, //
		// 我的最愛
		getFavorites: async (store, data) => {
			var res = await apiInit(store, 'post', 'sportForward/forward/favouriteEventSet', data, { parse: false }) // { set_guid: [] }
			if (res.code === 0) {
				parseEventJSON(res.data.data)
			}
			return res
		},
		// 賽事列表
		getMultiEvent: async (store, data) => {
			var res = await apiInit(store, 'post', 'sportForward/forward/multiEvent', data, {
				parse: false,
				header: { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			if (res.code === 0) {
				parseEventJSON(res.data.data)
			}
			return res
		},
		// 熱門賽事
		getHotGame: async store => {
			var res = await apiInit(store, 'get', 'sportForward/forward/hotGame', {}, { parse: false })
			if (res.code === 0) {
				parseEventJSON(res.data)
			}
			return res
		},
		// 直播2
		// getChannel: async (store, data) =>
		// 	await apiInit(store, 'post', 'betOutsideHandicap/appLiveData/getChannel', data),

		// game result // 資料量大，不解析
		getGameResult: async (store, data) => {
			var res = await apiInit(store, 'post', 'sportForward/forward/getSettlementEvent', data, { parse: false })
			if (res.code === 0) {
				_.forEach(res.data.data, set => {
					_.forEach(set.plays, data => {
						data.sep_info = $.parseJSON(data.sep_info)
						data.sep_results = $.parseJSON(data.sep_results)
					})
				})
			}
			return res
		},
		getGameResult2: async (store, data) => {
			var res = await apiInit(store, 'post', 'sportForward/forward/getSettlementEvent2', data, { parse: false })
			if (res.code === 0) {
				_.forEach(res.data.data, set => {
					_.forEach(set.plays, data => {
						data.sep_info = $.parseJSON(data.sep_info)
						data.sep_results = $.parseJSON(data.sep_results)
					})
				})
			}
			return res
		},
		// site message
		getMemberNotify: async (store, data) => await apiInit(store, 'get', 'BetMemberNotify/member/list', data),
		setMessageRead: async (store, data) => await apiInit(store, 'post', 'BetMemberNotify/member/setRead', data),
		delMessages: async (store, data) =>
			await apiInit(store, 'post', 'BetMemberNotify/member/deleteAlreadyReadNotify', data),

		// 未讀數量
		getUnRead: async store => await apiInit(store, 'post', 'BetMemberNotify/info/getUnread', {}, { stack: false }),

		// 廣告
		getAdvertising: async (store, data) => await apiInit(store, 'post', 'betAdvertising/appear/getList'),

		// 個人資訊
		getPersonalInfo: async (store, data) => await apiInit(store, 'post', 'account/setting/edit', data),
		postPersonalInfo: async (store, data) => await apiInit(store, 'post', 'account/layer/doEditForMember', data),

		// 會員等級
		getMemberLevel: async store => await apiInit(store, 'post', 'member-level/member-level/my-level'),

		// payment 金流 幣商
		getCurrencyStoreList: async store => await apiInit(store, 'get', 'paymentFlowForward/forward/getPaymentFlow'),

		// 儲值，轉移，提領
		getSavePoint: async (store, data) => await apiInit(store, 'post', 'forwardPlatformOrder/payIn/list', data),
		postSavePoint: async (store, data) => await apiInit(store, 'post', 'forwardPlatformOrder/payIn/create', data),

		getOutterGame: async store => await apiInit(store, 'post', 'forwardPlatformOrder/trans/getOutterGame'),
		getPointTransform: async (store, data) => await apiInit(store, 'post', 'forwardPlatformOrder/trans/list', data),
		postPointTransform: async (store, data) => await apiInit(store, 'post', 'forwardPlatformOrder/trans/create', data),

		getTreasureSell: async (store, data) => await apiInit(store, 'post', 'forwardPlatformOrder/payOut/list', data),
		postTreasureSell: async (store, data) => await apiInit(store, 'post', 'forwardPlatformOrder/payOut/create', data),

		// 進入其他遊戲
		getGameUrl: async (store, data) => await apiInit(store, 'post', 'account/game-resource/getGameUrl', data),
		getLiveUri: async (store, data) => await apiInit(store, 'post', 'betCasinoApi/phaLive/playerAuth', data),
		getSlotUri: async (store, data) => await apiInit(store, 'post', 'betCasinoApi/phaSlot/playerAuth', data),
		getGoldenUri: async (store, data) => await apiInit(store, 'post', 'betCasinoApi/phaGolden/playerAuth', data),

		// 銀行帳戶
		postBetBank: async (store, data) => await apiInit(store, 'post', 'betBank/appear/doAdd', data),
		getBankList: async (store, data) => await apiInit(store, 'get', 'betBank/appear/getList', data),
		uploadBankPhoto: async (store, data) =>
			await apiInit(store, 'post', 'betBank/appear/doUpload', data, {
				header: { 'x-agent-source': location.hostname.split('.')[0] },
				hasFile: true
			}),

		// 會員註冊
		memberRegister: async (store, data) =>
			await apiInit(store, 'post', 'account/cash-member/member-register', data, {
				header: { 'x-agent-source': location.hostname.split('.')[0] }
			}),
		memberRegisterCheck: async (store, data) => await apiInit(store, 'post', 'account/cash-member/do-valid', data),

		// 錢包資訊
		getBalnce: async (store, data) => await apiInit(store, 'get', 'config-sport/member-resource/get-balance', data),

		// FAQ
		getFAQCategoryList: async (store, data) => await apiInit(store, 'post', 'BetFAQ/forward/getCategoryList', data),
		getFAQContentList: async (store, data) => {
			var res = await apiInit(store, 'post', 'BetFAQ/forward/getManageList', data)
			if (res.code === 0 && res.data.manage) {
				_.forEach(res.data.manage, faq => {
					_.forEach(faq.content, (content, lang) => {
						faq.content[lang] = b64DecodeUnicode(content)
					})
				})
			}
			return res
		},

		// 影音平台
		getVideoUrl: async store => await apiInit(store, 'get', 'redirect/video/enter'),
		// 論壇
		getForumUrl: async store => await apiInit(store, 'get', 'redirect/forum/enter'),

		// 密碼重置
		getRestPassword: async (store, data) =>
			await apiInit(store, 'post', 'account/cash-account/send-reset-password-url', data),
		getRestPasswordCheck: async (store, data) =>
			await apiInit(store, 'post', 'account/cash-account/decode-reset-password-code', data),
		doResetPassword: async (store, data) =>
			await apiInit(store, 'post', 'account/cash-account/do-reset-password', data),

		// 上傳存摺
		doUpload: async (store, data) => await apiInit(store, 'post', 'betBank/setting/doUpload', data),

		// 備用網址
		getBackupUrl: async store => await apiInit(store, 'get', 'branch/config/ancillary-domain-list'),

		//送出儲值單 by 銀行卡
		getBank: async store => await apiInit(store, 'get', 'paymentFlowForward/forward/getBankCardPaymentFlow'),
		postSavePointByBank: async (store, data) => await apiInit(store, 'post', 'forwardPlatformOrder/payIn/create', data),

		//規則說明
		getRules: async store => {
			let res = await apiInit(store, 'post', 'sportRuleDescription/Manager/forwardGetList')
			if (res.code === 0) {
				_.forEach(res.data, item => {
					_.forEach(item.get_rule_play_mode, subItem => {
						_.forEach(subItem.get_rule_content, content => {
							content.p102_src_content = b64DecodeUnicode(content.p102_src_content)
						})
					})
				})
			}
			return res
		},
		// 相關網站
		getRelatedWebSite: async store => await apiInit(store, 'post', 'sportRelatedWebsite/WebsiteList/forwardGetList'),

		getPayInfo: async store => await apiInit(store, 'post', 'forwardPlatformOrder/payOut/getMemberPayOutInfo'),
		getAllowDepositOfQuota: async store => await apiInit(store, 'post', 'sportOrder/forward/getAllowDepositOfQuota'),
		getAlreadyDepositPoint: async store =>
			await apiInit(store, 'post', 'forwardPlatformOrder/trans/getTAMBTTodayAlreadyDepositPoint'),
		getTAMBTTotal: async store => await apiInit(store, 'post', 'outterGameConfigBalancePay/front-end/info'),
		getMaintainTimes: async (store, data) => await apiInit(store, 'post', 'branch/config/maintain-times', data),
		getTAMBTInfoSearch: async (store, data) =>
			await apiInit(store, 'post', 'outterGameConfigBalancePay/front-end/info', data),
		getYourBallIncome: async store =>
			await apiInit(store, 'get', 'betCasinoApi/TamBalanceTreasureForFrontend/getTamBalanceDefaultInfo'),

		sendLog: async (store, data) => await apiInit(store, 'post', 'commonTools/telegram/sentMessageForward', data, { response: false }),
		/** 直撥列表 */
		getLiveList: async store => await apiInit(store, 'get', 'betOutsideHandicap/live/getAllBindingLive'),

		/** 寫入發佈版本，測試用 */
		setDeployVersion: async store => await apiInit(store, 'post', 'commonTools/telegram/storeMessage', { message: { deployVer: require('../../../deploy').fileName } }),
		/** 取得取得發佈版本，發佈時送出，存在資料庫中的字串 */
		getDeployVersion: async store => await apiInit(store, 'post', 'commonTools/telegram/getStoreMess', { key: 'deployVer' }),
	}
}

async function apiInit({ state, commit }, method, uri, data = {}, config = {}) {
	const {
		header = {},
		// 加入注列，如果api還再pendding，會顯示讀取條
		stack: goAPIStack = true,
		// 是否自動進行json解析
		parse = true,
		hasFile = false,
		response = true
	} = config
	if (goAPIStack) commit('addLoadingApi', uri)

	if (!hasFile && typeof data == 'object') {
		// data = _.omitBy(data, x => {
		// 	return x === ''
		// })
		data = _.pickBy(data)
	}

	var res = await axios(createApiBody(method, uri, data, header)).catch(error => { })

	if (goAPIStack) commit('removeLoadingApi', uri)
	if (typeof res == 'undefined') return { code: 500, data: {} } // xhr error
	if (!response) return

	var data = res.data || JSON.parse(res.request.responseText) || {} // for ie9
	data.status = res.status
	return data.code === 0 ? multiParse(data, parse) : handleError(data, uri)
}

function multiParse(val, parse) {
	if (!parse) return val
	if (_.isObject(val) || _.isArray(val)) {
		_.each(val, (v, k, obj) => {
			obj[k] = multiParse(v, parse)
		})
		return val
	} else {
		try {
			return JSON.parse(val)
		} catch (err) {
			return val
		}
	}
}

function handleError(res, uri) {
	if (typeof res.data === 'string') {
		var msg = res.data
	} else if (res.text) {
		var msg = _.map(res.text).join(' | ')
	} else if (res.message) {
		if (typeof res.message == 'string') {
			var msg = res.message
		} else if (typeof res.message == 'object') {
			var msg = _.map(res.message).join(' | ')
		}
	} else if (res.data && res.data.messages) {
		var msg = _.isString(res.data.messages) ? res.data.messages : _.map(res.data.messages).join(' | ')
	} else {
		var msg = '錯誤發生'
	}

	console.error(`API error, ${uri} : ${msg}(${res.code})`)
	return res
}

// 手動解析賽事api json
var parseEventJSON = datas => {
	_.forEach(datas, data => {
		data.set_detail_content = $.parseJSON(data.set_detail_content)
		data.set_teams_info = $.parseJSON(data.set_teams_info)
		data.set_live_data = $.parseJSON(data.set_live_data)
		if (data.set_live_data) {
			data.set_live_data.live1 = data.set_live_data.live1
				? $.parseJSON(data.set_live_data.live1)
				: data.set_live_data.live1
			data.set_live_data.live2 = data.set_live_data.live2
				? $.parseJSON(data.set_live_data.live2)
				: data.set_live_data.live2
			data.set_live_data.live3 = data.set_live_data.live3
				? $.parseJSON(data.set_live_data.live3)
				: data.set_live_data.live3
		}
	})
}
