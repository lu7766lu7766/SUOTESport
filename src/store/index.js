import Vue from 'vue'
import Vuex from 'vuex'

import vuexI18n from 'vuex-i18n'
// modules
import Api from './module/api'
import Menu from './module/menu'
import Sports from './module/sports'
// import FackData from './module/fack-data'
import Login from './module/login'
import Favorite from './module/favorite'
import Bet from './module/bet'
import Info from './module/info'
import Rule from './module/rule'
import News, { NewsType } from './module/news'
import Payment, { PaymentType } from './module/payment'
import Yebpay from './module/yebpay'
import { setTimeout } from 'timers'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		i18n: vuexI18n.store,
		Api,
		Info,
		Menu,
		Sports,
		Rule,
		// FackData,
		Login,
		Favorite,
		Yebpay,
		Bet,
		News,
		Payment
	},
	state: {
		sports: [], // 球類index
		areas: [], // 地區index
		leagues: [], // 聯盟index 。是在sport統計完才丟出來，因為sport有他自己需要的資料格式，避免撈兩次
		games: [], // 場次index
		plays: [], // 玩法index
		categorys: [], // 球種index
		// teams: [], // 隊伍index //隊伍在gamelist異動會造成遞回，原因不明
		// lang: {}, // 語言包

		isDataInit: false
	},
	mutations: {
		setSports(state, res) {
			if (res.code === 0) {
				state.sports = _.orderBy(res.data.sport, 'sbl_created_at')
			}
		},
		setAreas(state, res) {
			if (res.code === 0) {
				state.areas = _.orderBy(res.data.area, 'sra_created_at')
			}
		},
		setGames(state, res) {
			if (res.code === 0) {
				state.games = _.orderBy(res.data.games, 'sge_created_at')
			}
		},
		setPlays(state, res) {
			if (res.code === 0) {
				state.plays = _.orderBy(res.data.plays, 'spy_created_at')
			}
		},
		setCategorys(state, res) {
			if (res.code === 0) {
				state.categorys = _.orderBy(res.data, 'scy_created_at')
			}
		},
		setLeagues(state, res) {
			if (res.code === 0) {
				state.leagues = _.map(res.data.league, league => {
					league.event_count = {
						live: league.live_event_count,
						normal: league.normal_event_count
					}
					return league
				})
			}
		},
		setDataInit(state) {
			state.isDataInit = true
		}
	},
	actions: {
		GET_SPORTS_BASIC: async ({ state, dispatch, commit }) => {
			const res = await axios.all([
				dispatch('getSport'),
				dispatch('getGamePlay'),
				dispatch('getCategory'),
				dispatch('getSportNewsCategory'),
				dispatch('getNewsTags')
			])
			commit('setSports', res[0])
			commit('setAreas', res[0])
			commit('setLeagues', res[0])
			commit('setGames', res[1])
			commit('setPlays', res[1])
			commit('setCategorys', res[2])
			commit(NewsType.setSportCategorys, res[3]) // SportNewsCategory
			commit(NewsType.setTags, res[4]) // NewsTags
			commit('setDataInit')
		},
		GET_PLATFORM_BASIC: async ({ state, dispatch, commit }) => {
			const res = await axios.all([dispatch('getNewsCategorys', { status: 1 }), dispatch('getNewsTags')])
			commit(NewsType.setCategorys, res[0]) // NewsCategory
			commit(NewsType.setTags, res[1]) // NewsTags
			commit('setDataInit')
		},
		GET_CURRENCY_STORE_BASIC: async ({ state, dispatch, commit }) => {
			const res = await dispatch('getCurrencyStoreList')
			commit(PaymentType.SetStore, { res, params: state.route.params }) // NewsCategory
			commit('setDataInit')
		},

		GET_LEAGUES: async ({ state, dispatch, commit }) => {
			const res = await dispatch('getSport')
			commit('setLeagues', res.data.league)
		}
	},
	getters: {
		gSblGuidLeagues: state => _.groupBy(state.leagues, 'sle_sbl_guid'),
		sportCodeList: state => _.map(state.sports, 'sbl_code'),
		playCodeList: state => _.map(state.plays, 'spy_code'),
		gameCodeList: state => _.map(state.games, 'sge_code'),
		playGuidList: state => _.map(state.plays, 'spy_guid'),
		gameGuidList: state => _.map(state.games, 'sge_guid'),

		scyCodeIndex: state => _.mapKeys(state.categorys, 'scy_code'), // 球種索引
		scyGuidIndex: state => _.keyBy(state.categorys, 'scy_guid'), // 球種索引
		sblGuidIndex: state => _.keyBy(state.sports, 'sbl_guid'), // 球類索引
		spyCodeIndex: state => _.keyBy(state.plays, 'spy_code'), // 玩法索引
		// sgeGuidIndex: state => _.keyBy(state.games, 'sge_guid'), // 場次索引
		sgeCodeIndex: state => _.keyBy(state.games, 'sge_code'), // 場次索引

		playOther: state => _.find(state.plays, { spy_code: 'PLAY_OTHER' }) || {},
		gameOther: state => _.find(state.games, { sge_code: 'GAME_OTHER' }) || {}
	}
})
