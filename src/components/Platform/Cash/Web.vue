<template>
	<section>
		<my-header></my-header>
		<!--banner start-->
		<div class="pageslide about" :class="{ [header_bg]: true }" v-if="$route.name!='cash-index'">
			<div class="containesr">
				<div class="p-title" :class="{ [header_title]: true }"></div>
			</div>
		</div>
		<!--banner end-->
		<div class="breadcrumb-bg" v-if="$route.name!='cash-index'">
			<div class="container">
				<ol class="breadcrumb">
					<li>
						<router-link :to="{ name: 'cash-index' }">{{ $t('index') }}</router-link>
					</li>
					<li>{{ $t(headerTitleTxt) }}</li>
				</ol>
			</div>
		</div>
		<router-view transition="slide"></router-view>

		<my-footer></my-footer>
	</section>
</template>

<script>
import { NewsType } from 'src/store/module/news'
import Loading from 'src/mixins/Common/Check/Loading'

export default {
	name: 'platform-cash',
	mixins: [Loading],
	components: {
		MyHeader: require('@/Platform/Cash/Web/shared/Header'),
		MyFooter: require('@/Platform/Cash/Web/shared/Footer')
	},
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/sport-mobile/images/favicon.png',
				sizes: '16x16',
				type: 'image/png'
			},
			// { rel: 'stylesheet', href: '/resource/static/platform-cash/css/platform-cash.css' }
			{ rel: 'stylesheet', href: '/resource/static/platform-cash/bootstrap/css/bootstrap.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-cash/bootstrap/css/bootstrap.offcanvas.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-cash/fonts/font-awesome/css/font-awesome.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-cash/plugins/fancyBox/jquery.fancybox.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-cash/css/mystyle.css' },
			{ rel: 'stylesheet', href: '/static/style/bootstrap-select.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-cash/css/animate.css' },
			{
				rel: 'stylesheet',
				href: '/resource/static/platform-cash/plugins/odometer/themes/odometer-theme-car.css'
			},
			{
				rel: 'stylesheet',
				href: '/resource/static/platform-cash/plugins/odometer/themes/odometer-theme-default.css'
			},
			{
				rel: 'stylesheet',
				href: '/resource/static/platform-cash/plugins/odometer/themes/odometer-theme-digital.css'
			},
			{
				rel: 'stylesheet',
				href: '/resource/static/platform-cash/plugins/odometer/themes/odometer-theme-minimal.css'
			},
			{
				rel: 'stylesheet',
				href: '/resource/static/platform-cash/plugins/odometer/themes/odometer-theme-plaza.css'
			},
			{
				rel: 'stylesheet',
				href: '/resource/static/platform-cash/plugins/odometer/themes/odometer-theme-slot-machine.css'
			},
			{
				rel: 'stylesheet',
				href: '/resource/static/platform-cash/plugins/odometer/themes/odometer-theme-train-station.css'
			}
		]
	},
	computed: {
		header_class() {
			var res = {}
			const name = this.$route.matched[4].name
			switch (name) {
				case 'cash-member-center':
					res.header_bg = 'about'
					res.header_title = 'member'
					break
				case 'cash-message':
					res.header_bg = 'event'
					res.header_title = 'bulletin'
					break
				case 'cash-news':
					res.header_bg = 'event'
					res.header_title = 'event'
					break
				case 'cash-promotions':
					res.header_bg = 'event'
					res.header_title = 'active'
					break
				case 'cash-faq':
					res.header_bg = 'about'
					res.header_title = 'faq'
					break
				case 'cash-app-download':
					res.header_bg = 'event'
					res.header_title = 'mobile'
					break
				case 'cash-register-step1':
				case 'cash-register-step2':
				case 'cash-register-check':
					res.header_bg = 'about'
					res.header_title = 'join'
					break
				case 'cash-yebpay':
					res.header_bg = 'yebpay'
					res.header_title = 'yebpay'
					break
				default:
					res.header_bg = res.header_title = name
					break
			}
			return res
		},
		header_bg() {
			return this.header_class.header_bg
		},
		header_title() {
			return this.header_class.header_title
		},
		headerTitleTxt() {
			switch (this.$route.matched[4].name) {
				case 'cash-register-check':
				case 'cash-register-step1':
				case 'cash-register-step2':
				case 'cash-register-step3':
					return 'header.cash-register'
					break
				case 'cash-news':
				case 'cash-news-detail':
					return 'header.cash-news'
					break
				default:
					return 'header.' + this.$route.matched[4].name
					break
			}
		}
	},
	created() {
		this.$bus.on('show.alert', todo => {
			this.$swal(todo.content)
		})
	},
	mounted() {
		this.$toTop()
	},
	destroyed() {
		this.$bus.off('show.alert')
	}
}
</script>
