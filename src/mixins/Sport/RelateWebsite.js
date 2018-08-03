import mLang from 'src/mixins/Common/Lang'
import { mapActions } from 'vuex'
import Link from 'src/mixins/Common/Link'

export default {
	mixins: [mLang, Link],
	data: () => ({
		relateList: []
	}),
	methods: {
		...mapActions(['getRelatedWebSite']),
		webList(catItem) {
			return _.filter(this.relateList.list, { p103_srwd_p103_srwe_id: catItem.p103_srwe_id })
		},
		getFileSrc(subItem) {
			return subItem.p10_files_used[0]
				? this.$fileHost +
						subItem.p10_files_used[0].p10_fud_files_folder +
						'/' +
						subItem.p10_files_used[0].p10_fud_files_name
				: ''
		},
		async relatedInit() {
			let res = await this.getRelatedWebSite({ p103_srwd_status: 3 })
			if (res.code === 0) {
				this.relateList = res.data
			}
		}
	},
	mounted() {
		this.relatedInit()
	}
}
