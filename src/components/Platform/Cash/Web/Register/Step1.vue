<template>
	<div id="app">
		<div class="page-container join">
			<div class="container">
				<div class="col-md-8 col-md-offset-2 form-horizontal member_form">
					<div class="reg_title">
						<span>STEP1 - 填寫會員手機號碼</span>
					</div>
					<div class="form-group">
						<label for="phone" class="col-md-2 col-md-offset-1 control-label required">會員手機</label>

						<div class="col-md-6">
							<input type="text" v-model="registerData.phone" class="form-control2" id="phone">
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
						<label for="code" class="col-md-2 col-md-offset-1 control-label"></label>
						<div class="col-md-9 meber-impt">
							<p class="imp">注意事項：</p>
							<span class="upload-info">
								帳號密碼會與驗證碼一併傳送至手機，若無收到請洽
								<a @click="checkService2Link()">客服</a>
								確認。
							</span>
							<br>
							<!-- <span class="upload-info">
								為了確保您的權益, 建議填寫 lineID 或 wechatID,日後派發獎金或獎品時, 會透過您所留下的通訊軟體通知
							</span> -->
						</div>
					</div>
					<div class="form-group">
						<div class="col-md-6 col-md-offset-3">
							<button @click="getSmsAndToStep2('cash-register-step2')" class="code_btn">獲取驗證碼</button>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
  
<script>
import Register from 'src/mixins/Platform/Register'
import Link from 'src/mixins/Common/Link'
export default {
	mixins: [Register, Link]
}
</script>
