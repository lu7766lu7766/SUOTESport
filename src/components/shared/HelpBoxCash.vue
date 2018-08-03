<template>
  <div id="helpbox" :class="{'open': isOpen}" class="side-box1">
    <a class="service2">
      <img src="/resource/static/platform-cash/images/service-call1.png" alt="" />
    </a>
    <section class="pointer">
      <router-link class="servicdrop2" :to="{
        name: 'cash-deal-introduce'
      }">
        <div><img src="/resource/static/platform-cash/images/money-ts.png" alt="" /></div>
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 購買託售說明
      </router-link>
      <a class="servicdrop" data-toggle="dropdown" href="#" @click="checkService2Link()">
        <div><img src="/resource/static/platform-cash/images/service-call2.png" alt="" /></div>
      </a>
      <div class="servicemenu" role="menu" aria-labelledby="dLabel">
        <div class="center-line" @click="windowOpenNoStatus('https://line.me/ti/p/@bym3386k')">
          <div class="qrcode line">
            <span>LINE / QR CODE</span>
            <img src="/resource/static/platform-cash/images/line.jpg">
          </div>
        </div>
        <div class="center-qq">
          <div class="qrcode qq">
            <span>QQ / CODE</span>
            <img src="/resource/static/platform-cash/images/qq.jpg">
          </div>
        </div>
        <div class="center-wechat">
          <div class="qrcode wechat">
            <span>wechat / QR CODE</span>
            <img src="/resource/static/platform-cash/images/wechat.jpg">
          </div>
        </div>
        <a class="center-facebook facebook-nav fa fa-facebook" target="_blank" href="https://www.facebook.com/iwinbet888.net/">皇璽會 Signature Club</a>
      </div>
    </section>
  </div>
</template>

<script>
import Link from 'src/mixins/Common/Link'

export default {
	mixins: [Link],
	data: () => ({
		isOpen: false
	})
}
</script>

<style lang="stylus" scoped>
.side-box1
  position fixed
</style>
