<template>
  <section>
    <help-box />
    <div class="wrapper">
      <back-top />
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" @click="collapse('navigation')">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <router-link :to="{ name: 'credit-index' }" class="navbar-brand logo">
              <img src="/resource/static/platform-credit/images/logo.png">
            </router-link>
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" ref="navigation">
            <ul class="nav navbar-nav navbar-right admin">
              <li v-if="!isLogin">
                <a href="#" class="admin-out" @click="$bus.emit('open.login.modal')">
                  <span class="icon-users"></span> 會員登錄</a>
              </li>
              <li v-if="isLogin" class="dropdown">
                <a href="#" class="dropdown-toggle admin-in" data-toggle="dropdown">
                  {{ userID }}
                  <div class="message-outsize" v-if="unRead">
                    <span v-if="unRead < 100">{{ unRead.PadLeft(2) }}</span>
                    <span v-else>99+</span>
                  </div>
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu" role="menu" style="margin-bottom: -20px;">
                  <li>
                    <router-link :to="{ name: 'credit-message' }">站內訊息</router-link>
                    <div class="message" v-if="unRead" style="box-sizing:initial">
                      <span style="margin-left:-2px" v-if="unRead < 100">{{ unRead.PadLeft(2) }}</span>
                      <span style="margin-left:-2px" v-else>99</span>
                    </div>
                  </li>
                  <li>
                    <router-link :to="{name: 'credit-member-wallet'}">錢包資訊</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'credit-member-base-info'}">個人資料</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'credit-member-betdetail-report'}">投注明細</router-link>
                  </li>
                  <li>
                    <a class="pointer" @click="logout">登出</a>
                  </li>
                </ul>
              </li>
            </ul>
            <login-modal />
            <ul class="nav navbar-nav menu">
              <li>
                <router-link :to="{ name: 'credit-index' }">
                  <span class="icon-game-1 menu-icon"></span> 遊戲大廳
                </router-link>
              </li>
              <!-- <li>
              <ul class="dropdown-menu">
                <li><a href="#">真人視訊</a></li>
                <li><a href="#">體育博彩</a></li>
                <li><a href="#">黃金期權</a></li>
                <li><a href="#">電子遊戲<span class="caret"></span></a>
                  <ul class="dropdown-menu">
                      <li><a href="#">武士道</a></li>
                      <li><a href="#">金錢貓</a></li>
                      <li><a href="#">百鬼夜行</a></li>
                  </ul>
                </li>
                <li><a href="#" @click="checkLogin2Golden">彩票</a></li>
                <li><a href="#" @click="toBeContinued">彩球</a></li>
                <li><a href="#" @click="toBeContinued">對戰棋牌類</a></li>
               </ul>
            </li> -->
              <li>
                <router-link :to="{ name: 'credit-news' }">
                  <span class="icon-news menu-icon"></span> 最新公告
                </router-link>
              </li>
              <li>
                <a href="javascript: void(0)" @click="checkLogin2Video()">
                  <span class="icon-movie menu-icon"></span> 影音平台
                </a>
              </li>
              <li>
                <router-link :to="{ name: 'credit-faq' }">
                  <span class="icon-news menu-icon"></span> 常見問題
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'credit-app-download' }">
                  <span class="icon-mobile menu-icon"></span> 手機投注
                </router-link>
              </li>
              <li>
                <a class="pointer" target="_blank" @click="checkService2Link()">
                  <span class="icon-service menu-icon"></span> 線上客服</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import Login from 'src/mixins/Platform/Login'
import Link from 'src/mixins/Platform/Link'
import UnRead from 'src/mixins/Platform/UnRead'

export default {
	name: 'header',
	mixins: [Link, UnRead, Login],
	components: {
		LoginModal: require('@/Platform/Credit/Web/shared/LoginModal'),
		BackTop: require('@/shared/BackTop'),
		HelpBox: require('@/shared/HelpBoxCredit')
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

<style scoped>
.message span {
	top: -5px;
	right: 0px;
}
.message {
	left: 80px;
	padding: 5px;
}

/* .unRead {
	background-color: rgba(239, 204, 0, 0.85);
	border: 0px;
	color: black;
	position: absolute;
	top: -10px;
	right: -10px;
	border-radius: 6px;
	// -webkit-animation-duration: 3s;
  // -webkit-animation-name: box; 
	animation: box 3s infinite;
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
} */
</style>
