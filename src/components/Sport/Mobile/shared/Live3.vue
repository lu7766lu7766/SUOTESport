<template>
	<div ref="live_box" class="vertical-container">
		<video v-if="src" :id="id" class="video-js" controls preload="auto" data-setup='{}' webkit-playsinline="true" playsinline="true">
		</video>
	</div>
</template>

<script>
import Live from '@/Sport/Mobile/shared/Live'
export default {
	mixins: [Live],
	mounted() {
		this.$bus.on('live3.play', this.play)
		this.$bus.on('live3.stop', this.stop)
	},
	destroyed() {
		this.$bus.off('live3.play')
		this.$bus.off('live3.stop')
	}
}
</script>

<style lang="stylus" scoped>
.video-js .vjs-tech
	width 100%
</style>

