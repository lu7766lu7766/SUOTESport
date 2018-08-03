<template>
  <nav class="navbar navbar-inverse navbar-fixed-top app-navbar text-center">
    <!-- Brand and toggle get grouped for better mobile display -->

    <button type="button" id="menuSwitch" class="btn menuSwitch pull-left" data-toggle="push" data-target="#sidebar-left" data-distance="250" title="Open left navigation">
      <img src="/resource/static/sport-mobile/images/icon/menuSwitch.png" alt="" />
    </button>

    <span class="pull-left">
      <router-link class="betSlip" :to="{ name: 'sport-mobile-bet-detail' }">
        <img src="/resource/static/sport-mobile/images/icon/bottomSlipIcon.png" alt="" />
      </router-link>
    </span>

    <router-link class="navbar-brand logo" :to="{ name: 'sport-mobile-index' }"><img :src="cLogo" alt=""></router-link>

    <span class="pull-right">
      <router-link class="Betdetail" :to="$platformHost()">
        <img src="/resource/static/sport-mobile/images/icon/logout2.png" alt="">
      </router-link>
    </span>
    <span class="pull-right">
      <div class="betpoint">
        <t>{{ unit }}</t>
        <div>{{ surplus | currency }}</div>
      </div>
    </span>

    <!--login_dialog end-->
  </nav>
</template>

<script>
import Header from 'src/mixins/Common/Header'
import Bet from 'src/mixins/Sport/Bet'
import TmeCodeConf from 'src/config/TmeCodeConf'
import RouteConf from 'src/config/RouteConf'

export default {
	name: 'header',
	mixins: [Header, Bet],
	computed: {
		cLogo() {
			if (RouteConf.tmeCode() == TmeCodeConf.CASH) {
				return '/resource/static/platform-cash/images/logo.png'
			} else if (RouteConf.tmeCode() == TmeCodeConf.CREDIT) {
				return '/resource/static/platform-credit/images/logo.png'
			} else if (RouteConf.tmeCode() == TmeCodeConf.SIN) {
				return ''
			}
		}
	}
}
</script>