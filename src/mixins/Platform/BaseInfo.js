import Bank from 'src/mixins/Platform/Bank'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import mixins from 'src/mixins'
import { mapActions } from 'vuex'

export default {
	mixins: [Bank, mixins, CheckLogin],
	data: () => ({
		info: {},
		insertBankAccount: false
	}),
	methods: {
		...mapActions(['postPersonalInfo', 'doUpload']),
		postData() {
			this.postPersonalInfo(this.info).then(res => {
				if (res.code === 0) {
					this.$bus.emit('show.alert', {
						content: '修改成功'
					})
				} else {
					this.$bus.emit('show.alert', {
						content: '修改失敗'
					})
				}
			})
		},
		initInfo() {
			this.info = {
				p33_ant_guid: this.userInfo.account.p33_ant_guid,
				account: this.userInfo.account.p33_ant_account,
				p33_ant_passwd: '',
				p33_ant_passwd_confirm: '',
				bch_id: this.userInfo.account.branch.p32_bch_id,
				p33_ant_profile_name: this.userInfo.account.p33_ant_profile.name,
				old_passwd: '',
				p33_ant_profile_lineId: this.userInfo.account.p33_ant_profile.p33_ant_profile_lineId,
				p33_ant_profile_wechatId: this.userInfo.account.p33_ant_profile.p33_ant_profile_wechatId
			}
		}
	},
	mounted() {
		this.initInfo()
		this.getMyBank()
	}
}
