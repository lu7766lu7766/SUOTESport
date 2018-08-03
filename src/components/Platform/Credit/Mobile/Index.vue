<template>
	<section>
		<my-slide />
		<div class="hr0"></div>
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
				<div class="theme-menu" @click="checkLogin2Sport()">
					<img class="img-responsive" src="/resource/static/platform-credit-mobile/img/game_02.png" alt="">
					<div class="theme-menu-bt">
						<span>法老王</span>
						<h2>體育博彩</h2>
					</div>
				</div>
			</div>
			<div class="col-xs-12 menu-option">
				<div class="theme-menu" @click="checkLogin2Games('PHALE')">
					<img class="img-responsive" src="/resource/static/platform-credit-mobile/img/game_01.png" alt="">
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
			<div class="col-xs-12 menu-option">
				<div class="theme-menu" @click="checkLogin2Games('PHAST')">
					<img class="img-responsive" src="/resource/static/platform-credit-mobile/img/game_04-1.png" alt="">
					<div class="theme-menu-bt">
						<span>法老王</span>
						<h2>電子遊戲</h2>
					</div>
					<div v-if="!checkGames.PHAST" class="masking">
						<span>敬請期待</span>
					</div>
					<div v-if="checkGames.PHAST && checkMaintains.PHAGO" class="masking">
						<span>維護中</span>
					</div>
				</div>
			</div>
			<div class="col-xs-12 menu-option">
				<div class="theme-menu" @click="checkLogin2Games('PHA3D')">
					<img class="img-responsive" src="/resource/static/platform-credit-mobile/img/game_04-2.png" alt="">
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
			<div class="col-xs-12 menu-option">
				<div class="theme-menu" @click="checkLogin2Games('PHAGO')">
					<img class="img-responsive" src="/resource/static/platform-credit-mobile/img/game_03.png" alt="">
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
			<div class="col-xs-12 menu-option">
				<div class="theme-menu" onclick="location.href='#'">
					<img class="img-responsive" src="/resource/static/platform-credit-mobile/img/game_05.png" alt="">
					<div class="theme-menu-bt">
						<span>法老王</span>
						<h2>彩票</h2>
					</div>
					<div class="masking">
						<span>敬請期待</span>
					</div>
				</div>
			</div>
			<div class="col-xs-12 menu-option">
				<div class="theme-menu" @click="checkLogin2Games('PHABL')">
					<img class="img-responsive" src="/resource/static/platform-credit-mobile/img/game_06.png" alt="">
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
			<div class="col-xs-12 menu-option">
				<div class="theme-menu" onclick="location.href='#'">
					<img class="img-responsive" src="/resource/static/platform-credit-mobile/img/game_07.png" alt="">
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
		<go-down />
	</section>
</template>
  
<script>
import Link from 'src/mixins/Platform/Link'
import Game from 'src/mixins/Platform/GameEnter'
import Broadcast from 'src/mixins/Platform/News/Broadcast-platform'

export default {
	name: 'Index',
	mixins: [Link, Game, Broadcast],
	data: () => ({
		teachRouteName: 'credit-mobile-dowonload-teach',
		platformAPPActiveLink: 'pharaoh-platform-credit://'
	}),
	components: {
		GoDown: require('@/Platform/Credit/Mobile/shared/GoDown'),
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
