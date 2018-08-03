import Broadcast from 'src/mixins/Common/News/Broadcast'
export default {
	mixins: [Broadcast],
	methods: {
		getBroadcastContent() {
			this.getBroadcast({
				bch_guid: [this.bchGuid]
			})
		}
	},
	created() {
		if (!this.branch) {
			this.$watchAsObservable('branch').subscribe(x => {
				this.getBroadcastContent()
			})
		} else {
			this.getBroadcastContent()
		}
	}
}
