<template>
  <div class="page-container memberlogin">
    <form class="col-md-8 col-md-offset-2 form-horizontal member_form">
      <div class="reg_title">
        <span>STEP2 - 輸入驗證碼</span>
      </div>
      <div class="form-group">
        <label for="code" class="col-md-2 col-md-offset-1 control-label required"> 手機認證碼</label>
        <div class="col-sm-6">
          <input type="text" v-model="registerData.p33_rss_auth_sms" class="form-control2" id="code">
          <p v-if="check" class="input-error">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 驗證碼輸入錯誤</p>
        </div>
        <div class="col-md-3 warning_txt"></div>
      </div>
      <div class="form-group">
        <div class="col-md-9 col-md-offset-3">
          <button class="code_btn" v-if="!resetTime" @click="setResetTime">重新獲取驗證碼</button>
          <button class="code_btn" v-else disabled>請稍等 ({{this.second}})</button>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-9 col-md-offset-3">
          <button type="button" @click="checkRegister('cash-mobile-join-member3','cash-mobile-dowonload-teach')" class="btn submit_btn">確定註冊</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Register from 'src/mixins/Platform/Register'

export default {
	name: 'join-member',
	mixins: [Register]
}
</script>
