<template>
  <section>
    <div class="title">
      <h2>個人資料</h2>
    </div>
    <div class="content">
      <div class="member-content">
        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="tab01-1">
            <div class="act01-form">
              <div class="form-group">
                <label class="control-label" for="inputLarge">會員帳號</label>
                <input class="form-control" disabled v-model="info.account" id="inputLarge" type="text">
              </div>
              <div class="form-group">
                <label class="control-label" for="inputLarge">{{ $t('nickName') }}</label>
                <input class="form-control" v-model="info.p33_ant_profile_name" id="inputLarge" type="text" placeholder="會員暱稱">
              </div>
              <div class="form-group">
                <label class="control-label" for="inputLarge">舊密碼
                  <span class="font-input">(現在的密碼)</span>
                </label>
                <input class="form-control" v-model="info.old_passwd" id="inputLarge" type="password">
              </div>
              <div class="form-group">
                <label class="control-label" for="inputLarge">新密碼
                  <span class="font-input">(4~15碼英文數字組合)</span>
                </label>
                <input class="form-control" v-model="info.p33_ant_passwd" id="inputLarge" type="password">
              </div>
              <div class="form-group">
                <label class="control-label" for="inputLarge">再次確認密碼
                  <span class="font-input">(請再次輸入密碼)</span>
                </label>
                <input class="form-control" id="inputLarge" v-model="info.p33_ant_passwd_confirm" type="password">
              </div>
              <div class="bt-2">
                <div class="member-bt">
                  <button class="btn btn-default">
                    <a href="#">清除</a>
                  </button>
                </div>
                <div class="member-bt">
                  <button @click="postData()" class="btn btn-default">
                    送出
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script>
import mixins from 'src/mixins'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import { mapActions, mapState } from 'vuex'

export default {
	name: '',
	mixins: [mixins, CheckLogin],
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
				}
			})
		}
	},
	mounted() {
		this.info = {
			p33_ant_guid: this.userInfo.account.p33_ant_guid,
			account: this.userInfo.account.p33_ant_account,
			p33_ant_passwd: '',
			p33_ant_passwd_confirm: '',
			bch_id: this.userInfo.account.branch.p32_bch_id,
			p33_ant_profile_name: this.userInfo.account.p33_ant_profile.name
		}
	}
}
</script>