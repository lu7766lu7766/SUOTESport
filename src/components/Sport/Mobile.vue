<template>
	<section>
		<my-menu />
		<my-header />
		<menu-modal />
		<div class="canvas" :class="{ 'no-p-b': !isShowFooter }" id="canvas">
			<router-view transition="slide"></router-view>
		</div>
		<my-footer :isShowFooter.sync="isShowFooter" />
		<league-scale-modal />
		<live-box />
	</section>
</template>

<script>
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import Loading from 'src/mixins/Common/Check/Loading'

export default {
	name: 'sport-mobile-index',
	mixins: [CheckLogin, Loading],
	data: () => ({
		isShowFooter: false
	}),
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/sport-mobile/images/favicon.png',
				sizes: '16x16',
				type: 'image/png'
			},
			// { rel: 'stylesheet', href: '/resource/static/sport-mobile/css/sport-mobile.css' }
			{ rel: 'stylesheet', href: '/resource/static/sport-mobile/bootstrap/css/bootstrap.css' },
			{ rel: 'stylesheet', href: '/static/style/bootstrap-select.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport-mobile/fonts/font-awesome/css/font-awesome.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport-mobile/plugins/magnific/magnific-popup.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport-mobile/css/mystyle.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport-mobile/css/animate.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport-mobile/css/push.css' }
		]
	},
	components: {
		MenuModal: require('@/Sport/Mobile/shared/MenuModal'),
		MyMenu: require('@/Sport/Mobile/shared/Menu'),
		MyHeader: require('@/Sport/Mobile/shared/Header'),
		MyFooter: require('@/Sport/Mobile/shared/Footer'),
		LeagueScaleModal: require('@/Sport/shared/LeagueScaleModal'),
		LiveBox: require('@/Sport/Mobile/shared/LiveBox')
	},
	methods: {
		addScrollBottomListener() {
			// 加入所有可能滾動的偵聽
			var $main = $('main'),
				$body = $('body'),
				$document = $(document)
			$main.off('scroll').on('scroll', () => {
				var realScrollTop = $main.scrollTop() + $main.height()
				if (realScrollTop == $main[0].scrollHeight) {
					this.$bus.emit('scroll.bottom')
				}
			})
			$body.off('scroll').on('scroll', () => {
				var realScrollTop = $body.scrollTop() + $body.height()
				if (realScrollTop == $body[0].scrollHeight) {
					this.$bus.emit('scroll.bottom')
				}
			})
			$document.off('scroll').on('scroll', () => {
				var realScrollTop = $document.scrollTop() + $(window).height()
				if (realScrollTop == $document.height()) {
					// if ($('html body').scrollTop() + $(window).height() == $document.height()) {
					this.$bus.emit('scroll.bottom')
				}
			})
		}
	},
	watch: {
		'$route.path'() {
			this.$nextTick(() => {
				this.addScrollBottomListener()
			})
		}
	},
	created() {
		require('~/bootstrap-select/dist/css/bootstrap-select.min.css') // 避免跟my-style互蓋

		var contents = [],
			timer
		this.$bus.on('show.alert', todo => {
			contents.push(todo.content)
			if (!timer) {
				this.$toast.bottom(contents[0], { verticalPosition: 'bottom' })
				contents.splice(0, 1)
				timer = setInterval(() => {
					if (contents.length) {
						this.$toast.bottom(contents[0])
						contents.splice(0, 1)
					} else {
						clearInterval(timer)
						timer = null
					}
				}, 2500)
			}
		})

		this.$bus.on('close.menu', closeMenu)
	},
	mounted() {
		$.getScript('/static/script/sport-mobile.js')
		this.$toTop()

		this.addScrollBottomListener()
	},
	destroyed() {
		$(document).off('scroll')
		$('main').off('scroll')
		$('body').off('scroll')
		this.$bus.off('show.alert')
		this.$bus.off('close.menu')
	},
	beforeRouteUpdate: (to, from, next) => {
		closeMenu()
		next()
	}
}

var closeMenu = () => {
	if (!$('#sidebar-left').hasClass('hidden')) {
		$('#menuSwitch').trigger('click')
	}
}
</script>

<style lang="stylus">
.lobby-container:not(.not-scroll), .page-container
	-webkit-overflow-scrolling touch

#canvas
	overflow-y visible
	overflow-x visible
	-webkit-overflow-scrolling touch
</style>
