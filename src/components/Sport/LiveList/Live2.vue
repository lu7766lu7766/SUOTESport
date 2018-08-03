<template>
	<div class="vertical-container">
		<video :id="id" class="video-js" controls preload="auto" data-setup='{}' webkit-playsinline="true" playsinline="true">
		</video>
	</div>
</template>

<script>
export default {
	props: {
		source: {
			require: true,
			type: Object
		}
	},
	data: () => ({
		id: '',
		player: null
	}),
	methods: {
		jqLiveInit() {
			this.$nextTick(() => {
				this.player = videojs(this.id, { techOrder: ['html5', 'flash'] })
				this.player.ready(() => {
					this.player.height(
						$(this.$el)
							.parent()
							.height() - 21
					)
					this.player.src({
						src: this.source.url, // this.source.url, // 'http://live01.live168.us/ch05_control.m3u8',
						type: 'application/x-mpegURL'
					})
					this.player.play()
				})
			})
		}
	},
	mounted() {
		this.id = 'video-live' + this.$guid().split('-')[0]
		this.jqLiveInit()
	},
	destroyed() {
		this.player.dispose()
	}
}
</script>

<style lang="stylus" scoped>
</style>
