import SportIndex from 'src/mixins/Sport/SportIndex'
import { mapActions } from 'vuex'

export default {
	mixins: [SportIndex],
	data: () => ({
		sets: [], // 賽事
		start_time: '',
		teams: [],
		leagueGuid: '', // for sport-mobile use
		waitSec: 10,
		showSec: 0,
		timer: null,
		isEventLoading: false
	}),
	methods: {
		...mapActions(['getEvent']),
		async onGetEvent() {
			this.isEventLoading = true
			var res = await this.getEvent()
			if (res.code === 0 && res.data.data.length) {
				this.sets = res.data.data
				var setData = this.sets[0]
				this.proccessSeps(setData.plays)
				// const isSoccer = this.isSoccerByScyCode(setData.set_)
				this.teams = this.getCTeamOrder(setData)
				this.leagueGuid = setData.set_sle_guid
				this.start_time = setData.set_start_time
			}
			this.isEventLoading = false
		},
		onTimesUp() {
			this.showSec = this.waitSec
			this.onGetEvent()
		}
	},
	created() {
		var onCounting = () => {
			this.showSec = this.waitSec
			this.timer = setInterval(() => {
				if (--this.showSec === 0) {
					this.onTimesUp()
				}
			}, 1000)
		}
		onCounting()
		this.onGetEvent()
	},
	destroyed() {
		clearInterval(this.timer)
	}
}
