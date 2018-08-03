import Sports from 'src/mixins/Sport/Sports'
import MobilePager from 'src/mixins/Common/MobilePager'
import { mapActions } from 'vuex'

export default {
	mixins: [Sports, MobilePager],
	data: () => ({
		datas: [],
		page: 1,
		perPage: 100,
		lastPage: 0,
		timer: null
	}),
	methods: {
		...mapActions(['getMultiEvent']),
		/**
		 * 手機版會顯示多頁資料，所以資料可能需要批次更新
		 * refresh會清空資料
		 * timesup僅更新資料
		 */
		onRefresh() {
			// 需求變化，所以返回第一頁，清空資料，重新加入新的資料(頁面重整)
			this.datas = []
			this.page = 1
			this.showSec = this.waitSec
			this.onGetSets()
		},
		onTimesUp() {
			// 資料更新，不清空，全數更新
			this.showSec = this.waitSec
			this.onGetMultiPageSeps()
		},
		async onGetSets() {
			this.isEventLoading = true
			var res = await this.getMultiEvent(this.getReqData())
			if (res.code === 0) {
				this.datas = _.concat(
					_.cloneDeep(this.datas),
					_.map(res.data.data, data => {
						this.proccessSeps(data.plays)
						return data
					})
				)
				this.lastPage = Math.ceil(res.data.total / this.perPage)
			}
			this.isEventLoading = false
		},
		onGetMultiPageSeps() {
			this.isEventLoading = true
			var baseData = this.getReqData() // 記得要各自定義
			this.axios
				.all(
					_.reduce(
						_.range(1, this.page + 1),
						(result, page) => {
							baseData.page = page
							result.push(this.getMultiEvent(_.cloneDeep(baseData)))
							return result
						},
						[]
					)
				)
				.then(res => {
					// 把所有頁取回來的資料平面化變sets
					this.datas = _.map(
						_.flatten(_.map(res, seps => (seps.code === 0 ? seps.data.data : []))),
						setData => {
							this.proccessSeps(setData.plays)
							return setData
						}
					)
					this.isEventLoading = false
				})
		}
	},
	created() {
		this.$bus.on('scroll.bottom', () => {
			this.onScrollBottom(
				() => {
					this.onGetSets()
				},
				this,
				$('main')
			)
		})

		var onCounting = () => {
			this.showSec = this.waitSec
			this.timer = setInterval(() => {
				if (--this.showSec === 0) {
					this.onTimesUp()
				}
			}, 1000)
		}
		onCounting()
	},
	destroyed() {
		clearInterval(this.timer)
		this.$bus.off('scroll.bottom')
	}
}
