<template>
  <section>
    <help-box />
    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="admodal-container">

          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <div class="modal-header">
            <h4 class="modal-title">Modal Header</h4>
          </div>

          <div class="modal-body">
            <img src="/resource/static/platform-sin/images/about-pic2.png" width="460" height="307" alt="" />

            <p>Some text in the modal.</p>
          </div>

        </div>

      </div>
    </div>
    <!-- Back to top button  -->
    <p id="back-top">
      <a href="#top"></a>
    </p>
    <header class="header_box">
      <div class="top">
        <div class="container">
          <div class="pull-left">
            <span class="cookie">
              <span>
                <a class="pointer" @click="checkCleanCache"><img src="/resource/static/platform-sin/images/cookie-icon.png" alt="" />清除暫存</a>
              </span>
            </span>
          </div>
          <span class="user_name">
            <b>{{ userID }}</b>，您好</span>
          <ul class="top_user_info" v-if="isLogin">
            <li>
              <span>
                <router-link class="bt_p" :to="{name: 'sin-message'}">
                  <span>
                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                    站內訊息
                    <span class="btin">{{ unRead }}</span>
                  </span>
                </router-link>
              </span>
            </li>
            <li>
              <span>
                <router-link :to="{name: 'sin-member-base-info'}">
                  <button class="btn btn-out">會員中心</button>
                </router-link>
              </span>
            </li>
            <li>
              <span>
                <button class="btn btn-out" @click="logout">登出</button>
              </span>
            </li>
          </ul>
          <template v-else>
            <span><input v-model="loginID" @keyup.13="myLogin" type="text" class="form-control-login" placeholder="帳號"></span>
            <span><input v-model="loginPwd" @keyup.13="myLogin" type="password" class="form-control-login" placeholder="密碼"></span>
            <span>
              <button type="submit" class="btn btn-login" @click="myLogin">登入</button>
            </span>
          </template>

          <!-- <span>
            <select class="selectpicker b_select" data-width="fit">
              <option data-content=' 繁體中文'>繁體中文</option>
              <option data-content=' 簡体中文'>簡体中文</option>
              <option data-content=' English'>English</option>
            </select>
          </span> -->

          <div class="hidden">
            <div class="modall" id="game_dialog">

              <div class="page-container slot">

                <div class="container">
                  <div class="tab_box">
                    <div class="slot_title">3D電子遊戲</div>

                  </div>
                  <div class="row-no-padding">
                    <div class="col-md-3 col-sm-6">
                      <div class="slotbox clearfix">
                        <div class="slot-image">
                          <img class="cover-image" src="/resource/static/platform-sin/images/slot/3Dslotpic1.png" alt="" />

                          <a href="">
                            <h4>黃金財神</h4>
                            <span>
                              <i></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                      <div class="slotbox clearfix">
                        <div class="slot-image">
                          <img class="cover-image" src="/resource/static/platform-sin/images/slot/3Dslotpic2.png" alt="" />

                          <a href="">
                            <h4>金瓶梅</h4>
                            <span>
                              <i></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                      <div class="slotbox clearfix">
                        <div class="slot-image">
                          <img class="cover-image" src="/resource/static/platform-sin/images/slot/3Dslotpic3.png" alt="" />

                          <a href="">
                            <h4>埃及風火輪</h4>
                            <span>
                              <i></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <nav class="navbar navbar-default menuBar">
        <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle offcanvas-toggle pull-right" data-toggle="offcanvas" data-target="#js-bootstrap-offcanvas" style="float:left;">
              <span class="sr-only">Toggle navigation</span>
              <span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </span>
            </button>
            <router-link class="navbar-brand logo" :to="{name: 'sin-index'}"><img src="/resource/static/platform-sin/images/logo.png" alt=""></router-link>
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="navbar-offcanvas navbar-offcanvas-touch" id="js-bootstrap-offcanvas">

            <ul class="nav navbar-nav menu-list navbar-right">
              <li class="lobby">
                <router-link :to="{ name: 'sin-index' }">遊戲大廳</router-link>
              </li>
              <li class="news">
                <router-link :to="{ name: 'sin-news' }">最新公告</router-link>
              </li>
              <li class="movies">
                <a class="pointer" @click="checkLogin2Video()">影音平台</a>
              </li>
              <li class="faq">
                <router-link :to="{ name: 'sin-faq' }">
                  常見問題
                </router-link>
              </li>

              <li class="p_bt_t dropdown">
                <a href="#" class="dropdown-toggle">會員中心
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu" role="menu">
                  <li>
                    <router-link :to="{name: 'sin-member-base-info'}">個人資料</router-link>
                  </li>
                </ul>
              </li>
            </ul>

          </div>
          <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
      </nav>
      <!--nav end-->
    </header>

  </section>
</template>

<script>
import Login from 'src/mixins/Platform/Login'
import Link from 'src/mixins/Platform/Link'
import UnRead from 'src/mixins/Platform/UnRead'

export default {
	name: 'header',
	mixins: [Link, UnRead, Login],
	methods: {
		async myLogin() {
			this.$bus.emit('close.login.modal')
			await this.login()
		}
	},
	components: {
		LoginModal: require('@/Platform/Credit/Web/shared/LoginModal'),
		BackTop: require('@/shared/BackTop'),
		HelpBox: require('@/shared/HelpBoxSin')
	},
	watch: {
		isLogin(newVal) {
			if (newVal) {
				this.$nextTick(() => {
					$.getScript('/static/script/platform-credit.js')
				})
			}
		}
	}
}
</script>

<style scoped lang="stylus">
div, ul, li
  -webkit-box-sizing initial
  -moz-box-sizing initial
  box-sizing initial
</style>

<style scoped>
.unRead {
	background-color: rgba(239, 204, 0, 0.85);
	border: 0px;
	color: black;
	position: absolute;
	top: -10px;
	right: -10px;
	border-radius: 6px;
	/* -webkit-animation-duration: 3s;
  -webkit-animation-name: box; */
	animation: box 3s infinite;
}

.message span {
	top: -5px;
	right: 0px;
}
.message {
	left: 80px;
	padding: 5px;
}
@keyframes box {
	0% {
		top: -10px;
	}
	30% {
		top: -10px;
	}
	50% {
		top: -20px;
	}
	68% {
		top: -10px;
	}
	100% {
		top: -10px;
	}
}
</style>
