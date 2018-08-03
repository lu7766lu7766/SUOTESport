import { mapState, mapActions, mapGetters } from 'vuex'
import { LoginType } from 'src/store/module/login'
import OuterGameConf from 'src/config/OuterGameConf'

export default {
	methods: {
		downloadAPP() {
			// window.open(this.getDownloadLink())
			location.href = this.getDownloadLink()
		},
		getDownloadLink() {
			if (OuterGameConf[this.type]) {
				return OuterGameConf[this.type].DownloadUrl
			} else {
				return this.platformAppUrl
			}
		}
	},
	computed: {
		...mapGetters({
			platformAppUrl: LoginType.platformAppUrl
		}),
		type() {
			return this.$route.query.type || 'Platform'
		},
		title() {
			// for cash // will be removed
			var title = this.$t(this.type)
			return title == this.type ? 'APP下載平台' : title
		}
	}
}
