<template>
  <div id="app">
    <div class="banner-member-01">
      <div class="row">
        <div class="title">
          <h1>個人資料</h1>
          <span>Member</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <div class="page_txtBox">
          <div class="tab_container memberTabs_container">
            <div id="membertab1" class="tab_content">
              <form class="form-horizontal member_form member_formTwoCol" style="max-width: 520px; margin:0 auto;">
                <div class="form-group">
                  <label class="col-sm-2 control-label member_title">會員暱稱</label>
                  <div class="col-sm-12 member_content">
                    <input type="text" v-model="info.p33_ant_profile_name" class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label member_title">會員帳號</label>
                  <div class="col-sm-7 member_content">
                    <input type="text" class="form-control" v-model="info.account" disabled>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label member_title">舊密碼</label>
                  <div class="col-sm-7 member_content">
                    <input type="password" v-model="info.old_passwd" class="form-control" placeholder="(現在的密碼)">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label member_title">新密碼</label>
                  <div class="col-sm-7 member_content">
                    <input type="password" v-model="info.p33_ant_passwd" class="form-control" placeholder="(6~15碼英文數字組合)">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label member_title">密碼確認</label>
                  <div class="col-sm-7 member_content">
                    <input type="password" v-model="info.p33_ant_passwd_confirm" class="form-control" placeholder="(請再次輸入密碼)">
                  </div>
                </div>
                <div class="form-group text-center">
                  <div class="page_form_btn">
                    <button type="reset" class="btn btn-default">清除</button>
                    <button type="button" @click="postData()" class="btn btn-default">送出</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import mixins from 'src/mixins'
import { mapActions } from 'vuex'

export default {
	name: '',
	mixins: [CheckLogin, mixins],
	data: () => ({
		info: {}
	}),
	methods: {
		...mapActions(['postPersonalInfo']),
		postData() {
			this.postPersonalInfo(this.info).then(res => {
				if (res.code === 0) {
					this.$bus.emit('show.alert', {
						content: '修改成功'
					})
				} else {
					this.$bus.emit('show.alert', {
						content: '修改失敗'
					})
				}
			})
		},
		async loadInfo() {
			this.info = {
				p33_ant_guid: this.userInfo.account.p33_ant_guid,
				account: this.userInfo.account.p33_ant_account,
				p33_ant_passwd: '',
				p33_ant_passwd_confirm: '',
				bch_id: this.userInfo.account.branch.p32_bch_id,
				p33_ant_profile_name: this.userInfo.account.p33_ant_profile.name
			}
		}
	},
	mounted() {
		this.loadInfo()
	}
}
</script>
  
<style scoped>

</style>