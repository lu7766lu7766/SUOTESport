import { mapState, mapGetters } from 'vuex'
import { LoginType } from 'src/store/module/login'

export default {
	methods: {
		collapse(ref) {
			$(this.$refs[ref]).collapse('toggle')
		},
		showTab(target) {
			$(target).tab('show')
		}
	},
	computed: {
		...mapState({
			isDataInit: 'isDataInit',
			isLoading: 'isLoading',
			leagues: 'leagues',
			categorys: 'categorys',
			lang: state => state.Login.lang,
			branch: state => state.Login.branch,
			branchTitle: state => state.Login.title,
			isLogin: state => state.Login.isLogin,
			isMobile: state => state.Info.isMobile,
			userInfo: state => state.Login.userInfo
		}),
		...mapGetters({
			branchType: LoginType.branchType
		}),
		account() {
			return this.userInfo ? this.userInfo.account : {}
		},
		userName() {
			return this.account && this.account.p33_ant_profile ? this.account.p33_ant_profile.name : this.$t('guest')
		},
		userID() {
			return this.account ? this.account.p33_ant_account : this.$t('guest')
		}
	}
}
