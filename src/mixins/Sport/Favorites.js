import { mapState, mapActions } from 'vuex'
import { FavoriteType } from 'src/store/module/favorite'
import SportIndex from 'src/mixins/Sport/SportIndex'
import { interval } from 'rxjs/observable/interval'

export default {
	mixins: [SportIndex],
	data() {
		return {
			showSec: 0,
			waitSec: 30,
			isEventLoading: false,
			timer: null,
			page: 1,
			setsPagerModel: {} // 賽事資料
		}
	},
	watch: {
		favorites() {
			this.getFavoriteEvents()
		}
	},
	methods: {
		...mapActions(['getFavorites', 'getFavorites']),
		async getFavoriteEvents() {
			if (this.favorites && this.favorites.length) {
				this.isEventLoading = true
				var data = await this.getFavorites({ set_guid: this.favorites })
				this.isEventLoading = false
				if (this.favorites.length != data.data.data.length) {
					//有些賽玩消失
					_.forEach(this.favorites, set_guid => {
						if (_.findIndex(data.data.data, ['set_guid', set_guid]) == -1) {
							this.$store.commit({
								type: FavoriteType.onChange,
								set_guid
							})
						}
					})
				}
				data.data.data = this.getCorrectOrderSeps(data.data.data)
				this.setsPagerModel = data.data
			} else {
				this.setsPagerModel = {}
			}
		},
		onTimesUp() {
			this.showSec = this.waitSec
			this.getFavoriteEvents()
		}
	},
	computed: mapState({
		favorites: state => state.Favorite.datas
	}),
	created() {
		this.showSec = this.waitSec
		this.$store.commit(FavoriteType.Get)
		// this.getFavoriteEvents()

		this.timer = setInterval(() => {
			if (!--this.showSec) {
				this.onTimesUp()
			}
		}, 1000)
	},
	destroyed() {
		clearInterval(this.timer)
	}
}
