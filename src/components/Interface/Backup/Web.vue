<template>
  <section>
    <component v-if="type" :is="cHelpBox" />
    <div class="wrapper">
      <div class="url-menu">
        <div class="container">
          <div class="url-logo">
            <a>
              <img style="max-height:50px" v-if="type" :src="cLogo">
            </a>
          </div>
          <div class="url-right">
            <a class="pointer" @click="addFavorite()" data-reactid="">加入收藏</a>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-url">
      <div class="row">
        <div class="title">
          <h1>備用網址</h1>
          <span>Alternate URL</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <p class="url-title">線路檢測中心</p>
        <hr>
        <div class="col-lg-12">
          <b class="f-white">備用網址</b><br/>
          <p class="f01">溫馨提示：反應時間越小，網站速度越快，越快的網址排在越上面。</p>
        </div>
        <div class="col-lg-7 col-md-12 col-xs-12">
          <table class="rwd-table">
            <tr>
              <th></th>
              <th>備用連結</th>
              <th>反應時間</th>
              <th></th>
            </tr>
            <tr v-for="(data, index) in datas">
              <td class="td01">
                <h2>{{ index + 1 }}.</h2>
              </td>
              <td class="td02"><input type="text" class="top3" :value="data.domain" readonly></td>
              <td class="td03"><input type="text" class="top3" :value="getCurrentSpeed(data.speed)" readonly></td>
              <td class="td04">
                <button class="btn btn-default" @click="openLink('//' + data.domain)">前往連結</button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button class="btn btn-default" @click="onGetBackUrl()">
                  <i class="fa fa-refresh"></i> 再次刷新</button>
              </td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <div class="col-lg-5 col-md-12 col-xs-12">
          <div class="remarks-url">
            <p class="remarks-title">TIPS</p>
            <p class="tips-f01">如果檢測後還不能登錄請按以下操作方式</p>
            <ol class="tips-step">
              <li>按下F10後，點選設定選項(Windows)或是按下【⌘】+【,】 鍵(MAC)，進入Chrome設定頁面</li>
              <li>按下【進階顯示】</li>
              <li>選擇【清除瀏覽資料...】</li>
              <li>勾選【快取圖片和檔案】，並將時間選擇至【不限時間】後，按下【清除瀏覽資料】</li>
              <li>重新啟動Chrome</li>
            </ol>
            <p class="tips-f01">如果我們的檢測對您有幫助</p>
            <span class="tips-f02" data-reactid="">可鍵入 </span>
            <span class="hot-key" data-reactid="">{{ cCtrl }}</span>
            <span class="tips-f02" data-reactid=""> + </span>
            <span class="hot-key" data-reactid="">D</span>
            <span class="tips-f02" data-reactid="">收藏此網頁</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 remarks-img">
          <ul>
            <li><img src="/resource/static/platform-credit/images/login_icon.png" alt=""></li>
            <li><img src="/resource/static/platform-credit/images/footer-img01.png" alt=""></li>
            <li><img src="/resource/static/platform-credit/images/footer-img02.png" alt=""></li>
            <li><img src="/resource/static/platform-credit/images/footer-img03.png" alt=""></li>
          </ul>
        </div>
        <div class="footer-hr"></div>
        <div class="copyright">版權所有 © 2017 Pharaoh Games copyright.</div>
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
			{ rel: 'icon', href: '/resource/static/platform-credit/images/ico.ico', sizes: '16x16', type: 'image/png' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/bootstrap/css/bootstrap.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/media.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/icons.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/table.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/font/css/font-awesome.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/style.css' }
		]
	},
	components: {
		HelpBoxCash: require('@/shared/HelpBoxCash'),
		HelpBoxCredit: require('@/shared/HelpBoxCredit')
	},
	methods: {
		addFavorite() {
			addFavorite(location.href, document.title)
		}
	},
	computed: {
		cHelpBox() {
			if (this.type == 'cash') {
				return 'help-box-cash'
			} else if (this.type == 'credit') {
				return 'help-box-credit'
			}
		},
		cCtrl() {
			return navigator.userAgent.toLowerCase().indexOf('mac') > -1 ? 'cmd' : 'ctrl'
		}
	}
}

var addFavorite = function(url, title) {
	if (window.external && 'addFavorite' in window.external) {
		// IE
		window.external.addFavorite(url, title)
	} else if (window.sidebar && window.sidebar.addPanel) {
		// Firefox23后被弃用
		window.sidebar.addPanel(url, title)
	} else if (window.opera && window.print) {
		// rel=sidebar，读取a链接的href，title 注：opera也转战webkit内核了
		this.title = title
		return true
	} else {
		// webkit - safari/chrome
		alert('可鍵入 ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + ' + D 收藏此網頁')
	}
}
</script>

<style lang="stylus" scoped>
.side-box1
  position fixed
</style>
