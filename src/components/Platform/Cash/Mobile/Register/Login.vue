<template>
  <div class="page-container memberlogin">
    <div class="modall" id="login_dialog">
      <div class="login_dialog_title">
        <span>
          <i><img src="/resource/static/platform-cash-mobile/images/login_dialog.png" alt=""></i>會員登入 / LOGIN</span>
      </div>
      <div id="loginTabContent" class="tab-content">
        <!-- 手機登入 -->

        <div class="tab-pane fade in active" id="login2">
          <form class="form-horizontal login_dialog_form" method="post" action="member.html">
            <div class="form-group">
              <div class="col-md-12">
                <input type="text" class="form-control" :placeholder="$t('accountOrPhone')" v-model="loginID" @keyup.13="myLogin">
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <input type="password" class="form-control" :placeholder="$t('password')" v-model="loginPwd" @keyup.13="myLogin">
              </div>
            </div>

            <div class="form-group">
              <div class="col-md-12 page_form_btn">
                <button type="button" @click="myLogin" class="btn btn-primary">{{ $t('login') }}</button>
              </div>
            </div>
            <div class="login_link">
              <router-link class="pull-left" :to="{ name: 'cash-mobile-forget-password'}">忘記帳號/密碼?</router-link>
              <span class="pull-right">還不是會員嗎?
                <router-link :to="{ name: 'cash-mobile-join-member' }">加入會員</router-link>
              </span>
            </div>
          </form>
        </div>
        <!--tab2-->
        <!-- 帳號登入 -->

      </div>

    </div>
    <div class="copyright">皇璽會 Copyright © 2017</div>
  </div>
</template>

<script>
import { LoginType } from 'src/store/module/login'
import Login from 'src/mixins/Platform/Login'

export default {
	name: 'login',
	mixins: [Login],
	data: () => ({
		type: 'cashMember'
	}),
	methods: {
		async myLogin() {
			await this.login()
			if (this.isLogin) {
				this.$router.push({ name: 'cash-mobile-index' })
			}
		}
	}
}
</script>