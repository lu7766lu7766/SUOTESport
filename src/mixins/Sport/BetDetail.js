import BetDetail from 'src/mixins/Common/BetDetail'
import { mapActions } from 'vuex'
export default {
	mixins: [BetDetail],
	components: {
		datetimepicker: require('@/shared/datetimepicker')
	},
	data: () => ({
		groups: [],
		reportType: 'sport'
	}),
	methods: {
		...mapActions(['getHisstoryAccountGroup', 'getHisstoryAccountList', 'getBetDetailGroup', 'getBetDetailList']),
		async onGetBetDetailList(group) {
			var res = await this.getBetDetailList(this.getReqData({ page: group.page }))
			if (res.code === 0) {
				this.groups[0].details = res.data
			}
		},
		async onGetBetDetailGroup(data = {}) {
			var search = this.getReqData(data)
			if (!this.validate(search)) return

			var res = await this.getBetDetailGroup(search)
			if (res.code === 0) {
				this.groups = []
				if (res.data && res.data.length) {
					_.forEach(res.data, group => {
						group.details = {}
						group.page = 1
						group.lastPage = Math.ceil(group.betTotal / this.perPage)
						group.isShow = false
					})
					this.groups = res.data
				}
			}
		},
		async onGetHisstoryAccountList(group) {
			var res = await this.getHisstoryAccountList(
				this.getReqData({
					start: group.date.GetTime(),
					end: group.date.GetDayEndTime(),
					page: group.page
				})
			)
			if (res.code === 0) {
				const index = _.findIndex(this.groups, { date: group.date })
				this.groups[index].details = res.data
			}
		},
		async onGetHisstoryAccountGroup(data = {}) {
			var search = this.getReqData(
				_.assign(data, {
					perpage: 100
				})
			)
			if (!this.validate(search)) return

			var res = await this.getHisstoryAccountGroup(search)
			if (res.code === 0) {
				this.groups = []
				if (res.data.list && res.data.list.length) {
					_.forEach(res.data.list, group => {
						group.details = {}
						group.page = 1
						group.lastPage = Math.ceil(group.betTotal / this.perPage)
						group.isShow = false
					})
					this.groups = res.data.list
				}
			}
		},
		getDetails(group) {
			if (!group.isShow) {
				group.isShow = true
				group.page = 1
				if (this.isBetDetail) {
					this.onGetBetDetailList(group)
				} else {
					this.onGetHisstoryAccountList(group)
				}
			} else {
				group.isShow = false
			}
		},
		async pageChg(page) {
			this.cGroup.page = page
			if (this.isBetDetail) {
				this.onGetBetDetailList(this.cGroup)
			} else {
				this.onGetHisstoryAccountList(this.cGroup)
			}
			this.$toTop()
		}
	},
	computed: {
		cGroup() {
			return this.groups[_.findIndex(this.groups, 'isShow')]
		},
		hasShow() {
			return !!_.find(this.groups, 'isShow')
		},
		total() {
			return {
				betTotal: _.sumBy(this.groups, 'betTotal'),
				betMoney: _.sumBy(this.groups, 'betMoney'),
				winMoney: _.sumBy(this.groups, 'winMoney')
			}
		}
	}
}
