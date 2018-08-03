import { mapActions } from 'vuex'

export default {
	name: 'advertising',
	data: () => ({
		indexNews: []
	}),
	methods: {
		...mapActions(['getNewsIndex']),
		async getIndexNewsTop5() {
			var res = await this.getNewsIndex()
			if (res.code === 0) {
				this.indexNews = res.data
				_.forEach(this.indexNews, news => {
					news.isShowCut = true
					news.act_title_cut = {}
					_.forEach(news.act_title, (title, lang) => {
						news.act_title_cut[lang] = _.cloneDeep(title).cutString(20)
					})
				})
			}
		}
	},
	mounted() {
		this.getIndexNewsTop5()
	}
}
