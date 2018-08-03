<template>
  <footer class="footer_box">

    <div class="footer_menu">
      <div class="container">
        <div class="f_link">
          <h3>關於我們</h3>
          <ul>
            <li>
              <router-link :to="{name: 'sin-index'}">遊戲大廰</router-link>
            </li>
            <li>
              <router-link :to="{name: 'sin-news'}">最新公告</router-link>
            </li>
            <li>
              <a class="pointer" @click="checkLogin2Video()">影音平台</a>
            </li>
            <li>
              <a class="pointer" target="_blank" @click="checkService2Link()">線上客服</a>
            </li>

          </ul>
          <ul>
            <li>
              <router-link :to="{name: 'sin-faq'}">常見問題</router-link>
            </li>
            <li>
              <router-link :to="{name: 'sin-privacy'}">隱私權政策</router-link>
            </li>
          </ul>
        </div>
        <div class="f_contactus">
          <h3>聯絡我們</h3>
          <ul>
            <li>
              <span>
                <i><img src="/resource/static/platform-sin/images/ct-icon1.png" width="29" height="29" alt="" /></i>iwin168net</span>
            </li>
            <li>
              <span>
                <i><img src="/resource/static/platform-sin/images/ct-icon2.png" width="29" height="29" alt="" /></i>iwin168.net</span>
            </li>
            <li>
              <span>
                <i><img src="/resource/static/platform-sin/images/ct-icon3.png" width="29" height="29" alt="" /></i>2080595885</span>
            </li>
          </ul>

        </div>

        <div class="f_no18">
          <h3>博彩責任</h3>
          <span>
            <a class="pointer"><img src="/resource/static/platform-sin/images/18plus.png" alt="" /></a>
          </span>

        </div>
      </div>
    </div>
    <!-- footer_menu end -->
    <div class="partner">
      <div class="container">

        <ul>
          <h3>國際牌照</h3>
          <li><img src="/resource/static/platform-sin/images/link-i1.png" alt=""></li>
          <li><img src="/resource/static/platform-sin/images/link-i2.png" alt=""></li>
          <li><img src="/resource/static/platform-sin/images/link-i3.png" alt=""></li>

        </ul>
      </div>
    </div>
    <!-- partner end -->
    <div class="copyright">
      <div class="browsers">
        <a href="https://www.google.com/chrome/browser/desktop/" class="chrome icon" target="_blank"></a>
        <a href="http://mozilla.com.tw/firefox/new/" class="firefox icon" target="_blank"></a>
        <a href="https://support.apple.com/downloads/#safari" class="safari icon" target="_blank"></a>

      </div>
      Copyright © 2017 GC 18+</div>
    <!-- copyright end -->
  </footer>
</template>

<script>
import Link from 'src/mixins/Platform/Link'

export default {
	name: 'footer',
	mixins: [Link]
}
</script>
