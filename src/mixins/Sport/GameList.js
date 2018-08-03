import { mapState, mapGetters } from 'vuex'
import { BetType } from 'src/store/module/bet.js'
import { FavoriteType } from 'src/store/module/favorite.js'
import SpyFactory from 'lib/SpyFactory'
import SportIndex from 'src/mixins/Sport/SportIndex'

export default {
	mixins: [SportIndex],
	methods: {
		onSetFavoriteChange(set_guid) {
			if (this.isLogin) {
				this.$store.commit({
					type: FavoriteType.onChange,
					set_guid
				})
			} else {
				this.$bus.emit('show.alert', {
					type: 'login',
					content: this.$t('alert.pleaseLogin')
				})
			}
		},
		isSetFavorite(set_guid) {
			return this.favorites.indexOf(set_guid) > -1
		},
		getOneData(gSpyCodeDatas) {
			// 取一筆有主客隊的玩法即可
			var res
			// Object.keys(gSpyCodeDatas).forEach(spy_code => {
			//   res = this.isHasMasterSlave(spy_code)? gSpyCodeDatas[spy_code] : res
			//   if (res) return false
			// })
			var spyCodeList = Object.keys(gSpyCodeDatas)
			if (spyCodeList.length) {
				// 如果沒有開無主客隊的玩法
				res = gSpyCodeDatas[spyCodeList[0]]
			}
			return res
		},
		isShowHandicap(spy_code) {
			return SpyFactory.createObj(spy_code).isShowHandicap()
		},
		isShowTeamName(spy_code) {
			return SpyFactory.createObj(spy_code).isShowTeamName()
		},
		isHasMasterSlave(spy_code) {
			return SpyFactory.createObj(spy_code).isHasMasterSlave()
		},
		hasPitcher(set) {
			return set.set_detail_content &&
				set.set_detail_content.pitcher &&
				(set.set_detail_content.pitcher.away || set.set_detail_content.pitcher.home)
		}
	},
	computed: {
		...mapState({
			favorites: state => state.Favorite.datas
		}),
		...mapGetters({
			spoGuids: BetType.spoGuids
		})
	}
}
