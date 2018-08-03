<template>
	<p id="back-top">
		<a href="#top"></a>
	</p>
</template>

<script>
export default {
	mounted() {
		$('#back-top').hide()

		// fade in #back-top
		$(function() {
			$(window).scroll(function() {
				if ($(this).scrollTop() > 100) {
					$('#back-top').fadeIn()
				} else {
					$('#back-top').fadeOut()
				}
			})

			// scroll body to 0px on click
			$('#back-top a').click(function() {
				$('body,html').animate(
					{
						scrollTop: 0
					},
					800
				)
				return false
			})
		})
	}
}
</script>

<style lang="stylus" scoped>
#back-top
	position fixed
	bottom 60px
	margin-left 85%
	z-index 999
	right 8%

	a
		display block
		text-align center
		text-transform uppercase
		text-decoration none
		-webkit-transition 1s
		-moz-transition 1s
		transition 1s
		height 67px
		width 67px
		background-image url('/resource/static/platform-cash/images/gotop.png')
</style>
