<template>
  <div id="helpbox" :class="{'open': isOpen}" class="side-box1 pointer">
    <a class="service2" target="_blank" @click="checkService2Link()"><img src="/resource/static/platform-credit/images/service-call.png" alt="" /></a>
    <a class="servicdrop" @click="isOpen = !isOpen" data-toggle="dropdown" href="javascript:void(0)">其它通訊服務
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </a>
    <div class="servicemenu dropdown-menu" role="menu" aria-labelledby="dLabel">
      <div class="center-line">
        <div class="qrcode line">
          <span>LINE / QR CODE</span>
          <img src="/resource/static/platform-credit/images/line.jpg">
        </div>
      </div>
      <div class="center-qq">
        <div class="qrcode qq">
          <span>QQ / CODE</span>
          <img src="/resource/static/platform-credit/images/qq.jpg">
        </div>
      </div>
      <div class="center-wechat">
        <div class="qrcode wechat">
          <span>wechat / QR CODE</span>
          <img src="/resource/static/platform-credit/images/wechat.jpg">
        </div>
      </div>
      <a class="center-facebook facebook-nav fa fa-facebook" target="_blank" href="https://www.facebook.com/iwin888.net">法老王 Signature Club</a>
    </div>
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
