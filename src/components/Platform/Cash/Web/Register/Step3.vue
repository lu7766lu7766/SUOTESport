<template>
  <section>
    <div class="page-container join">
      <div class="container">

        <div class="col-md-8 col-md-offset-2 form-horizontal member_form">
          <div class="reg_title">
            <span>恭喜!! 註冊成功</span>
          </div>

          <br>
          <div class="form-group">

            <router-link tag="div" :to="{name: 'cash-index'}" class="col-md-4 col-md-offset-2">
              <p>
                <button type="submit" class="btn submit_btn">
                  <p>
                    <i class="fa fa-2 fa-life-ring" aria-hidden="true"></i>
                  </p>
                  進入遊戲
                </button>
              </p>
            </router-link>
            <router-link tag="div" :to="{name: 'cash-base-info'}" class="col-md-4">
              <p>
                <button type="submit" class="btn submit_btn">
                  <p>
                    <i class="fa fa-2 fa-wrench" aria-hidden="true"></i>
                  </p>修改會員資料
                </button>
              </p>
            </router-link>
          </div>
          <div class="form-group">
            <div class="col-md-9 text-center">
              <span class="c_white">OR</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
  
  <script>
export default {
	name: '',
	data: () => ({})
}
</script>
  
  <style scoped>

</style>