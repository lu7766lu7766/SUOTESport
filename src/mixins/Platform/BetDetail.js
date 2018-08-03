import BetDetail from 'src/mixins/Common/BetDetail'
import BetDetailType from 'src/config/BetDetailType'
import { mapActions } from 'vuex'

var start_time = moment()
	.add(1, 'days')
	.subtract(1, 'months')
	.format('YYYY-MM-DD'),
	stop_time = moment().format('YYYY-MM-DD')
export default {
	mixins: [BetDetail],
	components: {
		datetimepicker: require('@/shared/datetimepicker')
	},
	data: () => ({
		start_time,
		stop_time,
		status: ['received', 'checked_out', 'recheckout', 'cancel'],
		total: 0,
		betDetailType: BetDetailType
	}),
	methods: {
		...mapActions(['getSport', 'getCategory', 'getBetDetailGames', 'getBetDetail', 'getBetDetailTotal']),
		async onGetBetDetail() {
			var search = this.getReqData(this.mySearch)
			if (!this.validate(search)) return

			var res = await this.getBetDetail(search)
			if (res.code === 0) {
				this.details = res.data
			}
			// this.$toTop()
		},
		async getBetDetailAndPager() {
			this.page = 1
			var search = this.getReqData(this.mySearch)
			if (!this.validate(search)) return

			var res = await this.axios.all([this.onGetBetDetail(), this.getBetDetailTotal(search)])
			if (res[1].code === 0) {
				this.lastPage = Math.ceil(res[1].data.total / this.perPage)
			}
		},
		pageChg(page) {
			this.page = page
			this.onGetBetDetail()
		}
	},
	computed: {
		reportType() {
			return this.$route.params.reportType
		},
		mySearch() {
			return {
				start: this.$route.params.start,
				end: this.$route.params.end,
				report_type: this.reportType,
				time_type: this.$route.params.timeType
			}
		}
	},
	async created() {
		if (!this.categorys.length) {
			this.axios.all([this.getSport(), this.getCategory()]).then(res => {
				this.$store.commit('setSports', res[0])
				this.$store.commit('setCategorys', res[1])
				this.getBetDetailAndPager()
			})
		} else {
			this.getBetDetailAndPager()
		}
	}
}
