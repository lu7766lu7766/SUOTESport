import { mapActions } from 'vuex'
import SportIndex from 'src/mixins/Sport/SportIndex'
import { SportsType } from 'src/store/module/sports'

export default {
	mixins: [SportIndex],
	data() {
		return {
			scys: [], // 球種，跨地區所以可能有多球種
			spyGuids: [], // storage.get('spyGuids') || [],
			sgeGuids: [], //storage.get('sgeGuids') || [],
			showSec: 0,
			isEventLoading: false,
			orderType: 'time' // 手機版不會變動，但也會送
		}
	},
	methods: {
		...mapActions(['getGame']),
		async onGetGame(data) {
			var res = await this.getGame(data)
			if (res.code === 0) {
				this.scys = _.cloneDeep(res.data)
				this.$store.commit(SportsType.setGameSges, this.sges)
				this.$store.commit(SportsType.setCSgeCode, this.showSgeCodeList[0])
			}
		}
	},
	computed: {
		sges() {
			// 取出屬性
			const tmp = {},
				res = {}
			_.forEach(this.scys, scy => {
				_.forEach(scy.games_with_play, sge => {
					if (sge.sge_live == this.isLive) {
						tmp[sge.sge_code] = _.omit(sge, ['pivot', 'plays'])
					}
				})
			})
			// 排序
			_.forEach(this.games, sge => {
				if (tmp[sge.sge_code]) {
					res[sge.sge_code] = tmp[sge.sge_code]
				}
			})
			return _.map(res)
		},
		spys() {
			// 取出屬性
			const tmp = {},
				res = {}
			_.forEach(this.scys, scy => {
				_.forEach(scy.games_with_play, sge => {
					_.forEach(sge.plays, spy => {
						tmp[spy.spy_code] = _.omit(spy, 'pivot')
					})
				})
			})
			// 排序
			_.forEach(this.plays, spy => {
				if (tmp[spy.spy_code]) {
					res[spy.spy_code] = tmp[spy.spy_code]
				}
			})
			return _.map(res)
		},
		waitSec() {
			return this.isLive ? 10 : 30
		}
	}
}
