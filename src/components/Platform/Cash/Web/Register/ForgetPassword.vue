<template>
  <div id="app">
    <div class="page-container join">
      <div class="container">
        <div class="col-md-8 col-md-offset-2 form-horizontal member_form">
          <div class="reg_title">
            <span>忘記密碼</span>
          </div>

          <div class="form-group">
            <label for="phone" class="col-md-2 col-md-offset-1 control-label required">註冊手機</label>

            <div class="col-md-7">
              <input v-model="postData.p33_ant_mobile" type="text" class="form-control2" id="phone">
              <!-- p class="input-error"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 手機輸入錯誤</p -->
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-7 col-md-offset-3">
              <button class="btn submit_btn" @click="sendForgetMsg">
                確認送出
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
  
  <script>
import forget from 'src/mixins/Platform/Forget'
export default {
	name: '',
	mixins: [forget],
	data: () => ({}),
	mounted() {}
}
</script>
  
  <style scoped>

</style>