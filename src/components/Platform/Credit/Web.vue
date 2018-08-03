<template>
	<section>
		<my-header></my-header>
		<div class="header-space"></div>
		<router-view transition="slide"></router-view>

		<my-footer></my-footer>
	</section>
</template>

<script>
import Loading from 'src/mixins/Common/Check/Loading'

export default {
	name: 'platform-credit',
	mixins: [Loading],
	components: {
		MyHeader: require('@/Platform/Credit/Web/shared/Header'),
		MyFooter: require('@/Platform/Credit/Web/shared/Footer')
	},
	data: () => ({
		modalContent: '',
		refUrl: ''
	}),
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/sport-mobile/images/favicon.png',
				sizes: '16x16',
				type: 'image/png'
			},
			// { rel: 'stylesheet', href: '/resource/static/platform-credit/css/platform-credit.css' }
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/bootstrap/css/bootstrap.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/style.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/media.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/icons.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/tabs.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/tabstyles.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/table.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/calendar.css' }
		]
	},
	created() {
		this.$bus.on('show.alert', todo => {
			this.$swal(todo.content)
		})
	},
	mounted() {
		$.getScript('/static/script/platform-credit.js')
		this.$toTop()
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
</style>
