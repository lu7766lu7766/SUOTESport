<template>
	<div id="myLiveBox" v-show="isShow" v-hammer:pan="movehandle" v-hammer:panstart="dragStart">
		<span class="glyphicon glyphicon-remove my-close" @click="cancelFloat" />
		<video id="myLiveVideo" class="video-js" controls preload="auto" data-setup='{}' webkit-playsinline="true" playsinline="true">
		</video>
	</div>
</template>

<script>
export default {
	data: () => ({
		$box: null,
		player: null,
		isShow: false,

		tmpX: 0,
		tmpY: 0
	}),
	methods: {
		dragStart(e) {
			// console.log(e)
			this.tmpX = this.$box.offset().left
			this.tmpY = this.$box.offset().top
		},
		movehandle(e) {
			// console.log(e)
			var x = this.tmpX + e.deltaX,
				y = this.tmpY + e.deltaY
			var $window = $(window)
			var targetX = x + this.$box.width(),
				targetY = y + this.$box.height()
			// console.log(targetX, targetY)
			if (targetX < $window.width() && x > 0) {
				this.$box.css('left', x)
			}
			if (targetY < $window.height() && y > 0) {
				this.$box.css('top', y)
			}
		},
		playFloat({ el, src }) {
			var $video = $(el).find('video')
			this.$box
				.width($video.width() + 10)
				.height($video.height() + 10)
				.css({
					left: $video.offset().left + 5,
					top: $video.offset().top + 5
				})
			this.isShow = true

			this.player.height(this.$box.height())
			this.player.src({
				src,
				type: 'application/x-mpegURL'
			})
			this.player.play()
		},
		cancelFloat() {
			this.player.pause()
			this.isShow = false
		}
	},
	mounted() {
		this.player = videojs('myLiveVideo', { techOrder: ['html5'] })
		this.$box = $('#myLiveBox')
		this.$bus.on('play.float', this.playFloat)
		this.$bus.on('cancel.float', this.cancelFloat)
	},
	destroyed() {
		this.$bus.off('play.float')
		this.$bus.off('cancel.float')
	}
}
</script>

<style lang="stylus" scoped>
@impoer '~/vue-dialog-drag/dist/vue-dialog-drag.css'
#myLiveBox
	position absolute
	// border 1px red solid
	z-index 10000

.my-close
	position absolute
	right 5px
	top 5px
	z-index 1
	color white
</style>
