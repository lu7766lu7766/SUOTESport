<template>
	<section>
		<my-header />
		<div id="slider">
			<router-view></router-view>
		</div>
		<my-footer />
	</section>
</template>
  
<script>
import Loading from 'src/mixins/Common/Check/Loading'

export default {
	mixins: [Loading],
	components: {
		MyHeader: require('@/Platform/Credit/Mobile/shared/Header'),
		MyFooter: require('@/Platform/Credit/Mobile/shared/Footer')
	},
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/sport-mobile/images/favicon.png',
				sizes: '16x16',
				type: 'image/png'
			},
			// { rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/css/platform-credit-mobile.css' }
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/css/main.css' },
			// { rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/css/font-awesome.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/bootstrap/css/bootstrap.min.css' },
			// { rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/bootstrap/css/bootstrap-theme.css' },
			{ rel: 'shortcut icon', href: '/resource/static/platform-credit-mobile/bootstrap/img/ico.ico' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/css/slider.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/css/icon.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/css/calendar.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/font/css/font-awesome.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit-mobile/css/panel.css' }
		]
	},
	data: () => ({
		modalContent: '',
		refUrl: ''
	}),
	mounted() {
		$.getScript('/static/script/platform-credit-mobile.js')
		var $document = $(document)
		$document.off('scroll').on('scroll', () => {
			var realScrollTop = $document.scrollTop() + $(window).height()
			if (realScrollTop == document.body.scrollHeight) {
				this.$bus.emit('scroll.bottom')
			}
		})
	},
	created() {
		this.$bus.on('show.alert', todo => {
			this.$swal(todo.content)
		})
	},
	destroyed() {
		$(document).off('scroll')
		this.$bus.off('show.alert')
	}
}
</script>

<style lang="stylus" scoped>
#slider
	overflow-x hidden
	overflow-y auto
</style>
