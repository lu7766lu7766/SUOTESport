<template>
  <header class="header clearfix">
    <back-top />
    <div class="header-top">
      <div class="container">
        <!-- Toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-0">
            <i class="pl-10 fa fa-sign-in"></i> {{ $t('memberLogin') }}
          </button>
        </div>
        <div class="collapse navbar-collapse scrollspy smooth-scroll" id="navbar-collapse-0">
          <div class="row">
            <div class="col-md-12 memberinfo">
              <div class="navbar-form">
                <div class="form-group datetime"> {{ now }} </div>
                <div class="form-group member">
                  <i class="fa fa-user" aria-hidden="true"></i>
                  {{ $t('name') }}：
                  <span>{{ userID }}</span>
                </div>
                <div class="form-group account">
                  <i class="fa fa-credit-card" aria-hidden="true"></i>
                  {{ $t('surplus') }}：
                  <span>{{ surplus | currency(2)}} ({{ unit }})</span>
                </div>
                <!-- div class="form-group account"> 信用額度： <span>0 (元)</span> </div -->
              </div>
            </div>
            <div class="col-md-6">
              <!--login-->
              <div class="navbar-form navbar-right" v-if="false && !isLogin">
                <lang-choicer v-if="false"></lang-choicer>
                <div class="form-group">
                  <div class="popover-markup">
                  </div>
                </div>

                <div class="form-group">
                  <input v-model="loginID" @keyup.13="login" type="login" class="loginForm formLogin  form-control J-verify" :placeholder="$t('account')">
                </div>
                <div class="form-group">
                  <input v-model="loginPwd" @keyup.13="login" type="password" class="loginForm form-control J-verify" :placeholder="$t('password')">
                </div>
                <div class="form-group" v-if="false">
                  <input v-model="captcha" @keyup.13="login" type="captcha" :placeholder="$t('captcha')" class="loginForm form-control ui-input fn-left J-verify _captcha_input" required>
                </div>

                <div class="form-group" v-if="false">
                  <div class="captcha-light"></div>
                  <canvas ref="captcha" class="captcha" @click="generateCaptcha" />
                  <!--<img src="../../../res/sport/images/captcha.png">-->
                </div>

                <div class="form-group">
                  <input type="button" :value="$t('login')" class="btn btn-pharaoh" @click="login">
                </div>

              </div>

              <!--loout-->
              <div class="navbar-form navbar-right" v-if="false">
                <lang-choicer v-if="false"></lang-choicer>
                <div class="form-group">
                  <input type="button" :value="$t('logout')" class="btn btn-pharaoh" @click="logout">
                </div>
              </div>
              <news-box :content="content" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="headerbar">
      <div class="container">

        <div class="row">
          <div class="col-md-3">
            <!-- logo start -->
            <div class="logo">
              <router-link :to="{ name: 'sport-index' }"><img :src="cLogo" alt="" /></router-link>
            </div>
            <!-- logo end -->
          </div>
          <div class="col-md-15">
            <!-- header-right start -->
            <!-- main-navigation start -->
            <div class="main-navigation animated">

              <!-- navbar start -->
              <nav class="navbar navbar-default" role="navigation">
                <div class="container-fluid">

                  <!-- Toggle get grouped for better mobile display -->
                  <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                  </div>
                  <!-- Collect the nav links, forms, and other content for toggling -->
                  <div class="collapse navbar-collapse scrollspy smooth-scroll" id="navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-left">
                      <router-link :to="{ name: 'sport-index' }" tag="li" active-class="active" exact>
                        <a>{{ $t('index') }}</a>
                      </router-link>
                      <li v-if="isLive" @click="onIsLiveChange" class="active">
                        <a>{{ $t('notlive') }}</a>
                      </li>
                      <li v-else @click="onIsLiveChange" class="active2">
                        <a class="pointer">{{ $t('live') }}</a>
                      </li>
                      <router-link :to="{ name: 'sport-news' }" tag="li" active-class="active">
                        <a>{{ $t('news') }}</a>
                      </router-link>
                      <router-link :to="{ name: 'sport-game-setting' }" tag="li" active-class="active" v-if="isLogin">
                        <a>{{ $t('memberInfo') }}</a>
                      </router-link>
                      <router-link :to="{ name: 'sport-bet-detail' }" tag="li" active-class="active" exact v-if="isLogin">
                        <a>{{ $t('betDetail') }}</a>
                      </router-link>
                      <router-link :to="{ name: 'sport-history-account' }" tag="li" active-class="active" exact v-if="isLogin">
                        <a>{{ $t('historyAccount') }}</a>
                      </router-link>
                      <router-link :to="{ name: 'sport-game-results' }" tag="li" active-class="active" exact>
                        <a>{{ $t('gameResults') }}</a>
                      </router-link>
                      <li class="pointer">
                        <a @click="openByRoute({
                              name: 'sport-live-list'
                            }, {height: 550, width:1060}, 'live-list')">{{ $t('sportLive') }}</a>
                      </li>
                      <router-link :to="{ name: 'sport-favorites' }" tag="li" active-class="active" exact v-if="isLogin">
                        <a>{{ $t('myFavorite') }}</a>
                      </router-link>

                      <li :class="{ service: true, active: $route.matched[2].name == 'sport-service' }">
                        <a ref="serviceCenter" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
                          {{ $t('serviceCenter') }}
                          <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </a>
                        <div class="dropdown-menu submenu">
                          <router-link class="dropdown-item" active-class="active" exact :to="{ name: 'sport-website-protocol' }">{{ $t('websiteProtocol') }}</router-link>
                          <a class="dropdown-item pointer" @click="openByRoute({
                              name: 'sport-service-relate'
                            })">{{ $t('relatedWebsite') }}</a>
                          <a class="dropdown-item pointer" @click="openByRoute({
                              name: 'sport-service-rule'
                            })">{{ $t('playDescription') }}</a>
                        </div>
                      </li>
                      <router-link tag="li" v-if="isFromPlatform" :to="$platformHost()" class="pointer casinogame">
                        <a>娛樂城
                          <i></i>
                        </a>
                      </router-link>
                    </ul>
                  </div>
                </div>
              </nav>
              <!-- navbar end -->
            </div>
            <!-- main-navigation end -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Header from 'src/mixins/Common/Header'
import Broadcast from 'src/mixins/Sport/News/Broadcast-sport'
import TmeCodeConf from 'src/config/TmeCodeConf'
import RouteConf from 'src/config/RouteConf'
import { SportsType } from 'src/store/module/sports'
import { mapMutations, mapState } from 'vuex'
import Link from 'src/mixins/Common/Link'

export default {
	name: 'header',
	mixins: [Header, Broadcast, Link],
	data: () => ({
		now: ''
	}),
	components: {
		LangChoicer: require('@/Sport/Web/shared/LangChoicer'),
		BackTop: require('@/shared/BackTop')
	},
	methods: {
		...mapMutations({
			onIsLiveChange: SportsType.onIsLiveChange
		}),
		getCurrentTime() {
			this.now = this.$moment().Format('Y-m-d H:i:sap z')
		}
	},
	computed: {
		...mapState({
			isLive: state => state.Sports.isLive
		}),
		isFromPlatform() {
			return this.$store.state.Info.isFromPlatform
		},
		cLogo() {
			if (RouteConf.tmeCode() == TmeCodeConf.CASH) {
				return '/resource/static/platform-cash/images/logo.png'
			} else if (RouteConf.tmeCode() == TmeCodeConf.CREDIT) {
				return '/resource/static/platform-credit/images/logo.png'
			} else if (RouteConf.tmeCode() == TmeCodeConf.SIN) {
				return ''
			}
		}
	},
	mounted() {
		this.getCurrentTime()
		let timer = setInterval(this.getCurrentTime, 1000)
		this.$nextTick(() => {
			$(this.$refs.serviceCenter).dropdown()
		})
	}
}
</script>

<<style lang="stylus" scoped>
.collapse .newsbox
  width: auto
</style>
