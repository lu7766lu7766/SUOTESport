<template>
  <div class="ft-menu">
    <ul>
      <li class="ft-i1">
        <router-link :to="{ name: 'cash-mobile-bet-detail-report' }">
          <i></i>投注明細
        </router-link>
      </li>
      <li class="ft-i2">
        <router-link :to="{ name: 'cash-mobile-currency-transaction' }">
          <i></i>遊戲幣交易
        </router-link>
      </li>
      <li class="lobby">
        <router-link :to="{ name: 'cash-mobile-index' }">
          <i></i>遊戲大廳
        </router-link>
      </li>
      <li class="ft-i3">
        <router-link :to="{ name: 'cash-mobile-point-transform' }">
          <i></i>遊戲幣轉移
        </router-link>
      </li>
      <li class="ft-i4 dropup">
        <a href="#" data-toggle="dropdown" ref="service">
          <i></i>客戶服務</a>
        <div class="servicemenu dropdown-menu" role="menu" aria-labelledby="dLabel">
          <ol>
            <li @click="checkService2Link()">
              <span>
                <i>
                  <a href="#"><img src="/resource/static/platform-cash-mobile/images/service-icon.png"></a>
                </i>
                <a href="#">線上客服</a>
              </span>
            </li>
            <li @click="windowOpenNoStatus('https://line.me/ti/p/@bym3386k')">
              <span>
                <i>
                  <a href="#">
                    <img src="/resource/static/platform-cash-mobile/images/line-icon.png">
                  </a>
                </i>@bym3386k</span>
            </li>
            <li>
              <span>
                <i>
                  <a href="#"><img src="/resource/static/platform-cash-mobile/images/qq-icon.png"></a>
                </i>1608584476</span>
            </li>
            <li>
              <span>
                <i>
                  <a href="#"><img src="/resource/static/platform-cash-mobile/images/wechat-icon.png"></a>
                </i>iwinbet</span>
            </li>
            <li>
              <span>
                <i>
                  <a class="center-facebook facebook-nav" target="_blank" href="https://www.facebook.com/iwinbet888.net/">
                    <img src="/resource/static/platform-cash-mobile/images/fb-icon.png">
                  </a>
                </i>
                <a target="_blank" href="https://www.facebook.com/iwinbet888.net/">皇璽會粉絲團</a>
              </span>
            </li>
          </ol>
        </div>
      </li>

    </ul>

  </div>
</template>

<script>
import Link from 'src/mixins/Common/Link'
export default {
	mixins: [Link],
	mounted() {
		$(this.$refs.service).dropdown()
	}
}
</script>

<style lang="stylus" scoped>
.servicemenu ol li
  width 155px
</style>
