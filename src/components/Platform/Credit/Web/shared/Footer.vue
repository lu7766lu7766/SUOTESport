<template>
  <div class="footer">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 remarks">
        <ul>
          <li>
            <router-link :to="{ name: 'credit-about' }">
              關於我們
            </router-link>
          </li>
          <li>|</li>
          <li>
            <router-link :to="{ name: 'credit-privacy' }">
              隱私權政策
            </router-link>
          </li>
          <li>|</li>
          <li>
            <a @click="windowOpenNoStatus('//iwin0800.com')" class="pointer remarks-show">備用網址</a>
          </li>
          <li>|</li>
          <li>
            <a @click="checkCleanCache" class="pointer clean">清除暫存</a>
          </li>
        </ul>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 remarks-img">
        <ul>
          <li><img src="/resource/static/platform-credit/images/login_icon.png" alt=""></li>
          <li>
            <img src="/resource/static/platform-credit/images/footer-img01.png" alt="">
          </li>
          <li>
            <img src="/resource/static/platform-credit/images/footer-img02.png" alt="">
          </li>
          <li>
            <img src="/resource/static/platform-credit/images/footer-img03.png" alt="">
          </li>
        </ul>
      </div>
      <div class="footer-hr"></div>
      <div class="copyright">版權所有 © 2017 Pharaoh Games copyright.</div>
    </div>
  </div>
</template>

<script>
import Link from 'src/mixins/Common/Link'
export default {
	mixins: [Link]
}
</script>