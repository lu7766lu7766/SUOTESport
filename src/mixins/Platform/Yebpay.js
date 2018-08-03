import { mapActions } from 'vuex'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import TimeSeting from 'src/mixins/Common/TimeSetting'

export default {
	name: '',
	components: {
		datetimepicker: require('@/shared/datetimepicker'),
		MyPager: require('@/shared/MyPager')
	},
	mixins: [CheckLogin, TimeSeting],
	methods: {
		...mapActions([
			'getMaintainTimes',
			'getAllowDepositOfQuota',
			'getAlreadyDepositPoint',
			'getTAMBTTotal',
			'getTAMBTInfoSearch',
			'getYourBallIncome'
		]),
		async getAllow() {
			let res = await this.getAllowDepositOfQuota()
			return res.code === 0 ? res.data : 0
		},
		async getAlready() {
			let res = await this.getAlreadyDepositPoint()
			return res.code === 0 ? res.data : 0
		},
		caculate() {
			this.yearYepayResult = (this.yepayCaculate * this.interest / 100).toFixed(2)
			this.yepayResult = (this.yepayCaculate * this.interest / 36500).toFixed(2)
		},
		async getTotal() {
			let res = await this.getTAMBTTotal()
			if (res.code === 0) {
				if (res.data.account) {
					this.interest = res.data.account.interest
					this.lastTime = new Date(res.data.account.last_compute * 1000)
					let now = new Date()
					this.wallet = res.data.wallet
					this.caculateTime = this.wallet === 0 ? 0 : Math.floor(now - this.lastTime)
					this.income_second = res.data.account.income_second
					this.income = res.data.income + res.data.account.income_second * Math.ceil((now - this.lastTime) / 1000)
					this.income_date_range = res.data.income.toFixed(8)
					this.yesterday_income = res.data.account.yesterday_income
					this.showshow = this.lastTime.DateDiff(now)
				}
			}
		},
		addCalculateTime() {
			this.showTime = this.lastTime.DateDiff(new Date())
			this.caculateTime += 1000
			this.income += +this.income_second
			this.$bus.emit('yebpayCaculate', { showTime: this.showTime, income: this.income.toFixed(8), wallet: this.wallet })
		},
		pageChg(page) {
			this.page = page
			this.getTAMBTInfoData()
		},
		async setMounted() {
			this.getTotal()
			this.interest = await this.getImcomeData()
			this.already = await this.getAlready()
			this.allow = await this.getAllow()
		},
		async getImcomeData() {
			let res = await this.getYourBallIncome()
			if (res.code == 0) {
				if (res.data) return res.data.default_interest
			}
			return 0
		},
		async getTAMBTInfoData() {
			let res = await this.getTAMBTInfoSearch({
				start_time: this.start_time,
				end_time: this.stop_time + ' 23:59:59',
				page: this.page
			})
			if (res.code === 0) {
				if (res.data.account && res.data.wallet_detail_date_range) {
					this.currentData = res.data.account
					this.historyList = res.data.wallet_detail_date_range
					this.lastPage = this.historyList.total_page
					this.total = this.historyList.total
				}
			}
		},
		isZero(item) {
			return item == 0 ? '' : item
		},
		transType(type, income) {
			return type === 2 ? (income === '0' ? '系統轉出' : this.yebStatus[type]) : this.yebStatus[type]
		}
	},
	// mounted() {
	// 	this.getMaintainTimes({ bch_id: 12 })
	// },
	data: () => ({
		already: 0,
		allow: 0,
		yepayCaculate: 0,
		yepayResult: 0,
		interest: 0,
		yearYepayResult: 0,
		wallet: 0,
		income: 0,
		income_date_range: 0,
		yesterday_income: 0,
		caculateTime: 0,
		historyList: {
			datas: []
		},
		total: 0,
		lastPage: 1,
		page: 1,
		currentData: {},
		start_time: new Date(),
		stop_time: new Date(),
		showTime: 0,
		lastTime: 0,
		yebStatus: {
			1: '轉入',
			2: '轉出',
			3: '改利率',
			4: '結算'
		}
	})
}
