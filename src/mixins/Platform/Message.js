import { mapActions } from 'vuex'
import mixins from 'src/mixins'

export default {
	mixins: [mixins],
	data: () => ({
		datas: [],
		page: 1,
		total: 0,
		perPage: 20
	}),
	methods: {
		...mapActions(['getMemberNotify', 'setMessageRead', 'delMessages']),
		async getDatas() {
			var res = await this.getMemberNotify({
				perPage: this.perPage,
				page: this.page
			})
			if (res.code === 0) {
				this.total = res.data.totalRecord
				_.forEach(res.data.content, data => {
					data.isChecked = false
					data.isShowContent = false
					return data
				})
				this.datas = res.data.content
			}
		},
		pageChg(page) {
			this.page = page
			this.getDatas()
		},
		async messageToggle(index) {
			let data = this.datas[index]
			data.isShowContent = !data.isShowContent
			if (!data.nrs_is_read) {
				var res = await this.setMessageRead({
					nrs_account_guid: this.userInfo.account.p33_ant_guid,
					nrs_content_guid: data.nct_content_guid,
					nrs_is_read: 1
				})
				if (res.code === 0) {
					this.$bus.emit('update.unRead')
					data.nrs_is_read = 1
					data.nrs_read_status_id = res.data.id
				}
			}
		},
		async onDelMessages() {
			var checkedDatas = _.filter(this.datas, 'isChecked')
			if (checkedDatas.length == 0) return

			var isSure = await this.$swal({
				title: '確定刪除？',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: '確定',
				cancelButtonText: '取消'
			}).catch(err => { })
			if (isSure) {
				var res = await this.delMessages({
					id: _.map(checkedDatas, 'nrs_read_status_id')
				})
				if (res.code === 0) {
					this.getDatas()
				}
			}
		}
	},
	computed: {
		isAllChecked: {
			get() {
				var readDatas = _.filter(this.datas, 'nrs_is_read')
				return readDatas.length > 0 &&
					_.filter(this.datas, 'isChecked').length >= readDatas.length
			},
			set(val) {
				_.forEach(this.datas, data => {
					data.isChecked = data.nrs_is_read ? val : data.isChecked
				})
			}
		},
		lastPage() {
			return Math.ceil(this.total / this.perPage)
		}
	},
	mounted() {
		this.getDatas()
	}
}
