import SpyConf from 'src/config/SpyConf'

const type = {
	spyGuidOrder: 'Rule/spyGuidOrder'
}

export { type as RuleType }

export default {
	namespaced: true,
	state: {
		//玩法限制
		spyCodeOrder: {
			// code不會改變，guid會改變，所以規則索引要以code為主，再轉換
			[SpyConf.ADVANTAGE]: [SpyConf.SPREAD] // 一輸二贏 要先有 [讓分]
		}
	},
	getters: {
		spyGuidOrder: (state, getters, rootState) => {
			// 玩法限制的guid轉換
			let res = {}
			if (rootState.plays.length) {
				_.forEach(_.keys(state.spyCodeOrder), spy_code => {
					let need_spy_codes = []
					_.forEach(state.spyCodeOrder[spy_code], need_spy_code => {
						need_spy_codes.push(_.find(rootState.plays, ['spy_code', need_spy_code]).spy_guid)
					})
					let spy = _.find(rootState.plays, ['spy_code', spy_code])
					if (spy) {
						res[spy.spy_guid] = need_spy_codes
					}
				})
			}
			return res
		}
	}
}
