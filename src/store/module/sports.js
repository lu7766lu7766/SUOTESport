const type = {
	setIsLive: 'Sports/setIsLive',
	onIsLiveChange: 'Sports/onIsLiveChange',
	setCSgeCode: 'Sports/setCSgeCode',
	setGameSges: 'Sports/setGameSges',
	showSgeCodeList: 'Sports/showSgeCodeList',
	isLiveTxt: 'Sports/isLiveTxt'
}

export { type as SportsType }

export default {
	namespaced: true,
	state: {
		cSgeCodeList: [], // 目前選中的場次
		gameSges: [], // getGames
		isLive: false // 是否走地，
	},
	mutations: {
		setIsLive(state, isLive) {
			state.isLive = isLive
		},
		onIsLiveChange(state) {
			state.isLive = !state.isLive
		},
		// 設定目前選中的場次，目前只能單選
		setCSgeCode(state, code) {
			state.cSgeCodeList = [code]
		},
		setGameSges(state, sges) {
			// 須先經過排序
			state.gameSges = sges
		}
	},
	getters: {
		// // 非走地場次列表
		// sgeCodeList: (state, getters, rootState) => _.map(_.filter(rootState.games, sge => !sge.sge_live), 'sge_code'),
		// // 走地場次列表
		// sgeLiveCodeList: (state, getters, rootState) => _.map(_.filter(rootState.games, 'sge_live'), 'sge_code'),
		// 場次選擇列表
		showSgeCodeList: state => _.map(_.filter(state.gameSges, sge => sge.sge_live == state.isLive), 'sge_code'),
		// 走地文字顯示
		isLiveTxt: state => (state.isLive ? 'live' : 'normal')
	}
}
