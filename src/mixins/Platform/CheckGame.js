import { mapState } from 'vuex'

export default {
	methods: {
		checkBranchGames(game_code) {
			return (
				!!_.find(this.branchGames, { p90_gme_code: game_code }) &&
				!_.find(this.branchGames, { p90_gme_code: game_code, p32_bge_status: -2 })
			)
		},
		checkGamesMaintain(game_code) {
			return !!_.find(this.branchGames, { p90_gme_code: game_code, p32_bge_status: 2 })
		}
	},
	computed: {
		...mapState({
			branchGames: state => state.Login.branchGame,
			gameList: state => _.map(state.Login.branch.p90_game_manage, 'p90_gme_code')
		}),
		/**
		 * return true // 遊戲開啟, false // 遊戲關閉
		 */
		checkGames() {
			var res = _.reduce(
				this.gameList,
				(result, code) => {
					result[code] = this.checkBranchGames(code)
					return result
				},
				{}
			)
			return res
		},
		/**
		 * return true // 遊戲維護中, false // 遊戲非維護中
		 * 與checkGames開放條件相反
		 */
		checkMaintains() {
			return _.reduce(
				this.gameList,
				(result, code) => {
					result[code] = this.checkGamesMaintain(code)
					return result
				},
				{}
			)
		},
		checkYeb() {
			return this.checkGames.TAMBT && !this.checkMaintains.TAMBT
		}
	}
}
