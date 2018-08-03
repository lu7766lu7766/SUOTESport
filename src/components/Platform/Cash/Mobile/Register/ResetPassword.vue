<template>
	<div class="page-container memberlogin">

		<div class="col-md-8 col-md-offset-2 form-horizontal member_form">
			<div class="reg_title">
				<span>重設密碼</span>
			</div>

			<div class="form-group">
				<label for="pswd" class="col-md-2 col-md-offset-1 control-label required">輸入密碼</label>

				<div class="col-md-9">
					<input type="password" v-model="p33_ant_passwd" class="form-control2" id="pswd" placeholder="請輸入密碼">

				</div>
			</div>

			<div class="form-group">
				<label for="pswdcheck" class="col-md-2 col-md-offset-1 control-label required">確認密碼</label>

				<div class="col-md-6">
					<input type="password" v-model="p33_ant_passwd_confirm" class="form-control2" id="pswdcheck" placeholder="請輸入密碼">
					<!-- p class="input-error"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 手機輸入錯誤</p -->
				</div>
			</div>

			<div class="form-group">
				<div class="col-md-9 col-md-offset-3">
					<button @click="resetPassword" class="btn submit_btn">確定</button>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	methods: {
		...mapActions(['doResetPassword']),
		async resetPassword() {
			let res = await this.doResetPassword({
				code: this.code,
				p33_ant_passwd: this.p33_ant_passwd,
				p33_ant_passwd_confirm: this.p33_ant_passwd_confirm
			})
			if (this.p33_ant_passwd_confirm === this.p33_ant_passwd) {
				if (res.code === 0) {
					this.$bus.emit('show.alert', {
						content: '修改成功'
					})
					this.$router.push({ name: 'cash-mobile-login' })
				} else {
					this.$bus.emit('show.alert', {
						content: '修改失敗'
					})
				}
			} else {
				this.$bus.emit('show.alert', {
					content: '確認密碼 必須和 密碼 相同'
				})
			}
		}
	},
	data() {
		p33_ant_passwd:''
	},
	computed: {
		code() {
			return this.$route.query.code
		}
	}
}
</script>