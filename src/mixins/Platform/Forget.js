import { mapActions } from 'vuex'

export default {
	data() {
		return {
			postData: {
				p33_ant_mobile: '',
				url: this.$router.match({ name: 'cash-mobile-reset-password' }).path
			},
			p33_ant_passwd: '',
			p33_ant_passwd_confirm: ''
		}
	},
	methods: {
		...mapActions(['getRestPassword', 'getRestPasswordCheck']),
		async sendForgetMsg() {
			let res = await this.getRestPassword(this.postData)
			if (res.code === 0) {
				this.$bus.emit('show.alert', {
					content: '已寄出簡訊'
				})
			} else {
				this.$bus.emit('show.alert', {
					content: '發送失敗'
				})
			}
		}
	}
}
