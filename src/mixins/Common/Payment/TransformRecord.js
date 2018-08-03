import { mapActions } from 'vuex'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import PaymentConf from 'src/config/PaymentConf'
import BankList from 'src/config/BankList.json'

export default {
	mixins: [CheckLogin],
	components: {
		datetimepicker: require('@/shared/datetimepicker')
	},
	data: () => ({
		BankList,
		paymentType: PaymentConf.payment_type,
		paymentMethod: PaymentConf.payment_method,
		cType: '',
		types: {}
	}),
	watch: {
		item() {
			this.pageChg(1)
		}
	},
	computed: {
		item() {
			return this.types[this.cType]
		}
	},
	methods: {
		...mapActions(['getSavePoint', 'getPointTransform', 'getTreasureSell']),
		pageChg(page) {
			this.item.page = page
			this.onMyGetData()
		},
		getReqData() {
			const { page, perPage: perpage, start_time, end_time } = this.item
			return _.merge(this.cType != 'pointTransform' ? { pfc_guid: this.$route.params.pfc_guid } : {}, {
				start_time: start_time.GetTime(),
				end_time: end_time.GetDayEndTime(),
				page,
				perpage
			})
		},
		getBankCodeName(code) {
			return _.find(this.BankList, { code }).name
		},
		async onMyGetData() {
			if (typeof this.item == 'undefined') return
			if (this.item.start_time > this.item.end_time) {
				this.$swal('起始日期不得大於結束日期')
				this.item.start_time = this.item.end_time
				return
			}

			if (Math.abs(moment(this.item.start_time).diff(this.item.end_time, 'months', true)) >= 1) {
				this.$swal('搜尋時間範圍必須小於一個月!')
				return
			}

			var res = await this[this.item.method](this.getReqData())

			if (res.code === 0) {
				this.item.total = res.data.total
				this.item.datas = res.data.data
				this.item.lastPage = Math.ceil(this.item.total / this.item.perPage)
			}
		}
	},
	created() {
		this.onMyGetData()
		// console.log(this.paymentType)
	}
}
