import { mapState, mapActions } from 'vuex'
import News from 'src/mixins/Common/News/News'

export default {
	mixins: [News],
	data: () => ({
		currentCategoryGuid: '',
		indexNews: []
	}),
	methods: {
		...mapActions(['getNewsContent']),
		categoryChange(guid) {
			this.page = 1
			this.currentCategoryGuid = guid
			this.getContents()
		},
		async getContents() {
			var res = await this.getNewsContent({
				page: (this.page - 1) * this.perPage,
				perPage: this.perPage,
				category: this.currentCategoryGuid,
				bch_guid: [this.bchGuid],
				act_bulletin: 1
			})
			if (res.code === 0) {
				this.datas = res.data.data
				this.total = res.data.totalRecord
			} else {
				this.$bus.emit('show.alert', {
					content: this.$t('noResult')
				})
			}
		}
	},
	mounted() {
		// this.$dataTick(() => {
		// 	this.categoryChange(this.newsCategorys.length ? this.newsCategorys[0].acy_guid : '')
		// })
		// 預設取全部
		this.getContents()
	}
}
