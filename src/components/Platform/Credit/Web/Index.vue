<template>
  <section>
    <div class="jk-slider">
      <div class="banner">
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 news">
          <h3>最新公告</h3>
          <span>News</span>
          <div class="news-more">
            <router-link :to="{name: 'credit-news'}">More</router-link>
          </div>
          <ul style="margin-bottom: 7px;">
            <template v-for="(data, i) in indexNews">
              <li>
                <div class="news-list-box">
                  <div class="news-list-box-date">{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}</div>
                  <router-link :data-title="data.act_title[lang]" :data-cut-title="data.act_title_cut[lang]" :to="{
											name: 'credit-news-detail',
											params: {
												nTag: data.act_atg_guid,
                        nGuid: data.act_guid
											}
										}" class="JQellipsis">
                    {{ data['act_title'][lang] }}</router-link>
                </div>
              </li>
              <li class="news-hr"></li>
            </template>
          </ul>
        </div>
        <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12 banner-slider">
          <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li v-for="(item, index) in advList" data-target="#carousel-example-generic" :data-slide-to="index" :class="{'active': index === 0 }"></li>
            </ol>
            <div class="carousel-inner">
              <div v-for="(item, index) in advList" @click="advLink(item)" :class="{'active': index === 0 }" class="item pointer" :style="{
                'background-image': 'url(' + (item.p84_advertising_basic.files 
                    ? $fileHost + item.p84_advertising_basic.files.files_folder + '/' + item.p84_advertising_basic.files.files_name 
                    : '/resource/static/platform-cash/images/slider/banner1.jpg') 
                  + ')'
                }"></div>
            </div>
            <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <section class="marquee">
      <div class="container-fluid">
        <div class="row">
          <div class="container">
            <div class="col-md-1 col-xs-2">
              <span class="icon-microphone"></span>
            </div>
            <div class="col-md-10 col-xs-10">
              <marquee direction="left" height="40" scrollamount="3" class="marquee-font">
                {{content}}
              </marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="theme">
      <div class="container">
        <div class="theme-loc">
          <div class="con-866">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div class="theme-menu pointer" @click="checkLogin2Sport()">
                <img class="img-responsive" src="/resource/static/platform-credit/images/game_02.png" alt="">
                <div class="theme-menu-bt">
                  <span>法老王</span>
                  <h2>體育博彩</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div class="theme-menu pointer" @click="checkLogin2Games('PHALE')">
                <img class="img-responsive" src="/resource/static/platform-credit/images/game_01.png" alt="">
                <div class="theme-menu-bt">
                  <span>法老王</span>
                  <h2>真人視訊</h2>
                </div>
                <div v-if="!checkGames.PHALE" class="masking">
                  <span>敬請期待</span>
                </div>
                <div v-if="checkGames.PHALE && checkMaintains.PHALE" class="masking">
                  <span>維護中</span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div class="theme-menu pointer" @click="checkLogin2Games('PHAGO')">
                <img class="img-responsive" src="/resource/static/platform-credit/images/game_03.png" alt="">
                <div class="theme-menu-bt">
                  <span>法老王</span>
                  <h2>黃金期權</h2>
                </div>
                <div v-if="!checkGames.PHAGO" class="masking">
                  <span>敬請期待</span>
                </div>
                <div v-if="checkGames.PHAGO && checkMaintains.PHAGO" class="masking">
                  <span>維護中</span>
                </div>
              </div>
            </div>
          </div>
          <div class="con-866">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="theme-menu pointer" @click="checkLogin2Games('PHAST')">
                <img class="img-responsive" src="/resource/static/platform-credit/images/game_04-1.png" alt="">
                <div class="theme-menu-bt">
                  <span>法老王</span>
                  <h2>電子遊戲</h2>
                </div>
                <div v-if="!checkGames.PHAST" class="masking">
                  <span>敬請期待</span>
                </div>
                <div v-if="checkGames.PHAST && checkMaintains.PHAST" class="masking">
                  <span>維護中</span>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="theme-menu pointer" @click="checkLogin2Games('PHA3D')">
                <img class="img-responsive" src="/resource/static/platform-credit/images/game_04-2.png" alt="">
                <div class="theme-menu-bt">
                  <span>法老王 3D</span>
                  <h2>電子遊戲</h2>
                </div>
                <div v-if="!checkGames.PHA3D" class="masking">
                  <span>敬請期待</span>
                </div>
                <div v-if="checkGames.PHA3D && checkMaintains.PHA3D" class="masking">
                  <span>維護中</span>
                </div>
              </div>
            </div>
          </div>
          <div class="con-866">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div class="theme-menu pointer" @click="checkLogin2Games('PHALT')">
                <img class="img-responsive" src="/resource/static/platform-credit/images/game_05.png" alt="">
                <div class="theme-menu-bt">
                  <span>法老王</span>
                  <h2>彩票</h2>
                </div>
                <div v-if="!checkGames.PHALT" class="masking">
                  <span>敬請期待</span>
                </div>
                <div v-if="checkGames.PHALT && checkMaintains.PHA3D" class="masking">
                  <span>維護中</span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div class="theme-menu pointer" @click="checkLogin2Games('PHABL')">
                <img class="img-responsive" src="/resource/static/platform-credit/images/game_06.png" alt="">
                <div class="theme-menu-bt">
                  <span>法老王</span>
                  <h2>彩球</h2>
                </div>
                <div v-if="true || !checkGames.PHABL" class="masking">
                  <span>敬請期待</span>
                </div>
                <div v-if="checkGames.PHABL && checkMaintains.PHABL" class="masking">
                  <span>維護中</span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div class="theme-menu pointer">
                <img class="img-responsive" src="/resource/static/platform-credit/images/game_07.png" alt="">
                <div class="theme-menu-bt">
                  <span>法老王</span>
                  <h2>對戰棋牌</h2>
                </div>
                <div class="masking">
                  <span>敬請期待</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Link from 'src/mixins/Platform/Link'
import Game from 'src/mixins/Platform/GameEnter'
import Broadcast from 'src/mixins/Platform/News/Broadcast-platform'
import Advertising from 'src/mixins/Platform/News/Advertising'
import NewsIndex from 'src/mixins/Platform/News/News-index'

export default {
	mixins: [Link, Game, Broadcast, Advertising, NewsIndex]
}
</script>
<style scoped>
.buttonCenter {
	top: 70px;
	height: 50px;
	width: 100px;
	left: -100px;
	/* margin: -20px -50px;  */
	position: relative;
}

.gameMove:hover button {
	opacity: 1;
	-webkit-transform: translate3d(-70%, 0, 0) !important;
	transform: translate3d(10, 0, 0) !important;
}

.news ul li a {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	display: block;
}
.news ul li {
	margin-right: 20px;
}

.news-list-box {
	margin-bottom: 10px;
	padding: 1px !important;
	text-align: left;
	line-height: 12px !important;
}

.news ul li:last-child {
	border: none;
}

.masking span {
	top: 40%;
	right: 28%;
}
</style>
