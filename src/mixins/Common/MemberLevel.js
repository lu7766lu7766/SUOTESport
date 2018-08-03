import { mapActions, mapState, mapGetters } from 'vuex'
import { LoginType } from 'src/store/module/login'

export default {
	methods: {
		...mapActions(['getMemberLevel']),
		async onGetMemberLevel() {
			var res = await this.getMemberLevel()
			if (res.code === 0) {
				this.$store.commit(LoginType.loginSuccess, { memberLevel: res.data })
			}
		}
	},
	computed: {
		...mapState({
			memberLevel: state => state.Login.userInfo.memberLevel || {}
		}),
		...mapGetters({
			hasMemberLevel: LoginType.hasMemberLevel
		})
	}
}
