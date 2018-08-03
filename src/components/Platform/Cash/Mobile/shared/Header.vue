<template>
  <header class="header_box">

    <nav class="navbar navbar-default menuBar">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle offcanvas-toggle pull-left" data-toggle="offcanvas" data-target="#js-bootstrap-offcanvas" style="float:left;">
            <span class="sr-only">Toggle navigation</span>
            <span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </span>
          </button>

          <router-link class="navbar-brand logo" :to="{ name: 'cash-mobile-index' }"><img src="/resource/static/platform-cash-mobile/images/logo.png" alt=""></router-link>

          <div class="top">

            <section v-show="isLogin">
              <span class="user_name dropdown">
                <b>{{ userID }}</b>
                <span class="mpt">
                  <a class="dropdown-toggle pt_bt" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ surplus | currency(2) }}
                  </a>

                  <div class="dropdown-menu points dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                    <p class="dropdown-item all-m" v-if="hasMemberLevel">會員等級
                      <span>{{ memberLevel.p99_mll_name }}</span>
                    </p>
                    <div class="dropdown-divider"></div>
                    <section v-for="(point, code) in getHeaderUserPoint(userPoint)">
                      <p class="dropdown-item">{{ $t(code) }}
                        <span v-if="code === 'TAMBT'">{{ wallet + income | currency(2) }}</span>
                        <span v-else>{{ point | currency(2) }}</span>
                      </p>
                      <div class="dropdown-divider"></div>
                    </section>
                    <p class="dropdown-item all-m">總點數
                      <span>{{ getTotalPoint(userPoint) | currency(2) }}</span>
                    </p>
                  </div>
                </span>
              </span>
              <span class="pull-right">
                <router-link :to="{ name: 'cash-mobile-message' }" class="betSlip"><img src="/resource/static/platform-cash-mobile/images/event-icon.png" alt="">
                  <section v-if="unRead">
                    <i v-if="unRead < 100">{{ unRead }}</i>
                    <i v-else>99+</i>
                  </section>
                </router-link>
              </span>
            </section>
            <section v-show="!isLogin">
              <span>
                <router-link class="login" :to="{ name: 'cash-mobile-login' }">登入</router-link>
              </span>
              <span>
                <router-link class="bt_p" :to="{ name: 'cash-mobile-join-member'} ">註冊</router-link>
              </span>
            </section>
          </div>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="navbar-offcanvas navbar-offcanvas-touch" id="js-bootstrap-offcanvas">
          <div class="memberbox clearfix">
            <div class="phicon"></div>
            <div class="mber-loginout">
              <section v-if="!isLogin">
                <router-link :to="{ name: 'cash-mobile-login' }">登入</router-link>
                /
                <router-link :to="{ name: 'cash-mobile-forget-password' }">忘記密碼</router-link>
                <p class="mber-name">會員名稱</p>
                <p class="mber-pt">遊戲幣</p>
              </section>

              <section v-else>
                <a @click="logout">登出</a>
                <p class="mber-name">{{ userID }}</p>
                <p class="mber-pt">{{ surplus | currency(2)}}</p>
              </section>

            </div>
          </div>
          <ul class="nav navbar-nav menu-list navbar-right">
            <li v-show="isLogin">
              <a @click="collapse('collapse1')">會員中心
                <span class="caret"></span>
              </a>
              <ul :ref="'collapse1'" class="dropdown-menu">
                <li>
                  <router-link :to="{ name: 'cash-mobile-base-info' }">個人資料</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'cash-mobile-currency-transaction' }">遊戲幣交易</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'cash-mobile-point-transform' }">遊戲幣轉移</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'cash-mobile-point-history' }">點數歷程</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'cash-mobile-bet-detail-report' }">投注明細</router-link>
                </li>
              </ul>
            </li>
            <router-link :to="{ name: 'cash-mobile-yebpay' }" tag="li" class="news" active-class="active" exact>
              <a>
                <i></i>餘額寶</a>
            </router-link>
            <router-link :to="{ name: 'cash-mobile-news' }" tag="li" class="news" active-class="active" exact>
              <a>
                <i></i>最新公告</a>
            </router-link>
            <router-link :to="{ name: 'cash-mobile-promotions' }" tag="li" class="news" active-class="active" exact>
              <a>
                <i></i>優惠活動</a>
            </router-link>
            <router-link :to="{ name: 'cash-mobile-faq' }" tag="li" class="news" active-class="active" exact>
              <a>
                <i></i>常見問題</a>
            </router-link>
            <li class="p_bt_t">
              <a @click="checkLogin2Forum()">
                <i></i>博彩論壇</a>
            </li>
            <li class="movies">
              <a @click="checkLogin2Video()">
                <i></i>影音平台</a>
            </li>
            <router-link :to="{ name: 'cash-mobile-about' }" tag="li" class="news" active-class="active" exact>
              <a>
                <i></i>關於我們</a>
            </router-link>

            <router-link :to="{ name: 'cash-mobile-privacy' }" tag="li" class="p_bt_t" active-class="active" exact>
              <a>
                <i></i>隱私權政策</a>
            </router-link>
            <li class="p_bt_t">
              <a @click="windowOpenNoStatus('//ibet0800.com')">
                <i></i>備用網址</a>
            </li>
            <router-link :to="{ name: 'cash-mobile-dowonload-teach' }" tag="li" class="news" active-class="active" exact>
              <a>
                <i></i>APP下載</a>
            </router-link>
            <router-link tag="li" class="p_bt_t" :to="{name: 'cash-mobile-dealIntroduce'}">
              <a class="pointer">交易說明</a>
            </router-link>
            <!-- <li class="dropdown p_bt_t">
                <a href="#" class="dropdown-toggle">語系設定 <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="#">繁體中文</a></li>
                    <li><a href="#">簡體中文</a></li>
                    <li><a href="#">English</a></li>
                </ul>
            </li> -->
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
    </nav>
    <!--nav end-->
  </header>
</template>

<script>
import Link from 'src/mixins/Platform/Link'
import Header from 'src/mixins/Common/Header'
import Login from 'src/mixins/Platform/Login'
import UnRead from 'src/mixins/Platform/UnRead'
import MemberLevel from 'src/mixins/Common/MemberLevel'
// import Yebpay from 'src/mixins/Platform/Yebpay'

export default {
	name: 'header',
	mixins: [Link, Header, Login, UnRead, MemberLevel],
	watch: {
		userPoint() {
			this.$nextTick(() => {
				$('.user_name .dropdown-toggle').dropdown()
			})
		}
	},
	created() {
		if (this.isLogin) {
			this.setMounted()
		}
	},
	mounted() {
		$('.user_name .dropdown-toggle').dropdown()
	}
}
</script>

<style lang="stylus" scoped>
.header_box.active .container .logo
  top 0px

.user_name .pt_bt::after
  right -11px

.navbar-nav .dropdown-menu.collapse.in
  display block
</style>
