import { mapActions } from 'vuex'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'

var start = moment().format('YYYY-MM-DD'),
	end = moment().format('YYYY-MM-DD')

export default {
	mixins: [CheckLogin],
	components: {
		datetimepicker: require('@/shared/datetimepicker')
	},
	data: () => ({
		start,
		end,
		optionList: [],
		cOption: [],
		perPage: 20,
		page: 1,
		lastPage: 0,
		datas: []
	}),
	methods: {
		...mapActions(['getPointHistoryOption', 'getPointHistory', 'getPointHistoryTotal']),
		getReqData() {
			return {
				start: this.start.GetTime(),
				end: this.end.GetDayEndTime(),
				operation_type: this.cOption,
				page: this.page,
				perPage: this.perPage
			}
		},
		async onGetPointHistoryAndPager() {
			this.datas = []
			this.lastPage = 0
			var res = await this.axios.all([this.onGetPointHistory(), this.getPointHistoryTotal(this.getReqData())])
			if (res[1].code === 0) {
				this.lastPage = Math.ceil(res[1].data / this.perPage)
			}
		},
		async onGetPointHistory() {
			var res = await this.getPointHistory(this.getReqData())
			if (res.code === 0) {
				this.datas = res.data
			}
		},
		pageChg(page) {
			this.page = page
			this.onGetPointHistory()
		},
		onOptionChange() {
			this.cOption = $(this.$refs.cOption).selectpicker('val')
		}
	},
	async created() {
		require('~/bootstrap/dist/js/bootstrap.min.js')
		require('bootstrap-select')
		var res = await this.getPointHistoryOption()
		if (res.code === 0) {
			this.optionList = res.data
			if (res.data.length) {
				this.cOption.push(res.data[0])
				this.$nextTick(() => {
					$(this.$refs.cOption).selectpicker('val', this.cOption)
				})
				this.onGetPointHistoryAndPager()
			} else {
				$(this.$refs.cOption).selectpicker()
			}
		}
	}
}
