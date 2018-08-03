<template>
	<section>
		<alert />
		<my-header style="z-index:200" />
		<div id="wrapper" class="main-container-bg" style="z-index:100">
			<div class="container">
				<!-- Navigation -->
				<ball-list />
				<div id="page-wrapper" class="" style="min-height: 327px;">
					<router-view transition="slide"></router-view>
				</div>

				<div id="rightO_box">
					<div class="Order_box">
						<bet-box />
					</div>
				</div>
				<!-- col-md-3 ed -->
			</div>
			<!-- container end -->
		</div>
		<my-footer/>
		<live-box />
		<league-scale-modal />
	</section>
</template>

<script>
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import Loading from 'src/mixins/Common/Check/Loading'

export default {
	mixins: [CheckLogin, Loading],
	head: {
		link: [
			{ rel: 'icon', href: '/resource/static/sport-mobile/images/favicon.png', sizes: '16x16', type: 'image/png' },
			// { rel: 'stylesheet', href: '/resource/static/sport/css/sport.css' }
			{ rel: 'stylesheet', href: '/resource/static/sport/bootstrap/css/bootstrap.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport/fonts/fontello/css/fontello.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport/fonts/font-awesome/css/font-awesome.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport/css/animations.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport/dist/css/sb-admin-2.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport/css/mystyles.css' },
			{ rel: 'stylesheet', href: '/static/style/font-awesome.min.css' }
		]
	},
	components: {
		MyHeader: require('@/Sport/Web/shared/Header'),
		MyFooter: require('@/Sport/Web/shared/Footer'),
		BallList: require('@/Sport/Web/shared/BallList'),
		BetBox: require('@/Sport/Web/shared/BetBox'),
		Alert: require('@/Sport/Web/shared/Alert'),
		LiveBox: require('@/Sport/Web/shared/LiveBox'),
		LeagueScaleModal: require('@/Sport/shared/LeagueScaleModal')
	}
}
</script>

<style lang="stylus" scoped>
#page-wrapper
	z-index 1000
</style>
