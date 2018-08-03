<template>
	<div ref="liveDialog">
		<div :id="id"></div>
	</div>
</template>

<script>
import swfobject from 'static/script/swfobject'

export default {
	props: {
		source: {
			require: true,
			type: Object
		}
	},
	data: () => ({
		id: ''
	}),
	methods: {
		jqLiveInit() {
			this.$nextTick(() => {
				var flashvars = {
					userID: (parseInt(Math.random() * 1000000) + 1).toString(),
					videoID: parseInt(this.source.vi),
					matchName: `${this.source.teamA} vs. ${this.source.teamB}(主)`,
					startImmediately: true,
					playerURL: 'http://qwr092.club/swf/streamvp.swf',
					logoVisible: true
				}
				var params = {
					menu: 'false',
					scale: 'exactFit',
					allowFullscreen: 'true',
					allowScriptAccess: 'always',
					bgcolor: '',
					wmode: 'opaque'
				}

				var attributes = {
					id: this.id
				}

				if (this.isIE && this.isIE < 11) {
					// 1xbet flash player 本身就不支援 IE11 以下的瀏覽器，要擋掉
					var chromeURL = 'http://www.google.com.tw/intl/zh-TW/chrome/browser/'
					var firefoxURL = 'http://moztw.org/firefox/'
					var ieURL = 'http://windows.microsoft.com/zh-tw/internet-explorer/ie-11-worldwide-languages'
					$('#video-live').html(`
            此<span style="color:red">免費1</span>僅支援IE11版本以上瀏覽器，如要觀看，<br />
            建議使用更快的 <a href="${chromeURL}" target="_blank">Chrome</a>
            或 <a href="${firefoxURL}" target="_blank">Firefox</a> 瀏覽器，
            或點此下載 <a href="${ieURL}" target="_blank">IE11</a>。
        `)
				} else {
					if (window.chrome) {
						swfobject.ua.pv = [100, 0, 0]
					}
					swfobject.embedSWF(
						`${this.$liveHost}?v=${Math.round(Math.random() * 100000000)}`,
						this.id,
						'100%',
						//'100%',
						$(this.$el)
							.parent()
							.height() - 30,
						'10.0.0',
						null,
						flashvars,
						params,
						attributes,
						e => {
							// console.log(e.success)
						}
					)
				}
			})
		}
	},
	computed: {
		isIE() {
			return this.$store.state.Info.isIE
		}
	},
	mounted() {
		this.id = 'video-live' + this.$guid().split('-')[0]
		this.jqLiveInit()
	},
	destroyed() {
		$(this.$refs.liveDialog).empty()
	}
}
</script>

