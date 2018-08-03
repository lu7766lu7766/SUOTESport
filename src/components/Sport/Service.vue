<template>
	<section>
		<header class="header clearfix">
			<div class="headerbar">
				<div class="container">
					<div class="row">
						<div class="col-md-3">

							<!-- logo -->
							<div class="logo">
								<router-link :to="{name: 'sport-service-rule' }">
									<img :src="cLogo" alt="" />
								</router-link>
							</div>

						</div>
						<div class="col-md-9">
							<div class="main-navigation animated">
								<nav class="navbar navbar-default" role="navigation">
									<div class="container-fluid">
										<!-- Toggle get grouped for better mobile display -->
										<div class="navbar-header">
											<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
												<span class="sr-only">Toggle navigation</span>
												<span class="icon-bar"></span>
												<span class="icon-bar"></span>
												<span class="icon-bar"></span>
											</button>
										</div>
										<!-- Collect the nav links, forms, and other content for toggling -->
									</div>
								</nav>
								<!-- navbar end -->
							</div>
						</div>
					</div>

					<router-view class="view two" name="menu"></router-view>

				</div>
			</div>
		</header>

		<router-view transition="slide"></router-view>

		<footer class="light">
			<div class="footer">
				<div class="container">
					<div class="row">
					</div>
					<hr>
					<div class="Copyright">
						<p class="text-center">Copyright © 2017 SPORT . All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	</section>
</template>

<script>
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import Loading from 'src/mixins/Common/Check/Loading'
import TmeCodeConf from 'src/config/TmeCodeConf'
import RouteConf from 'src/config/RouteConf'

export default {
	mixins: [CheckLogin, Loading],
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/sport-mobile/images/favicon.png',
				sizes: '16x16',
				type: 'image/png'
			},
			{ rel: 'stylesheet', href: '/resource/static/rule/bootstrap/css/bootstrap.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/rule/css/metisMenu.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/rule/fonts/font-awesome/css/font-awesome.css' },
			{ rel: 'stylesheet', href: '/resource/static/rule/css/sb-admin-2.css' },
			{ rel: 'stylesheet', href: '/resource/static/rule/css/rulestyles.css' }
		]
	},
	computed: {
		cLogo() {
			if (RouteConf.tmeCode() == TmeCodeConf.CASH) {
				return '/resource/static/platform-cash/images/logo.png'
			} else if (RouteConf.tmeCode() == TmeCodeConf.CREDIT) {
				return '/resource/static/platform-credit/images/logo.png'
			} else if (RouteConf.tmeCode() == TmeCodeConf.SIN) {
				return ''
			}
		}
	},
	mounted() {
		$.getScript('/static/script/service.js')
	}
}
</script>

<style lang="stylus" scoped>
#page-wrapper
	z-index 1000
</style>
