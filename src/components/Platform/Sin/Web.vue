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
		MyHeader: require('@/Platform/Sin/Web/shared/Header'),
		MyFooter: require('@/Platform/Sin/Web/shared/Footer')
	},
	data: () => ({}),
	head: {
		link: [
			{ rel: 'shortcut icon', href: '/resource/static/platform-sin-mobile/img/ico.ico' },
			// { rel: 'stylesheet', href: '/resource/static/platform-credit/css/platform-credit.css' }
			{ rel: 'stylesheet', href: '/resource/static/platform-sin/bootstrap/css/bootstrap.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-sin/css/mystyle.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-sin/css/animate.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-sin/css/icons.css' }
		]
	},
	created() {
		this.$bus.on('show.alert', todo => {
			this.$swal(todo.content)
		})
	},
	mounted() {
		$.getScript('/static/script/platform-cash.js')
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
