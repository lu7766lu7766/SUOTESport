<template>
	<section>
		<my-slide />
		<div class="marquee">
			<div class="row">
				<div class="container">
					<div class="col-md-1 col-xs-2 marquee-icon">
						<span class="icon-microphone"></span>
					</div>
					<div class="col-sm-11 col-xs-10">
						<marquee direction="left" height="30" scrollamount="3" class="marquee-font">
							{{content}}
						</marquee>
					</div>
				</div>
			</div>
		</div>

		<div class="menu">

			<div class="col-xs-12 menu-option">
				<div class="hover ehover12" @click="checkLogin2Sport()">
					<img class="img-responsive" src="/resource/static/platform-sin-mobile/img/game_02.png" alt="">
					<div class="overlay">
						<span>聚鑫娛樂城</span>
						<h2>體育博彩</h2>
					</div>
				</div>
				<div class="hover ehover12" :class="{ 'coming_soon': !checkGames.PHALE }" @click="checkLogin2Games('PHALE')">
					<img class="img-responsive" src="/resource/static/platform-sin-mobile/img/game_01.png" alt="">
					<div class="overlay">
						<span>聚鑫娛樂城</span>
						<h2>真人視訊</h2>
						<button class="info nullbutton" data-toggle="modal" data-target="#modal12" v-if="!checkGames.PHALE">
							<a href="#">敬請期待</a>
						</button>
					</div>
				</div>
				<div class="hover ehover12" :class="{ 'coming_soon': !checkGames.PHAST }">
					<img class="img-responsive" src="/resource/static/platform-sin-mobile/img/game_04-1.png" alt="">
					<div class="overlay">
						<span>聚鑫娛樂城</span>
						<h2>電子遊戲</h2>
					</div>
				</div>
				<div class="hover ehover12" :class="{ 'coming_soon': !checkGames.PHA3D }" @click="checkLogin2Games('PHA3D')">
					<img class="img-responsive" src="/resource/static/platform-sin-mobile/img/game_04-2.png" alt="">
					<div class="overlay">
						<span>聚鑫娛樂城</span>
						<h2>3D電子遊戲</h2>
					</div>
				</div>
				<div class="hover ehover12" :class="{ 'coming_soon': !checkGames.PHAGO }" @click="checkLogin2Games('PHAGO')">
					<img class="img-responsive" src="/resource/static/platform-sin-mobile/img/game_03.png" alt="">
					<div class="overlay">
						<span>聚鑫娛樂城</span>
						<h2>黃金期權</h2>
						<button class="info nullbutton" data-toggle="modal" data-target="#modal12" v-if="!checkGames.PHAGO">
							<a href="#">敬請期待</a>
						</button>
					</div>
				</div>
				<div class="hover ehover12 coming_soon">
					<img class="img-responsive" src="/resource/static/platform-sin-mobile/img/game_05.png" alt="">
					<div class="overlay">
						<span>聚鑫娛樂城</span>
						<h2>彩票</h2>
						<button class="info nullbutton" data-toggle="modal" data-target="#modal12">
							<a href="#">敬請期待</a>
						</button>
					</div>
				</div>
				<div class="hover ehover12 coming_soon">
					<img class="img-responsive" src="/resource/static/platform-sin-mobile/img/game_06.png" alt="">
					<div class="overlay">
						<span>聚鑫娛樂城</span>
						<h2>彩球</h2>
						<button class="info nullbutton" data-toggle="modal" data-target="#modal12">
							<a href="#">敬請期待</a>
						</button>
					</div>
				</div>
				<div class="hover ehover12 coming_soon">
					<img class="img-responsive" src="/resource/static/platform-sin-mobile/img/game_07.png" alt="">
					<div class="overlay">
						<span>聚鑫娛樂城</span>
						<h2>對戰棋牌類</h2>
						<button class="info nullbutton" data-toggle="modal" data-target="#modal12">
							<a href="#">敬請期待</a>
						</button>
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

export default {
	mixins: [Link, Game, Broadcast],
	data: () => ({
		teachRouteName: 'sin-mobile-dowonload-teach',
		platformAPPActiveLink: 'pharaoh-platform-sin://'
	}),
	components: {
		MySlide: require('@/Platform/shared/Slide')
	}
}
</script>
  
<style scoped>
.marquee {
	width: 100%;
}
.gameMove {
	background: transparent;
}

.gameMove img {
	max-width: none;
	width: calc(100% + 0px);
	-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
	transition: opacity 0.35s, transform 0.35s;
	-webkit-transform: translate3d(0px, 0, 0);
	transform: translate3d(0px, 0, 0);
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}

.gameMove:hover img {
	opacity: 0.4;
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}

.gameMove .overlay {
	padding: 20px 20px;
}

.gameMove h2 {
	position: relative;
	top: -20px;
	left: 0px;
	overflow: hidden;
	padding: 0;
	background-color: transparent;
	font-size: 20px;
	font-weight: 200;
	text-align: left;
}

.gameMove h2::after {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 2px;
	background: #fff;
	-webkit-transition: -webkit-transform 0.35s;
	transition: transform 0.35s;
	-webkit-transform: translate3d(-100%, 0, 0);
	transform: translate3d(-100%, 0, 0);
}

.gameMove:hover h2::after {
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}

.gameMove button {
	color: #fff;
	opacity: 0;
	-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
	transition: opacity 0.35s, transform 0.35s;
	-webkit-transform: translate3d(100%, 0, 0);
	transform: translate3d(100%, 0, 0);
	background: transparent;
	border: 1px solid #fff;
	position: relative;
	top: -123px;
	left: -86px;
}

.gameMove button a {
	color: #fff !important;
}

.gameMove:hover button {
	opacity: 1;
	-webkit-transform: translate3d(-150%, 0, 0);
	transform: translate3d(10, 0, 0);
}
</style>
