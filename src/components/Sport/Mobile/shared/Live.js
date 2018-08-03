export default {
	props: {
		src: {
			type: String,
			require: true
			// default: 'http://live01.live168.us/ch05_control.m3u8'
		},
		isFloat: {
			type: Boolean,
			require: true
		}
	},
	data: () => ({
		id: 'my-player',
		player: null,
		isLoaded: false,
		videoHeight: 0
	}),
	methods: {
		play() {
			if (!this.isLoaded) {
				this.id = 'my-player-' + this.$guid().split('-')[0]
				this.$nextTick(() => {
					var $box = $('#canvas .moregame-panel')
					this.player = videojs(this.id, { techOrder: ['html5'] })
					this.player.ready(() => {
						this.player.height($box.height())
						this.player.src({
							src: this.src, //'http://live01.live168.us/ch05_control.m3u8', // this.src,
							type: 'application/x-mpegURL'
						})
						this.addFloatBtn()
						this.player.play()
					})
					this.isLoaded = true
					this.videoHeight = $('#' + this.id).css('height')
				})
			} else {
				this.player.play()
			}
		},
		stop() {
			if (this.player) {
				this.player.pause()
			}
		},
		addFloatBtn() {
			//
			var $box = $(this.$el)
			$box.find('.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar').show().css('opacity', '1')
			$box.find('.vjs-live-control').remove()
			// .vjs-icon-square
			var newbtn = document.createElement('button')
			newbtn.className = 'vjs-control vjs-button myFloatBtn'
			newbtn.type = 'button'
			newbtn.innerHTML = '<span aria-hidden="true" class="vjs-icon-square"></span><span class="vjs-control-text">FloatWindow</span>'
			var controlBar = $box.find('.vjs-control-bar')[0]
			var insertBeforeNode = $box.find('.vjs-fullscreen-control')[0]
			// console.log(this.$el)

			controlBar.insertBefore(newbtn, insertBeforeNode);
			newbtn.onclick = () => {
				this.$bus.emit('play.float', { el: this.$el, src: this.src })
				this.$bus.emit('show.main')
				// this.stop()
			}
		}
	},
	destroyed() {
		this.player = null
	}
}
