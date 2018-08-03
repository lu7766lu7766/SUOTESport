<template>
  <section>
    <my-slide :isShowIndex="false" cId="carousel-example-generic" />
    <news-box :content="content" />
    <div class="lobby-container">
      <ul class="in-game">
        <li @click="checkYeb ? $router.push({name: 'cash-mobile-yebpay'}): ''" class="ft-i1">
          <img src="/resource/static/platform-cash-mobile/images/bank/money-bank.png" alt="" />
          <span>餘額寶</span>
          <div v-if="!checkGames.TAMBT" class="comingsoon">
            <span>敬請期待
              <t>coming soon</t>
            </span>
          </div>
          <div v-if="checkGames.TAMBT && checkMaintains.TAMBT" class="comingsoon">
            <span>維護中
              <t>coming soon</t>
            </span>
          </div>
        </li>
        <li class="ft-i1" @click="checkLogin2Sport()">
          <img src="/resource/static/platform-cash-mobile/images/sport/sport.png" alt="" />
          <span>體育博彩</span>
          <!-- <div class="appinfo">
            <a class="start width100">啟動遊戲</a>
          </div> -->
        </li>
        <li class="ft-i1" @click="checkLogin2Games('PHALE')">
          <img src="/resource/static/platform-cash-mobile/images/casino/casino.png" alt="" />
          <span>真人視訊</span>
          <!-- <div class="appinfo">
            <a class="start">啟動遊戲</a>
            <a class="download casino" target="_blank" href="http://api-tw.livecasino168.com/app-api/download">下載APP</a>
          </div> -->
          <div v-if="!checkGames.PHALE" class="comingsoon">
            <span>敬請期待
              <t>coming soon</t>
            </span>
          </div>
          <div v-if="checkGames.PHALE && checkMaintains.PHALE" class="comingsoon">
            <span>維護中
              <t>coming soon</t>
            </span>
          </div>
        </li>

        <li class="ft-i1" @click="checkLogin2Games('PHAGO')">
          <img src="/resource/static/platform-cash-mobile/images/stock/stock.png" alt="" />
          <span>黃金期權</span>
          <!-- <div class="appinfo">
            <a class="start">啟動遊戲</a>
            <a class="download" href="https://pha168-apps.sytepoker.com/#/golden-option-tw" target="_blank">下載APP</a>
          </div> -->
          <div v-if="!checkGames.PHAGO" class="comingsoon">
            <span>敬請期待
              <t>coming soon</t>
            </span>
          </div>
          <div v-if="checkGames.PHAGO && checkMaintains.PHAGO" class="comingsoon">
            <span>維護中
              <t>coming soon</t>
            </span>
          </div>
        </li>

        <li class="ft-i1" @click="checkLogin2Games('PHABL')">
          <img src="/resource/static/platform-cash-mobile/images/lottery/lottery2.png" alt="" />
          <span>彩球</span>
          <div v-if="!checkGames.PHABL" class="comingsoon">
            <span>敬請期待
              <t>coming soon</t>
            </span>
          </div>
          <div v-if="checkGames.PHABL && checkMaintains.PHABL" class="comingsoon">
            <span>維護中
              <t>coming soon</t>
            </span>
          </div>
        </li>

        <li class="ft-i1" @click="checkLogin2Games('PHAST')">
          <img src="/resource/static/platform-cash-mobile/images/slot/slot.png" alt="" />
          <span>電子遊戲</span>
          <!-- <div class="appinfo">
            <a class="start">啟動遊戲</a>
            <a class="download" href="#">下載APP</a>
          </div> -->
          <div v-if="!checkGames.PHAST" class="comingsoon">
            <span>敬請期待
              <t>coming soon</t>
            </span>
          </div>
          <div v-if="checkGames.PHAST && checkMaintains.PHAST" class="comingsoon">
            <span>維護中
              <t>coming soon</t>
            </span>
          </div>
        </li>

        <li class="ft-i1" @click="checkLogin2Games('PHA3D')">
          <img src="/resource/static/platform-cash-mobile/images/slot/3Dslot.png" alt="" />
          <span>3D電子遊戲</span>
          <!-- <div class="appinfo">
            <a class="start">啟動遊戲</a>
            <a class="download" href="#">下載APP</a>
          </div> -->
          <div v-if="!checkGames.PHA3D" class="comingsoon">
            <span>敬請期待
              <t>coming soon</t>
            </span>
          </div>
          <div v-if="checkGames.PHA3D && checkMaintains.PHA3D" class="comingsoon">
            <span>維護中
              <t>coming soon</t>
            </span>
          </div>
        </li>

        <li class="ft-i1" @click="checkLogin2Games('PHALT')">
          <img src="/resource/static/platform-cash-mobile/images/lottery/lottery1.png" alt="" />
          <span>彩票</span>
          <div v-if="!checkGames.PHALT" class="comingsoon">
            <span>敬請期待
              <t>coming soon</t>
            </span>
          </div>
          <div v-if="checkGames.PHALT && checkMaintains.PHALT" class="comingsoon">
            <span>維護中
              <t>coming soon</t>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Broadcast from 'src/mixins/Platform/News/Broadcast-platform'
import Game from 'src/mixins/Platform/GameEnter'
import Link from 'src/mixins/Platform/Link'

export default {
	mixins: [Broadcast, Game, Link],
	data: () => ({
		teachRouteName: 'cash-mobile-dowonload-teach',
		platformAPPActiveLink: 'pharaoh-platform-cash://'
	}),
	components: {
		MySlide: require('@/Platform/shared/Slide')
	}
}
</script>
