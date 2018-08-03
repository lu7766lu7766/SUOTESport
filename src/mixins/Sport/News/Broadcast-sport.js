import Broadcast from 'src/mixins/Common/News/Broadcast'
export default {
	mixins: [Broadcast],
	methods: {
		getBroadcastContent() {
			if (!(this.newsCategorys && this.newsCategorys.length)) return
			this.getBroadcast({
				category: this.newsCategorys[0].acy_guid,
				bch_guid: [this.bchGuid]
			})
		}
	},
	computed: {
		newsCategorys() {
			return this.$store.state.News.categorys
		}
	},
	created() {
		this.$dataTick(() => {
			this.getBroadcastContent()
		})
	}
}
