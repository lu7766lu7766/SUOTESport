<template>
  <!-- <div class="hidden">
    <div class="modall" id="login_dialog">
      <div class="login_dialog_title">
        <span>
          <i><img src="/resource/static/platform-cash/images/login_dialog.png" alt=""></i>{{ $t('memberLogin') }} / LOGIN</span>
      </div>
      <form class="form-horizontal login_dialog_form" method="post" action="member.html">

        <div class="form-group">
          <div class="col-xs-12">
            <input type="text" class="form-control" :placeholder="$t('account')" v-model="loginID" @keyup.13="myLogin">
          </div>
        </div>
        <div class="form-group">
          <div class="col-xs-12">
            <input type="password" class="form-control" :placeholder="$t('password')" v-model="loginPwd" @keyup.13="myLogin">
          </div>
        </div>
        <div class="form-group">
          <div class="col-xs-12 page_form_btn">
            <button type="button" @click="myLogin" class="btn btn-primary">{{ $t('login') }}</button>
          </div>
        </div>
      </form>

    </div>
  </div> -->
  <div class="hidden">
    <div class="modall" id="login_dialog" style="display:none">
      <div class="login_dialog_title">
        <span>
          <i><img src="/resource/static/platform-cash/images/login_dialog.png" alt=""></i>會員登入 / LOGIN</span>
      </div>
      <div id="loginTabContent" class="tab-content">

        <!--tab1-->
        <!-- 手機登入 -->

        <div class="tab-pane fade in active" id="login2">
          <form class="form-horizontal login_dialog_form" method="post" action="member.html">
            <div class="form-group">
              <div class="col-md-12">
                <input id="accout" type="text" class="form-control" :placeholder="$t('accountOrPhone')" v-model="loginID" @keyup.13="myLogin">
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
              <span class="pull-left">
                <a href="#" @click="goForget">忘記帳號/密碼?</a>
              </span>
              <span class="pull-right">還不是會員嗎?
                <a href="#" @click="joinMember">加入會員</a>
              </span>
            </div>
          </form>
        </div>
        <!--tab2-->
        <!-- 帳號登入 -->

      </div>

    </div>
  </div>
</template>

<script>
import Login from 'src/mixins/Platform/Login'

export default {
	name: 'login-modal',
	mixins: [Login],
	data: () => ({
		type: 'cashMember'
	}),
	methods: {
		async myLogin() {
			this.$bus.emit('close.login.fancybox')
			await this.login()
		},
		joinMember() {
			this.$bus.emit('close.login.fancybox')
			this.$router.push({ name: 'cash-register-check' })
		},
		goForget() {
			this.$bus.emit('close.login.fancybox')
			this.$router.push({ name: 'cash-forget-pswd' })
		}
	},
	mounted() {}
}
</script>

<style scoped>
/*.captcha {
    margin: 5px 0;
    background-size: 50% 50%;
    background: linear-gradient(135deg, rgba(70, 160, 221, 0.7)25%, rgba(235, 220, 194, 0.8)77%); 
    background: -moz-linear-gradient(135deg, rgba(70, 160, 221, 0.7)25%, rgba(235, 220, 194, 0.8)77%); 
    background: -webkit-linear-gradient(135deg, rgba(70, 160, 221, 0.7)25%, rgba(235, 220, 194, 0.8)77%); 
    background: -o-linear-gradient(135deg, rgba(70, 160, 221, 0.7)25%, rgba(235, 220, 194, 0.8)77%); 
    cursor: pointer;
  }


  .captcha-light {
    position: absolute;
    z-index: 3;
    width: 57;
    height: 32;
    left: -1%;
    top: -1%;
    border-radius: 50%;
    box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, .3);
  }*/
.pull-right {
	float: inherit !important;
}
</style>