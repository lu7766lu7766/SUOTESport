<template>
  <section>
    <div class="download_title">電子遊戲</div>

    <ul class="nav nav-tabs tab_list">
      <li class="active">
        <a href="#tab1" data-toggle="tab" aria-expanded="true" style="width:110px">
          <i class="fa fa-2 fa-android" aria-hidden="true"></i> Android </a>
      </li>
      <li class="clearfix">
        <a href="#tab2" data-toggle="tab" aria-expanded="false" style="width:110px">
          <i class="fa fa-2 fa-apple" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;Ios&nbsp;&nbsp;&nbsp;</a>
      </li>
    </ul>
    <div class="tab-content">

      <div class="tab-pane fade active in" id="tab1">
        <div class="qrbox">

          <div class="member_txt">
            <h4>步驟 1
              <p>網頁選擇遊戲</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Android/and1.png" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 3
              <p>未安裝遊戲請先安裝遊戲-確定</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Android/and2.png" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 4
              <p>進入遊戲說明下載頁，選擇Android</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Android/and3.png" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 5
              <p>滑至說明下方，點擊真人視訊APP下載</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Android/and4.png" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 6
              <p>選擇確定下載</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Android/and5.png" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 7
              <p>至通知訊息選擇完成下載的<br> pharaoh-casino-mobile.apk
              </p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Android/and6.png" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 8
              <p>確定安裝</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Android/and7.png" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 9
              <p>遊戲已安裝成功</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Android/and8.png" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 10
              <p>至平台重新進入啟動遊戲</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Android/and1.png" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 10
              <p>開始遊戲</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Android/and10.png" alt="" /></p>
          </div>
          <div class="Android">
            <a @click="downloadAPP()">
              電子遊戲APP下載</a>
          </div>

        </div>
      </div>

      <div class="tab-pane fade" id="tab2">
        <div class="qrbox">
          <div class="member_txt">
            <h4>步驟 1
              <p>網頁選擇遊戲</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Ios/IMG_0971.jpg" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 2
              <p>點擊遊戲選擇好</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Ios/IMG_0972.jpg" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 3
              <p>未安裝遊戲請先安裝遊戲-好</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Ios/IMG_0973.jpg" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 4
              <p>進入遊戲說明下載頁，選擇IOS</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Ios/IMG_0973-1.jpg" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 5
              <p>滑至說明下方，點擊真人視訊APP下載</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Ios/IMG_0973-2.jpg" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 6
              <p>打開此網頁</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Ios/IMG_0974.jpg" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 7
              <p>安裝遊戲</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Ios/IMG_0975.jpg" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 8
              <p>安裝完成</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Ios/IMG_0976.jpg" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 9
              <p>至平台重新進入啟動遊戲</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Ios/IMG_0971.jpg" alt="" /></p>
          </div>
          <div class="member_txt">
            <h4>步驟 10
              <p>開始遊戲</p>
            </h4>
            <p><img class="img-responsive" src="/resource/static/platform-cash-mobile/images/phoneQA/slot-Ios/IMG_0977.jpg" alt="" /></p>
          </div>

          <div class=ios>
            <a @click="downloadAPP()">
              電子遊戲APP下載</a>
          </div>
        </div>
      </div>
      <!--tab2-->
    </div>
  </section>
</template>
  
<script>
import Download from 'src/mixins/Platform/Download'

export default {
	mixins: [Download]
}
</script>