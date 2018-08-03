<template>
  <section>
    <div class="banner-mobile">
      <div class="row">
        <div class="title">
          <h1>手機投注</h1>
          <span>Mobile</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="page">
        <div class="col-lg-6 col-sm-12 mobile-L">
          <img src="/resource/static/platform-credit/images/img_mobile_01.png" alt="">
          <div class="qrcode-type"><img style="max-width: 135px;" :src="$fileHost + appQRCodeUri" alt=""></div>
        </div>
        <div class="col-lg-6 col-sm-12 mobile-R">
          <img src="/resource/static/platform-credit/images/img_mobile_02.png" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Link from 'src/mixins/Platform/Link'

export default {
	mixins: [Link]
}
</script>