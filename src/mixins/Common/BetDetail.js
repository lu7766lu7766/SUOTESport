import Bet from 'src/mixins/Sport/Bet'
import { mapState, mapActions } from 'vuex'

export default {
	mixins: [Bet],
	components: {
		MyPager: () => import('@/shared/MyPager')
	},
	data() {
		return {
			start_time: '',
			stop_time: '',
			// status: [],
			category: '',
			game: '',
			play: '',
			lastPage: 0,
			page: 1,
			perPage: 20, // max 100
			details: []
		}
	},
	methods: {
		getReqData(search = {}) {
			return _.assign(
				{
					status: this.status,
					start: this.start_time.GetTime(), //: 1490803200,
					end: this.stop_time.GetDayEndTime(), //: 1490889600,
					perpage: this.perPage,
					category: this.category,
					game: this.game,
					play: this.play,
					page: this.page,
					report_type: this.reportType
				},
				search
			)
		},
		validate(search) {
			if (search.start != '' && search.end != '') {
				var startTxt = this.$moment(search.start).Format('Y-m-d'),
					endTxt = this.$moment(search.end).Format('Y-m-d')
				if (Math.abs(moment(startTxt).diff(endTxt, 'months', true)) >= 2) {
					this.$bus.emit('show.alert', {
						type: 'mainten',
						content: this.$t('alert.betweenTwoMonth')
					})
					return false
				} else if (search.start > search.end) {
					this.$bus.emit('show.alert', {
						type: 'mainten',
						content: this.$t('alert.endMustBiggerThanStart')
					})
					return false
				}
			}
			return true
		}
	}
}
