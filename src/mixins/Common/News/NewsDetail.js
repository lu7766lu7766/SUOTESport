import { mapActions, mapState } from 'vuex'
import News from 'src/mixins/Common/News/News'
export default {
	mixins: [News],
	data: () => ({
		data: {}
	}),
	methods: {
		...mapActions(['getNewsContent']),
		async getContents() {
			let res = await this.getNewsContent({
				act_guid: this.nGuid
			})
			if (res.code === 0 && res.data.data.length) {
				this.data = res.data.data[0]
			}
		}
	},
	computed: {
		...mapState({
			newsCategorys: state => state.News.categorys
		}),
		nGuid() {
			return this.$route.params.nGuid
		}
	},
	async mounted() {
		this.$dataTick(() => {
			this.getContents()
		})
	}
}
