<template>
	<div class="login-content">
		<div class="member-content">
			<!--<form class="act01-form">-->
			<div class="form-group">
				<label class="control-label" for="inputLarge">帳號</label>
				<input class="form-control" :placeholder="$t('account')" v-model="loginID" @keyup.13="myLogin" id="inputLarge" type="text">
			</div>
			<div class="form-group">
				<label class="control-label" for="inputPwdLarge">密碼</label>
				<input class="form-control" :placeholder="$t('password')" v-model="loginPwd" @keyup.13="myLogin" id="inputPwdLarge" type="password">
			</div>
			<div class="login-bt">
				<button @click="myLogin" class="btn btn-default">
					{{ $t('login') }}
				</button>
			</div>
			<!--</form>-->
		</div>
	</div>
</template>
  
<script>
import { LoginType } from 'src/store/module/login'
import Login from 'src/mixins/Platform/Login'

export default {
	mixins: [Login],
	methods: {
		async myLogin() {
			await this.login()
			if (this.isLogin) {
				this.$router.push({ name: 'credit-mobile-index' })
			}
		}
	}
}
</script>
  
<style scoped>
.login-content {
	margin-top: 100px;
}
.copyright2 {
	margin-top: 150px;
}
</style>