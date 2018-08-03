<template>
	<div ref="liveDialog">
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
		},
		index: {
			require: true,
			type: Number
		}
	},
	data: () => ({
		id: '',
		player: null
	}),
	methods: {
		jqLiveInit() {
			this.$nextTick(() => {
				this.player = videojs(
					$(this.$refs.liveDialog)
						.find('video')
						.attr('id'),
					{ techOrder: ['html5'] }
				)
				this.player.ready(() => {
					this.player.width($(this.$refs.liveDialog).width())
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
		require('webpack-jquery-ui/dialog')
		this.id = 'video-live' + this.$guid().split('-')[0]
		this.$nextTick(() => {
			this.id = 'my-player-' + this.$guid().split('-')[0]
			$(this.$refs.liveDialog).dialog({
				width: 350,
				height: 250,
				position: {
					my: 'right bottom',
					at: 'right bottom',
					of: window
				},
				open: (event, ui) => {
					this.jqLiveInit()
				},
				close: (event, ui) => {
					this.player.dispose()
					this.$emit('close.live2', this.index)
				},
				resize: (event, ui) => {
					setTimeout(() => {
						var $target = $(event.target)
						$target.css({
							width: 'auto'
						})
						$target.parent().height($target.height() + 60)
						this.player.width($(this.$refs.liveDialog).width())
					}, 50)
				}
			})
		})
	}
}
</script>

<style lang="stylus" scoped>
</style>
