<template>
  <div class="modal fade modal-center" id="login_dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="myModalLabel">會員登錄</h4>
        </div>
        <!-- /.modal-header -->
        <div class="modal-body">
          <form role="form">
            <div class="form-group">
              <div class="input-group">
                <input type="text" class="form-control" id="uLogin" placeholder="帳號" v-model="loginID" @keyup.13="myLogin">
                <label for="uLogin" class="input-group-addon glyphicon glyphicon-user"></label>
              </div>
            </div>
            <!-- /.form-group -->

            <div class="form-group">
              <div class="input-group">
                <input type="password" class="form-control" id="uPassword" placeholder="密碼" v-model="loginPwd" @keyup.13="myLogin">
                <label for="uPassword" class="input-group-addon glyphicon glyphicon-lock"></label>
              </div>
              <!-- /.input-group -->
            </div>
            <!-- /.form-group -->

            <!--<div class="forget">
                        <a href="#">
                          <span class="icon-forget"></span> 忘記密碼</a>
                      </div>-->
            <!-- /.checkbox -->
          </form>
        </div>
        <!-- /.modal-body -->
        <div class="modal-footer">
          <button type="button" class="form-control btn btn-primary" @click="myLogin">登錄</button>

          <div class="progress">
            <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="100" style="width: 0%;">
              <span class="sr-only">progress</span>
            </div>
          </div>
        </div>
        <!-- /.modal-footer -->

      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>

<script>
import Login from 'src/mixins/Platform/Login'
import { LoginType } from 'src/store/module/login'

export default {
	mixins: [Login],
	methods: {
		async myLogin() {
			this.$bus.emit('close.login.modal')
			await this.login()
		}
	},
	mounted() {
		this.$bus.on('close.login.modal', () => {
			$('#login_dialog').modal('hide')
		})
		this.$bus.on('open.login.modal', () => {
			$('#login_dialog').modal('show')
		})
	},
	destroyed() {
		this.$bus.off('close.login.modal')
		this.$bus.off('open.login.modal')
	}
}
</script>

<style scoped>
.modal-center {
	padding-right: 0 !important;
}
.modal-center .modal-dialog {
	margin: 10px auto;
}
</style>