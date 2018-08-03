import { mapState } from 'vuex'
import mixins from 'src/mixins'

export default {
	mixins: [mixins],
	components: {
		MyPager: require('@/shared/MyPager')
	},
	data: () => ({
		page: 1,
		total: 0,
		perPage: 20,
		datas: []
	}),
	methods: {
		// view
		getTagNameByGuid(guid) {
			const tag = _.find(this.newsTags, ['atg_guid', guid])
			return tag ? tag['atg_name'][this.lang] : ''
		},
		// getCategoryNameByGuid(guid) {
		// 	const category = _.find(this.newsCategorys, ['acy_guid', guid])
		// 	return category ? category['acy_name'][this.lang] : ''
		// },
		// data
		pageChg(page) {
			this.page = page
			this.getContents()
		}
	},
	computed: {
		...mapState({
			newsTags: state => state.News.tags,
			newsCategorys: state => state.News.categorys
		}),
		lastPage() {
			return Math.ceil(this.total / this.perPage)
		},
		bchGuid() {
			return this.branch ? this.branch.p32_bch_guid : ''
		}
	}
}
