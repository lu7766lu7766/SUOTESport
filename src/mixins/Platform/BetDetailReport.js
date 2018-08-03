import TimeSetting from 'src/mixins/Common/TimeSetting'
import Link from 'src/mixins/Common/Link'
import BetDetailType from 'src/config/BetDetailType'
import BetDetailTimeType from 'src/config/BetDetailTimeType'
import { mapActions } from 'vuex'

export default {
	mixins: [TimeSetting, Link],
	components: {
		datetimepicker: require('@/shared/datetimepicker')
	},
	data: () => ({
		start_time: '',
		stop_time: '',
		betDetailType: BetDetailType,
		betDetailTimeType: BetDetailTimeType,
		timeType: '',
		reports: []
	}),
	methods: {
		...mapActions(['getBetDetailReport']),
		async onGetBetDetailReport() {
			var res = await this.getBetDetailReport({
				start: this.start_time.GetTime(),
				end: this.stop_time.GetDayEndTime(),
				time_type: this.timeType
			})
			if (res.code === 0) {
				_.forEach(res.data, data => {
					data.result = math.eval(`${data.bonus} + ${data.commission}`)
				})
				this.reports = res.data
			}
		},
		mySetTime(type) {
			this.setTime(type)
			this.onGetBetDetailReport()
		},
		mySum(objs, prop) {
			let res = 0
			objs.forEach(obj => {
				res = math.eval(`${res} + ${obj[prop]}`)
			})
			return res
		},
		getBetDetailParams(reportType) {
			return {
				start: this.start_time.GetTime(),
				end: this.stop_time.GetDayEndTime(),
				reportType,
				timeType: this.timeType
			}
		}
	},
	computed: {
		total() {
			var reports = _.map(this.reports)
			return {
				totalCount: this.mySum(reports, 'totalCount'),
				betMoney: this.mySum(reports, 'betMoney'),
				validBetMoney: this.mySum(reports, 'validBetMoney'),
				result: this.mySum(reports, 'result'),
				commission: this.mySum(reports, 'commission')
			}
		}
	},
	created() {
		this.mySetTime('today')
	}
}
