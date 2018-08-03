<template>
  <div id="app">
    <div class="page-container join">
      <div class="container">
        <div class="col-md-8 col-md-offset-2 form-horizontal member_form">
          <div class="reg_title">
            <span>STEP2 - 輸入驗證碼</span>
          </div>
          <div class="form-group">
            <label for="code" class="col-md-2 col-md-offset-1 control-label required"> 手機認證碼</label>

            <div class="col-sm-6">
              <input type="text" v-model="registerData.p33_rss_auth_sms" class="form-control2" id="code">

              <p v-if="check" class="input-error">
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                {{ checkMsg }}
              </p>
            </div>
            <div class="col-md-3 note_txt">
              <button class="code_btn" v-if="!resetTime" @click="setResetTime()">重新獲取驗證碼</button>
              <button class="code_btn" v-else disabled>請稍等 ({{this.second}})</button>
            </div>
            <div class="col-md-3 warning_txt"></div>
          </div>
          <div class="form-group">
            <div class="col-md-6 col-md-offset-3">
              <!-- <button @click="checkRegister('cash-index')" class="code_btn">獲取驗證碼</button> -->
              <button @click="checkRegister('cash-register-step3', 'cash-app-download')" class="code_btn">確定註冊</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script>
import Register from 'src/mixins/Platform/Register'
export default {
	name: '',
	mixins: [Register],
	data: () => ({}),
	mounted() {
		this.registerData.phone = this.$route.query.phone
	}
}
</script>
  
<style scoped>

</style>