<template>
  <section>
    <div class="wrapper">
      <div class="header">
        <div class="top">
          <a><img v-if="type" :src="cLogo" class="logo"></a>
        </div>
      </div>
      <div class="title">
        <h2>備用網址</h2>
      </div>
      <div class="content">
        <div class="url-title">
          <h2>線路檢測中心</h2>
          <hr>
          <h4>備用網址</h4>
          <p>溫馨提示：反應時間越小，網站速度越快，越快的網址排在越上面。</p>
        </div>
        <div class="url-page">
          <div class="url-page-list" v-for="(data, index) in datas">
            <h2>{{ index + 1 }}.</h2>
            <table class="url-table">
              <tr>
                <td class="td01">備用連結備用連結</td>
                <td class="td02">反應時間</td>
              </tr>
              <tr>
                <td class="td03"><input type="text" class="top3" :value="data.domain" readonly></td>
                <td class="td04"><input type="text" class="top3" :value="getCurrentSpeed(data.speed)" readonly></td>
              </tr>
            </table>
            <div>
              <button class="btn btn-default url-bt" @click="openLink('//' + data.domain)">前往連結</button>
            </div>
          </div>
          <div class="url-bottom">
            <button class="btn btn-default url-bt" @click="onGetBackUrl()">
              <i class="fa fa-refresh"></i> 再次刷新</button>
          </div>
        </div>
        <div class="copyright">版權所有 2017 © Pharaoh Games copyright</div>
      </div>
    </div>
  </section>
</template>

<script>
import Backup from 'src/mixins/Interface/Backup'

export default {
	mixins: [Backup],
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/platform-credit-mobile/img/ico.ico',
				sizes: '16x16',
				type: 'image/png'
			},
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/css/main.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/bootstrap/css/bootstrap.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/css/slider.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/css/icon.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/font/css/font-awesome.css' }
		]
	}
}
</script>

<style lang="stylus" scoped>
.side-box1
  position fixed
</style>
