<template>
  <div id="app">
    <div class="pageslide about">
      <div class="container">
        <div class="p-title">
          會員中心
          <span>MEMBER CENTER</span>
        </div>

      </div>
    </div>
    <!--banner end-->
    <div class="breadcrumb-bg">
      <div class="container">
        <ol class="breadcrumb">
          <li>
            <router-link :to="{name: 'sin-mobile-index'}">首頁</router-link>
          </li>
          <li>會員中心</li>
        </ol>
      </div>
    </div>
    <div class="page-container member">
      <div class="container">
        <div class="row-no-padding memberbox">
          <my-menu></my-menu>
          <div class="col-md-9 flex2">
            <form class="col-md-10 col-md-offset-1 form-horizontal member_form">
              <div class="member_title clearfix">
                <span>個人資料</span>

                <ul id="myTab" class="nav nav-tabs tab_list pull-right">
                  <li class="active">
                    <a href="#tab1" data-toggle="tab">基本設定</a>
                  </li>

                </ul>
              </div>
              <div id="myTabContent" class="tab-content">

                <div class="tab-pane fade in active" id="tab1">
                  <div class="form-group">
                    <label for="userId" class="col-md-2 col-md-offset-1 control-label clearfix">會員暱稱</label>

                    <div class="col-md-9">
                      <input type="text" v-model="info.p33_ant_profile_name" class="form-control2" id="userId" placeholder="(6~15碼英文數字組合)">

                    </div>
                  </div>

                  <div class="form-group">
                    <label for="userId" class="col-md-2 col-md-offset-1 control-label">會員帳號</label>

                    <div class="col-md-9">
                      <input type="text" :value="info.account" disabled class="form-control2" id="userId" placeholder="(6~15碼英文數字組合)">

                    </div>
                  </div>

                  <div class="form-group">
                    <label for="password" class="col-md-2 col-md-offset-1 control-label">新密碼</label>

                    <div class="col-md-9">
                      <input type="text" v-model="info.old_passwd" class="form-control2" id="password" placeholder="(6~15碼英文數字組合)">

                    </div>

                  </div>
                  <div class="form-group">
                    <label for="password" class="col-md-2 col-md-offset-1 control-label">密碼確認</label>

                    <div class="col-sm-9">
                      <input type="text" v-model="info.p33_ant_passwd_confirm" class="form-control2" id="password" placeholder="再次輸入密碼">

                    </div>

                  </div>
                  <div class="form-group">
                    <label for="code" class="col-md-2 col-md-offset-1 control-label"></label>

                    <div class="col-md-9 meber-impt">
                      <p class="imp">帳戶修改注意</p>

                      <p>如遇不可抗拒因素，需變更手機號碼，請洽詢
                        <a href="">客服人員</a>!</p>
                    </div>

                  </div>

                  <div class="form-group">
                    <label for="code" class="col-md-2 col-md-offset-1 control-label"></label>

                    <div class="col-md-9">
                      <button @click="postData()" class="btn submit_btn">確定修改</button>
                    </div>

                  </div>
                </div>

              </div>

            </form>

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
	components: {
		MyMenu: require('@/Platform/Sin/Web/MemberCenter/shared/Menu')
	},
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