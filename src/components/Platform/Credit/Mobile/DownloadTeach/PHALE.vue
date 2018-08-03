<template>
  <div class="step">
    <div class="tab-app-title">
      <h2>真人視訊</h2>
      <hr class="line-title">
    </div>
    <div class="step-header">
      <ul class="nav nav-tabs">
        <li class="active">
          <a href="#tab1" data-toggle="tab">
            <span class="icon-iOS fa-3x"></span>
            <div class="tab-app">iOS</div>
          </a>
        </li>
        <li>
          <a href="#tab2" data-toggle="tab">
            <span class="icon-Android fa-3x"></span>
            <div class="tab-app">Android</div>
          </a>
        </li>
      </ul>
    </div>
    <div class="panel-body">
      <div class="tab-content">
        <div class="tab-pane fade in active" id="tab1">
          <div class="step-content">
            <div class="step-box">
              <h5>STEP</h5>
              <span>01</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">首頁"真人視訊"按鈕。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino01.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>02</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">跳轉至下載說明頁面，選擇所屬手機系統安裝說明。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino02.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>03</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">看完下載說明請滑至最底端，點擊"App下載"按鈕。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino03.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>04</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">選擇"好"。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino04.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>05</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">選擇"好"。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino05.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>06</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">選擇"安裝"。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino06.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>07</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">選擇"允許"。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino07.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>08</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">選擇"打開"。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino08.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>09</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">安裝成功，位於手機桌面。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino09.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>10</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">選擇"打開"。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino10.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>11</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">返回平台，點擊"真人視訊"。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino11.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>12</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">進入遊戲</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/iOS-casino12.jpg">
            </div>
          </div>
          <div>
            <button class="bt btn-default bt-app" @click="downloadAPP()">APP下載</button>
          </div>
        </div>
        <div class="tab-pane fade" id="tab2">
          <div class="step-content">
            <div class="step-box">
              <h5>STEP</h5>
              <span>01</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">首頁"真人視訊"按鈕。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/And-casino01.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>02</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">選擇"確定"。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/And-casino02.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>03</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">跳轉至下載說明頁面，選擇所屬手機系統安裝說明。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/And-casino03.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>04</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">點擊"App下載"按鈕。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/And-casino04.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>05</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">選擇"確定"。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/And-casino05.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>06</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">於下載清單中</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/And-casino06.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>07</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">選擇"安裝"</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/And-casino07.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>08</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">選擇"開啟"</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/And-casino08.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>09</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">安裝成功，位於手機桌面。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/And-casino09.jpg">
            </div>
            <div class="step-box">
              <h5>STEP</h5>
              <span>10</span>
            </div>
            <div class="step-view">
              <div class="step-view-title">
                <span class="f05">進入遊戲。</span>
              </div>
              <img src="/resource/static/platform-credit-mobile/img/step/And-casino10.jpg">
            </div>
          </div>
          <div>
            <button class="bt btn-default bt-app" @click="downloadAPP()">APP下載</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Download from 'src/mixins/Platform/Download'

export default {
	mixins: [Download]
}
</script>