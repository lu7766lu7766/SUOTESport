import mixins from 'src/mixins'
import { mapActions } from 'vuex'
export default {
	mixins: [mixins],
	data: () => ({
		FAQCategorys: [],
		FAQContents: [],
		cCategoryID: '',
		FAQTitle: {},
		perPage: 20,
		lastPage: 0,
		paginator: {},
		page: 1
	}),
	methods: {
		...mapActions(['getFAQCategoryList', 'getFAQContentList']),
		onCategoryChange(id) {
			const category = _.find(this.FAQCategorys, { id: +id })
			if (category) {
				this.cCategoryID = category.id
				this.FAQTitle = category.title
			} else {
				this.cCategoryID = ''
				this.FAQTitle = {}
			}
		},
		async onGetFAQContestList() {
			var res = await this.getFAQContentList({
				status: 3,
				branchId: [this.branch.p32_bch_id],
				categoryId: this.cCategoryID,
				page: this.page,
				perpage: this.perPage
			})
			if (res.code === 0 && res.data.manage) {
				this.FAQContents = res.data.manage
				this.lastPage = res.data.paginator.totalPage
			}
		},
		pageChg(page) {
			this.page = page
			this.onGetFAQContestList()
		}
	},
	watch: {
		cCategoryID() {
			this.FAQContents = []
			this.page = 1
			this.lastPage = 0
			this.onGetFAQContestList()
		}
	},
	async created() {
		this.onGetFAQContestList()
		var res = await this.getFAQCategoryList({
			status: 3,
			branchId: [this.branch.p32_bch_id]
		})
		if (res.code === 0) {
			this.FAQCategorys = res.data.category
			// if (this.FAQCategorys && this.FAQCategorys.length) {
			// 	this.cCategoryID = this.FAQCategorys[0].id
			// 	this.FAQTitle = this.FAQCategorys[0].title
			// }
		}
	}
}
