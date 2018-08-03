<template>
  <section>
    <help-box />
    <yeb-box v-if="isLogin && checkYeb" />
    <p id="back-top">
      <a href="#top"></a>
    </p>
    <header class="header_box">
      <div class="top">
        <div class="container">
          <news-box class="news_info" :showLogo="false" :content="content" />

          <!--12月續儲值１0％點數反饋，最高送5000點。-->
          <span class="user_name">
            <span class="color1" v-if="hasMemberLevel">{{ memberLevel.p99_mll_name }}</span>
            <b>{{ userID }}</b>，您好</span>

          <ul class="top_user_info">

            <section v-show="isLogin">
              <li>
                <span class="dropdown">
                  <a class="dropdown-toggle pt_bt pointer" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-life-ring"></i>{{ surplus | currency(2) }}</a>
                  <div class="dropdown-menu points dropdown-menu-right" aria-labelledby="dropdownMenuLink">
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
              </li>
              <li>
                <span>
                  <router-link :to="{ name: 'cash-base-info' }" class="bt_p">{{ $t('memberCenter') }}</router-link>
                </span>
              </li>
              <li>
                <span>
                  <router-link class="bt_p" :to="{ name: 'cash-message' }">
                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                    <span class="btin">{{ unRead }}</span>站內訊息</router-link>
                </span>
              </li>
              <li>
                <span @click="logout">
                  <a class="bt_p" href="#">{{ $t('logout') }}</a>
                </span>
              </li>
            </section>
            <section v-show="!isLogin">
              <li>
                <span>
                  <a class="login" href="#login_dialog">{{ $t('memberLogin') }}</a>
                </span>
              </li>
              <li>
                <span>
                  <router-link :to="{ name: 'cash-register-check' }" class="bt_p">
                    <i class="fa fa-user"></i>免費註冊</router-link>
                </span>
              </li>
            </section>
            <li>
              <span>
                <router-link class="bt_p mob_bt" :to="{ name: 'cash-app-download' }">手機投注</router-link>
              </span>
            </li>
            <li>
              <span>
                <a class="pointer bt_p cookie_bt" @click="checkCleanCache"> 清除快取</a>
              </span>
            </li>
          </ul>

          <login-modal></login-modal>

          <!--login_dialog end-->

          <!-- <span>
                                                                    <lang-choicer class="b_select"></lang-choicer>
                                                                  </span> -->

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
            <router-link :to="{ name: 'cash-index' }" class="navbar-brand logo">
              <img src="/resource/static/platform-cash/images/logo.png" alt="">
            </router-link>
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="navbar-offcanvas navbar-offcanvas-touch" id="js-bootstrap-offcanvas">

            <ul class="nav navbar-nav menu-list navbar-right">
              <li class="lobby dropdown">
                <router-link :to="{name: 'cash-index'}">
                  <i></i>遊戲大廳</router-link>
              </li>
              <li class="buy">
                <router-link :to="{name: 'cash-currency-transaction'}">
                  <i></i>遊戲幣交易</router-link>
              </li>
              <li class="news">
                <router-link :to="{name: 'cash-news'}">
                  <i></i>最新公告</router-link>
              </li>
              <li class="activep">
                <router-link :to="{name: 'cash-promotions'}">
                  <i></i>優惠活動</router-link>
              </li>
              <li class="faq">
                <router-link :to="{name: 'cash-faq'}">
                  <i></i>常見問題</router-link>
              </li>
              <li class="talk">
                <a class="pointer" @click="checkLogin2Forum()">
                  <i></i>博彩論壇</a>
              </li>
              <li class="movies">
                <a class="pointer" @click="checkLogin2Video()">
                  <i></i>影音平台</a>
              </li>
              <li class="p_bt_p">
                <router-link :to="{name: 'cash-app-download'}">
                  <i></i>手機投注</router-link>
              </li>

              <li class="dropdown">
                <a href="#" class="dropdown-toggle p_bt_t">會員中心
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu" role="menu">
                  <router-link tag="li" :to="{ name: 'cash-base-info' }">
                    <a>個人資料</a>
                  </router-link>
                  <router-link tag="li" :to="{ name: 'cash-currency-transaction' }">
                    <a>遊戲幣交易</a>
                  </router-link>
                  <router-link tag="li" :to="{ name: 'cash-point-transform' }">
                    <a>點數轉移</a>
                  </router-link>
                  <router-link tag="li" :to="{ name: 'cash-bet-detail-report' }">
                    <a>投注明細</a>
                  </router-link>
                </ul>
              </li>
              <!--<li class="dropdown p_bt_t">
                <a href="#" class="dropdown-toggle">語系設定 <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#">繁體中文</a></li>
                  <li><a href="#">簡體中文</a></li>
                  <li><a href="#">English</a></li>
                </ul>
              </li>-->
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
import Header from 'src/mixins/Common/Header'
import Login from 'src/mixins/Platform/Login'
import UnRead from 'src/mixins/Platform/UnRead'
import Broadcast from 'src/mixins/Platform/News/Broadcast-platform'
import Link from 'src/mixins/Platform/Link'
import MemberLevel from 'src/mixins/Common/MemberLevel'
import CheckGame from 'src/mixins/Platform/CheckGame'
import Yebpay from 'src/mixins/Platform/Yebpay'

export default {
	name: 'Header',
	mixins: [Header, Login, UnRead, Broadcast, Link, MemberLevel, CheckGame, Yebpay],
	components: {
		LangChoicer: require('@/Platform/Cash/Web/shared/LangChoicer'),
		LoginModal: require('@/Platform/Cash/Web/shared/LoginModal'),
		HelpBox: require('@/shared/HelpBoxCash'),
		YebBox: require('@/Platform/Cash/Web/shared/YebBox')
	},
	watch: {
		userPoint() {
			this.$nextTick(() => {
				$('.dropdown-toggle').dropdown()
			})
		}
	},
	methods: {
		jqInit() {
			/**
			 * header縮圖
			 */
			var $window = $(window)
			$(window)
				.off('scroll')
				.on('scroll', function() {
					if ($window.scrollTop() > 100)
						//當卷軸大於100px時
						$('.header_box').addClass('active') //在ID menufix 增加class
					else $('.header_box').removeClass('active') //小於100px時 移除 class

					if ($window.scrollTop() > 300)
						//當卷軸大於300px時
						$('#menufix').addClass('active_more') //在ID menufix 增加class
					else $('#menufix').removeClass('active_more') //小於300px時 移除 class
				})

			/**
			 * 登入
			 */
			$('.login').fancybox({
				// type: 'iframe',
				wrapCSS: 'fancybox-login',
				padding: 40,
				width: 490,
				maxWidth: '100%',
				helpers: {
					overlay: {
						css: {
							background: 'rgba(0,0,0,.8)'
						}
					}
				}
			})
		}
	},
	created() {
		require('bootstrap-select')
		require('~/bootstrap-select/dist/css/bootstrap-select.min.css')
		require('static/script/jquery.fancybox.pack.js')
		if (this.isLogin) {
			this.setMounted()
		}
	},
	mounted() {
		this.jqInit()
		this.$bus.on('close.login.fancybox', () => {
			$('.fancybox-close')[0].click()
		})
	},
	destroyed() {
		this.$bus.off('close.login.fancybox')
	}
}
</script>

<style lang="stylus" scoped>
.nav > li
  display inline-block

.user_name
  padding-top 0px !important

// .top a.login, .top a.bt_p
// display inline-block
.news_info
  width 380px

.top_user_info > section
  display inline-block
</style>
