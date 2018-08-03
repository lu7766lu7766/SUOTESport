<template>
  <section>
    <div class="reg_title">
      <span>忘記密碼</span>
    </div>
    <div class="col-md-10 col-md-offset-1 form-horizontal member_form">
      <div class="tab-pane fade in active" id="tab1">
        <div class="form-group">
          <label for="phone" class="col-md-2 col-md-offset-1 control-label required">註冊手機</label>

          <div class="col-md-7">
            <input type="text" v-model="postData.p33_ant_mobile" class="form-control2" id="phone">
            <!-- p class="input-error"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 手機輸入錯誤</p -->
          </div>
        </div>

        <div class="form-group">

          <div class="col-md-9">
            <button @click="sendForgetMsg" class="btn submit_btn">
              確定送出
            </button>
          </div>

        </div>

        <div class="copyright">皇璽會 Copyright © 2017</div>
      </div>
    </div>
  </section>

</template>

<script>
import forget from 'src/mixins/Platform/Forget'
export default {
	name: 'forget-password',
	mixins: [forget]
}
</script>