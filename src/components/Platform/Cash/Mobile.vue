<template>
	<section>
		<alert />
		<my-header />

		<router-view transition="slide"></router-view>

		<my-footer />
	</section>
</template>

<script>
import Loading from 'src/mixins/Common/Check/Loading'

export default {
	name: 'platform-cash-mobile',
	mixins: [Loading],
	components: {
		Alert: require('@/Platform/Cash/Mobile/shared/Alert'),
		MyHeader: require('@/Platform/Cash/Mobile/shared/Header'),
		MyFooter: require('@/Platform/Cash/Mobile/shared/Footer')
	},
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/sport-mobile/images/favicon.png',
				sizes: '16x16',
				type: 'image/png'
			},
			// { rel: 'stylesheet', href: '/resource/static/platform-cash-mobile/platform-cash-mobile.css' }
			{ rel: 'stylesheet', href: '/resource/static/platform-cash-mobile/bootstrap/css/bootstrap.css' },
			{
				rel: 'stylesheet',
				href: '/resource/static/platform-cash-mobile/bootstrap/css/bootstrap.offcanvas.min.css'
			},
			{
				rel: 'stylesheet',
				href: '/resource/static/platform-cash-mobile/fonts/font-awesome/css/font-awesome.css'
			},
			{ rel: 'stylesheet', href: '/resource/static/platform-cash-mobile/plugins/fancyBox/jquery.fancybox.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-cash-mobile/css/mystyle.css' },
			{ rel: 'stylesheet', href: '/static/style/bootstrap-select.min.css' },
			// { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.2/css/bootstrap-select.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-cash-mobile/css/animate.css' }
		]
	},
	mounted() {
		$.getScript('/static/script/platform-cash-mobile.js')
		this.$toTop()
		var $document = $(document)
		$document.off('scroll').on('scroll', () => {
			var realScrollTop = $document.scrollTop() + $(window).height()
			if (realScrollTop == $document.height()) {
				this.$bus.emit('scroll.bottom')
			}
		})
	},
	destroyed() {
		$(document).off('scroll')
	},
	beforeRouteUpdate: (to, from, next) => {
		var $menu = $('#js-bootstrap-offcanvas'),
			$menuBtn = $('.navbar-toggle.offcanvas-toggle')
		if ($menu.hasClass('in')) {
			$menuBtn.trigger('click')
		}
		next()
	}
}
</script>
