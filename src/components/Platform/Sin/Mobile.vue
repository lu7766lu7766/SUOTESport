<template>
	<section>
		<my-header />
		<router-view transition="slide"></router-view>
		<my-footer />
	</section>
</template>

<script>
import Loading from 'src/mixins/Common/Check/Loading'

export default {
	name: 'platform-credit',
	mixins: [Loading],
	components: {
		MySlide: require('@/Platform/shared/Slide'),
		MyHeader: require('@/Platform/Sin/Mobile/shared/Header'),
		MyFooter: require('@/Platform/Sin/Mobile/shared/Footer')
	},
	head: {
		link: [
			{ rel: 'shortcut icon', href: '/resource/static/platform-sin-mobile/img/ico.ico' },
			{ rel: 'stylesheet', href: '/resource/static/platform-sin-mobile/css/main.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-sin-mobile/css/font-awesome.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-sin-mobile/bootstrap/css/bootstrap.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-sin-mobile/css/slider.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-sin-mobile/css/icon.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-sin-mobile/font/css/font-awesome.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-sin-mobile/css/panel.css' }
		]
	},
	created() {
		this.$bus.on('show.alert', todo => {
			this.$swal(todo.content)
		})
	},
	mounted() {
		$.getScript('/static/script/platform-sin-mobile.js')
		var $document = $(document)
		$document.off('scroll').on('scroll', () => {
			var realScrollTop = $document.scrollTop() + $(window).height()
			if (realScrollTop == document.body.scrollHeight) {
				this.$bus.emit('scroll.bottom')
			}
		})
	},
	destroyed() {
		this.$bus.off('show.alert')
	}
}
</script>

<style lang="stylus" scoped>
.header-space
	display none

@media screen and (max-width: 768px)
	.header-space
		display block
		height 72px

#NoticeModal .modal-dialog
	z-index 10001
	margin-top 20%

#NoticeModal .modal-content
	background rgba(12, 30, 76, 0.9)
	color #efefef
	border 1px solid #D4DFE6
	padding 10px 25px 15px 25px
	letter-spacing 1px
	line-height 20px

#NoticeModal .modal-content b
	color #fcc51d
	font-weight normal

#NoticeModal .modal-body, #noteModal .modal-header
	padding 15px 0

#NoticeModal .modal-content button.close
	color #D4DFE6
	opacity 1
</style>
