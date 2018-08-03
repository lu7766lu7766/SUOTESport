<template>
	<section>
		<!--banner start-->
		<div id="carousel-example-generic" class="carousel slide carousel-fade" data-ride="carousel">
			<!-- Wrapper for slides -->
			<div class="container">
				<div class="">
					<div class="col-md-9 row-no-padding2" v-if="advList.length === 0">
						<ol class="carousel-indicators">
							<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
							<li data-target="#carousel-example-generic" data-slide-to="1"></li>
						</ol>
						<div class="carousel-inner" role="listbox">
							<div class="item active" style="background-image: url(/resource/static/platform-sin/images/slider/banner1.jpg)">
								<!-- <img src="/resource/static/platform-sin/images/banner1.jpg" alt="..."> -->
							</div>
							<div class="item" style="background-image: url(/resource/static/platform-sin/images/slider/banner2.jpg)">
								<!-- <img src="/resource/static/platform-sin/images/banner1.jpg" alt="..."> -->
							</div>
							<!-- Controls -->
							<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
								<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
								<span class="sr-only">Previous</span>
							</a>
							<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
								<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
								<span class="sr-only">Next</span>
							</a>
						</div>

					</div>
					<div class="col-md-9 row-no-padding2" v-else>
						<ol class="carousel-indicators">
							<li v-for="(item, index) in advList" data-target="#carousel-example-generic" :data-slide-to="index" :class="{'active': index === 0 }"></li>
						</ol>
						<div class="carousel-inner" role="listbox">
							<div v-for="(item, index) in advList" @click="advLink(item)" :class="{'active': index === 0 }" class="item pointer" :style="{'background-image': 'url(' + (item.p84_advertising_basic.files !== null ? $fileHost + item.p84_advertising_basic.files.files_folder + '/' + item.p84_advertising_basic.files.files_name : '/resource/static/platform-cash/images/slider/banner1.jpg') + ')'}">
								<!-- <img src="/resource/static/platform-sin/images/banner1.jpg" alt="..."> -->
							</div>
						</div>
						<!-- Controls -->
						<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
							<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
							<span class="sr-only">Previous</span>
						</a>
						<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
							<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						</a>
					</div>

					<div class="col-md-3 row-no-padding2">
						<div class="phone-box">
							<div class="news_title">
								<h1>最新公告
									<span>NEWS</span>
								</h1>
								<router-link :to="{name: 'sin-news'}">More</router-link>
							</div>
							<ul>
								<li v-for="(data, i) in indexNews">
									<span>{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}</span>
									<router-link :data-title="data.act_title[lang]" :data-cut-title="data.act_title_cut[lang]" :to="{ 
											name: 'sin-news-detail',
											params: {
												nGuid: data.act_guid
											} 
										}">
										{{ data.act_title_cut[lang] }}
									</router-link>
								</li>
							</ul>
						</div>
					</div>

				</div>
				<span class="news_info">
					<news-box :content="content"></news-box>
				</span>

			</div>

		</div>
		<!--banner end-->
		<div class="game_box_bg">

			<div id="game_carousel" class="carousel slide" data-ride="carousel" data-interval="5000">
				<div class="tabbg">
					<div class="container">
						<div class="controls">
							<ul class="nav">
								<li data-target="#game_carousel" data-slide-to="0" class="active">
									<a href="#"><img src="/resource/static/platform-sin/images/indexgamelist/game-sport-icon.png">
										<span class="game-name">體育賽事
											<small>SPORT</small>
										</span>
									</a>
								</li>
								<li data-target="#game_carousel" :data-slide-to="getSlideItemIndex('PHALE')" class="">
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
									<a href="#"><img src="/resource/static/platform-sin/images/indexgamelist/game-casino-icon.png">
										<span class="game-name">真人視訊
											<small>CASINO</small>
										</span>
									</a>
								</li>
								<li data-target="#game_carousel" :data-slide-to="getSlideItemIndex('PHAST')" class="">
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
									<a href="#"><img src="/resource/static/platform-sin/images/indexgamelist/game-slot-icon.png">
										<span class="game-name">電子遊戲
											<small>SLOT</small>
										</span>
									</a>
								</li>
								<li data-target="#game_carousel" :data-slide-to="getSlideItemIndex('PHA3D')" class="">
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
									<a href="#"><img src="/resource/static/platform-sin/images/indexgamelist/game-3dslot-icon.png">
										<span class="game-name">3D電子遊戲
											<small>3D SLOT</small>
										</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="container">
					<!-- Wrapper for slides -->
					<div class="carousel-inner">
						<div class="item active">
							<div class="container-fluid">
								<div class="row">
									<a class="pointer" @click="checkLogin2Sport()"><img src="/resource/static/platform-sin/images/indexgamelist/tab-slider-pic.jpg" alt="" /></a>
								</div>
							</div>
						</div>
						<div class="item" v-if="checkGames.PHALE && !checkMaintains.PHALE">
							<div class="container-fluid">
								<div class="row">
									<a class="pointer" @click="checkLogin2Games('PHALE')"><img src="/resource/static/platform-sin/images/indexgamelist/tab-slider-pic-casino.jpg" alt="" /></a>
								</div>
							</div>
						</div>
						<div class="item" v-if="checkGames.PHAST && !checkMaintains.PHAST">
							<div class="container-fluid">
								<div class="row">
									<a class="pointer" @click="checkLogin2Games('PHAST')"><img src="/resource/static/platform-sin/images/indexgamelist/tab-slider-pic-slot.jpg" alt="" /></a>
								</div>
							</div>
						</div>
						<div class="item" v-if="checkGames.PHA3D && !checkMaintains.PHA3D">
							<div class="container-fluid">
								<div class="row">
									<a class="pointer" @click="checkLogin2Games('PHA3D')"><img src="/resource/static/platform-sin/images/indexgamelist/tab-slider-pic-3dslot.jpg" alt="" /></a>
								</div>
							</div>
						</div>
						<div class="item" v-if="checkGames.PHAGO && !checkMaintains.PHAGO">
							<div class="container-fluid">
								<div class="row">
									<a class="pointer" @click="checkLogin2Games('PHAGO')"><img src="/resource/static/platform-sin/images/indexgamelist/tab-slider-pic-goldption.jpg" alt="" /></a>
								</div>
							</div>
						</div>
						<div class="item" v-if="checkGames.PHALT && !checkMaintains.PHALT">
							<div class="container-fluid">
								<div class="row">
									<a class="pointer" @click="checkLogin2Games('PHALT')"><img src="/resource/static/platform-sin/images/indexgamelist/tab-slider-pic-lottery.jpg" alt="" /></a>
								</div>
							</div>
						</div>
						<div class="item" v-if="checkGames.PHABL && !checkMaintains.PHABL">
							<div class="container-fluid">
								<div class="row">
									<a class="pointer" @click="checkLogin2Games('PHABL')"><img src="/resource/static/platform-sin/images/indexgamelist/tab-slider-pic-balls.jpg" alt="" /></a>
								</div>
							</div>
						</div>
						<div class="item" v-if="checkGames.porker && !checkMaintains.porker">
							<div class="container-fluid">
								<div class="row">
									<a href="#"><img src="/resource/static/platform-sin/images/indexgamelist/tab-slider-pic-porker.jpg" alt="" /></a>
								</div>
							</div>
						</div>
					</div>

					<!-- End Item -->
				</div>
				<!-- End Carousel Inner -->
				<div class="tabbg">
					<div class="container">
						<div class="controls down">
							<ul class="nav">

								<li data-target="#game_carousel" :data-slide-to="getSlideItemIndex('PHAGO')" class="">
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
									<a href="#"><img src="/resource/static/platform-sin/images/indexgamelist/game-stock-icon.png">
										<span class="game-name">黃金期權
											<small>STOCK</small>
										</span>
									</a>
								</li>
								<li data-target="#game_carousel" data-slide-to="" class="">
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
									<a href="#"><img src="/resource/static/platform-sin/images/indexgamelist/game-lottery-icon.png">
										<span class="game-name">彩票
											<small>LOTTERY</small>
										</span>
									</a>
								</li>
								<li data-target="#game_carousel" data-slide-to="" class="">
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
									<a href="#"><img src="/resource/static/platform-sin/images/indexgamelist/game-balls-icon.png">
										<span class="game-name">彩球
											<small>BALLS</small>
										</span>
									</a>
								</li>
								<li data-target="#game_carousel" data-slide-to="" class="">
									<div class="comingsoon">
										<span>敬請期待
											<t>coming soon</t>
										</span>
									</div>
									<a href="#"><img src="/resource/static/platform-sin/images/indexgamelist/game-poker-icon.png">
										<span class="game-name">對戰棋牌
											<small>POKER</small>
										</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--game_box end-->
	</section>
</template>

<script>
import Link from 'src/mixins/Platform/Link'
import Game from 'src/mixins/Platform/GameEnter'
import Broadcast from 'src/mixins/Platform/News/Broadcast-platform'
import Advertising from 'src/mixins/Platform/News/Advertising'
import NewsIndex from 'src/mixins/Platform/News/News-index'

export default {
	data: () => ({
		newsLen: 0,
		cols: false,
		broadcasts: {}
	}),
	mixins: [Link, Game, Broadcast, Advertising, NewsIndex],
	methods: {
		getSlideItemIndex(gmeCode) {
			if (this.checkGames[gmeCode]) {
				let index = 1 // 0 => sport
				_.forEach(this.checkGames, (result, key) => {
					return key != gmeCode ? ++index : false
				})
				return index
			}
			return ''
		}
	},
	mounted() {
		$('#game_carousel').on('slide.bs.carousel', function(evt) {
			$('#game_carousel .controls li.active').removeClass('active')
			$('#game_carousel .controls li:eq(' + $(evt.relatedTarget).index() + ')').addClass('active')
		})
	}
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
</style>
