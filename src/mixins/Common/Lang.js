import { LoginType } from 'src/store/module/login'

export default {
	methods: {
		setLang(lang) {
			this.$store.dispatch(LoginType.SET_LANG, { lang })
		}
	},
	computed: {
		lang() {
			return this.$store.state.Login.lang
		},
		langs() {
			return this.$store.getters[LoginType.langs]
		}
	}
}
