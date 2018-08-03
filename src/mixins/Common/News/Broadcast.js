import { mapActions } from 'vuex'

export default {
	components: {
		NewsBox: require('@/shared/NewsBox')
	},
	data: () => ({
		times: 0,
		broadcasts: [],
		changeSecs: 15,
		timer: null
	}),
	methods: {
		...mapActions({
			getNewsContent: 'getNewsContent'
		}),
		// 廣播跑馬燈
		async getBroadcast(data) {
			var res = await this.getNewsContent(
				_.merge(data, {
					is_marquee: 1
				})
			)
			if (res.code === 0 && res.data.data.length) {
				this.broadcasts = res.data.data
			}
		}
	},
	computed: {
		lang() {
			return this.$store.state.Login.lang
		},
		bchGuid() {
			return this.branch ? this.branch.p32_bch_guid : ''
		},
		content() {
			if (this.filterBroadcasts.length) {
				return this.filterBroadcasts[this.times % this.filterBroadcasts.length].act_title[this.lang]
			}
			return ''
		},
		filterBroadcasts() {
			return _.filter(this.broadcasts, news => news.act_title[this.lang])
		}
	},
	mounted() {
		this.timer = setInterval(() => {
			this.times++
		}, this.changeSecs * 1000)
	},
	destroyed() {
		clearInterval(this.timer)
	}
}
