<template>
  <div class="page-container memberlogin">
    <form class="col-md-8 col-md-offset-2 form-horizontal member_form">
      <div class="reg_title">
        <span>STEP1 - 填寫會員手機號碼</span>
      </div>
      <div class="form-group">
        <label for="phone" class="col-md-2 col-md-offset-1 control-label required">會員手機</label>

        <div class="col-md-6">
          <input type="text" v-model="registerData.phone" class="form-control2" id="phone" required>
          <!-- p class="input-error"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 手機輸入錯誤</p -->
        </div>
      </div>
      <div class="form-group">
          <label for="check_pwd" class="col-md-2 col-md-offset-1 control-label">Line ID</label>

          <div class="col-md-6">
            <input type="text" v-model="registerData.p33_ant_profile_lineId" class="form-control2">

          </div>
        </div>
        <div class="form-group">
          <label for="check_pwd" class="col-md-2 col-md-offset-1 control-label">WeChat ID</label>

          <div class="col-md-6">
            <input type="text" v-model="registerData.p33_ant_profile_wechatId" class="form-control2">

          </div>
        </div>
      <div class="form-group">
        <label for="code" class="col-md-2 control-label"></label>
        <div class="col-md-9 meber-impt">
          <p class="imp">若無收到驗證碼請洽客服確認</p>
        </div>
      </div>
      <!-- <div class="form-group">
        <label for="code" class="col-md-2 control-label"></label>
        <div class="col-md-9 meber-impt">
          <p class="imp">為了確保您的權益, 建議填寫 lineID 或 wechatID,日後派發獎金或獎品時, 會透過您所留下的通訊軟體通知</p>
        </div>
      </div> -->
      <div class="form-group">
        <div class="col-md-9 col-md-offset-3">
          <button type="button" @click="getSmsAndToStep2('cash-mobile-join-member2')" class="btn submit_btn">獲取驗證碼</button>
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
