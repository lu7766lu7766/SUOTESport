<template>
	<div ref="liveDialog">
		<h6>請事先安裝與開啟flash，以利直撥播放
			<a class="pointer" @click="$clearCatch"> 清除快取</a>
		</h6>
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
					{ techOrder: ['flash'] }
				)
				this.player.ready(() => {
					this.player.width($(this.$refs.liveDialog).width())
					this.player.src({
						src: this.source.webUrl, // this.source.webUrl, // 'rtmp://live02.live168.us:5119/live/nba1',
						type: 'rtmp/mp4'
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
				height: 270,
				position: {
					my: 'right bottom',
					at: 'right bottom',
					of: window
				},
				open: (event, ui) => {
					this.jqLiveInit()
				},
				close: (event, ui) => {
					// player.pause()
					this.player.dispose()
					this.$emit('close.live3', this.index)
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
