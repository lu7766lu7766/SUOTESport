<template>
	<section>
		<!--header end-->
		<!--banner start-->
		<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
			<!-- Wrapper for slides -->
			<div class="container">
				<div class="">
					<div class="col-md-8 row-no-padding2" v-if="advList.length === 0">
						<div class="carousel-inner" role="listbox">
							<div class="item active" style="background-image: url(/resource/static/platform-cash/images/slider/banner1.jpg)">
								<!-- <img src="images/banner1.jpg" alt="..."> -->
							</div>
							<div class="item" style="background-image: url(/resource/static/platform-cash/images/slider/banner2.jpg)">
								<!-- <img src="images/banner1.jpg" alt="..."> -->
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

					<div class="col-md-8 row-no-padding2" v-else>
						<div class="carousel-inner" role="listbox">
							<div v-for="(item, index) in advList" :key="index" @click="advLink(item)" :class="{'active': index === 0 }" class="item pointer" :style="{'background-image': 'url(' + (item.p84_advertising_basic.files !== null ? $fileHost + item.p84_advertising_basic.files.files_folder + '/' + item.p84_advertising_basic.files.files_name : '/resource/static/platform-cash/images/slider/banner1.jpg') + ')'}">
								<!-- <img src="images/banner1.jpg" alt="..."> -->
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

					<div class="col-md-4 row-no-padding2">
						<div class="news_box">
							<div class="news_title">
								<router-link :to="{name: 'cash-news'}">More</router-link>
							</div>
							<ul>
								<li v-for="(data, i) in indexNews" :key="i">
									<span>{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}</span>
									<router-link :data-title="data.act_title[lang]" :data-cut-title="data.act_title_cut[lang]" :to="{ 
											name: 'cash-news-detail',
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
			</div>
		</div>
		<!--banner end-->
		<div class="game_box_bg">
			<div class="container">
				<div class="game-row row">
					<div class="col-md-3 col-sm-3">
						<div @click="checkYeb ? $router.push({name: 'cash-yebpay'}): ''" class="game_box wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s">
							<a style="background-image: url(/resource/static/platform-cash/images/indexgamelist/index-game-00.png)" href="javascript: void(0)">
								<span>餘額寶</span>
							</a>
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
						</div>
					</div>
					<div class="col-md-3">
						<div class="game_box wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.3s">
							<a @click="checkLogin2Sport()" style="background-image: url(/resource/static/platform-cash/images/indexgamelist/index-game-02.png)" href="javascript: void(0)">
								<span>體育博彩</span>
							</a>
						</div>
					</div>
					<div class="col-md-3">
						<div class="game_box wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.6s">
							<a style="background-image: url(/resource/static/platform-cash/images/indexgamelist/index-game-01.jpg)" href="javascript: void(0)" @click="checkLogin2Games('PHALE')">
								<span>真人視訊</span>
							</a>
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
						</div>
					</div>
					<div class="col-md-3">
						<div class="game_box wow fadeInRight" data-wow-duration="0.8s" data-wow-delay="0.6s">
							<a style="background-image: url(/resource/static/platform-cash/images/indexgamelist/index-game-04.png)" href="javascript: void(0)" @click="checkLogin2Games('PHAGO')">
								<span>黃金期權</span>
							</a>
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
						</div>
					</div>
				</div>
				<div class="game-row row">
					<div class="col-md-3 col-sm-3">
						<div class="game_box wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.3s">
							<a style="background-image: url(/resource/static/platform-cash/images/indexgamelist/index-game-06.png)" href="javascript: void(0)" @click="checkLogin2Games('PHABL')">
								<span>彩球</span>
							</a>
							<a class="appbt">APP下載</a>
							<div v-if="!checkGames.PHABL" class="comingsoon">
								<span>敬請期待
									<t>coming soon</t>
								</span>
							</div>
							<div v-if="(checkGames.PHABL && checkMaintains.PHABL) && userID !== 'GA0460'" class="comingsoon">
								<span>維護中
									<t>coming soon</t>
								</span>
							</div>
						</div>
					</div>

					<div class="col-md-3">
						<div class="game_box wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s">
							<a style="background-image: url(/resource/static/platform-cash/images/indexgamelist/index-game-03.png)" href="javascript: void(0)" @click="checkLogin2Games('PHAST')">
								<span>電子遊戲</span>
							</a>
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
						</div>
					</div>
					<div class="col-md-3 col-sm-3">
						<div class="game_box wow fadeInRight" data-wow-duration="0.8s" data-wow-delay="0.6s">
							<a class="game" @click="checkLogin2Games('PHA3D')" style="background-image: url(/resource/static/platform-cash/images/indexgamelist/index-game-03-2.png)" href="javascript: void(0)">
								<span>3D電子遊戲</span>
							</a>
							<a class="appbt" href="">APP下載</a>
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
						</div>
					</div>
					<div class="col-md-3 col-sm-3">
						<div class="game_box wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.3s">
							<a @click="checkLogin2Games('PHALT')" class="pointer" style="background-image: url(/resource/static/platform-cash/images/indexgamelist/index-game-05.png)">
								<span>彩票</span>
							</a>
							<a class="appbt" href="">APP下載</a>

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
						</div>
					</div>

				</div>
			</div>
			<!--container end-->
		</div>
		<!--game_box end-->
		<div class="about_us_bg">

			<div class="container">
				<div class="about_row row wow fadeIn" data-wow-duration="1.5s" data-wow-delay="1s">
					<div class="about_title">我們的優勢</div>

					<div class="col-lg-4">
						<div class="about-box">
							<div class="ab-icon">
								<i class="sport"></i>體育博彩</div>
							<p>皇璽會娛樂城提供全世界各項熱門運動賽事線上博奕，如足球各大聯賽，世界盃、NBA、NFL、MLB以及台、日、韓棒...等熱門賽事。立刻找到您最喜歡、最適合的體育賽事，用您精準的判斷力把博彩獎金帶回家!</p>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="about-box">
							<div class="ab-icon">
								<i class="lottery"></i>六合彩球</div>
							<p>皇璽會娛樂城擁有多種熱門遊戲及多元的玩法，像是六合彩、大樂透、今彩539等熱門遊戲。比一般遊戲更多的線上投注玩法，不但大大的提高了您的中獎機率，更增添樂趣。讓您一夜致富不再是夢想!</p>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="about-box">
							<div class="ab-icon">
								<i class="live"></i>真人娛樂場</div>
							<p>歡迎體驗未來趨勢的真人娛樂場，包含百家樂、骰寶、輪盤、龍虎等豐富精彩遊戲，讓您如同親至賭場。在家即刻線上投注無需等待，享受全天候為您開放的線上娛樂城!快來試試您的好手氣。</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--news_box end-->
	</section>
</template>

<script>
import Header from 'src/mixins/Common/Header'
import Link from 'src/mixins/Platform/Link'
import Game from 'src/mixins/Platform/GameEnter'
import Advertising from 'src/mixins/Platform/News/Advertising'
import NewsIndex from 'src/mixins/Platform/News/News-index'

export default {
	mixins: [Header, Link, Game, Advertising, NewsIndex],
	data: () => ({}),
	mounted() {
		$.getScript('/static/script/platform-cash.js')
	}
}
</script>

<style scoped>
/* .news_box ul li a {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	display: block;
} */
/* .news_box ul li {
	margin-right: 20px;
} */
</style>
