<template>
  <div class="page-container memberlogin">

    <div class="col-md-8 col-md-offset-2 form-horizontal member_form">
      <div class="reg_title">
        <span>恭喜!! 註冊成功</span>
      </div>

      <div class="form-group">

        <router-link tag="div" :to="{name: 'cash-mobile-index' }" class="col-md-9 col-md-offset-3">
          <button type="submit" class="btn submit_btn">
            <i class="fa fa-life-ring" aria-hidden="true"></i>
            <br> 進入遊戲
          </button>
        </router-link>

      </div>
      <div class="form-group">
        <div class="col-md-9 text-center">
          <span class="c_white">OR</span>
        </div>
      </div>
      <div class="form-group">

        <router-link tag="div" :to="{name: 'cash-mobile-base-info' }" class="col-md-9 col-md-offset-3">
          <button type="button" class="btn submit_btn">
            <i class="fa fa-wrench" aria-hidden="true"></i><br> 修改會員資料</button>
        </router-link>

      </div>

    </div>

  </div>
</template>
  
  <script>
export default {
	name: '',
	data: () => ({})
}
</script>
  
  <style scoped>

</style>