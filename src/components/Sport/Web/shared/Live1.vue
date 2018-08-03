<template>
	<div ref="liveDialog">
		<h6>請事先安裝與開啟flash，以利直撥播放
			<a class="pointer" @click="$clearCatch"> 清除快取</a>
		</h6>
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
		},
		index: {
			require: true,
			type: Number
		}
	},
	data: () => ({
		id: ''
	}),
	methods: {
		jqLiveInit() {
			var flashvars = {
				// String: 必填，可隨便填但不能為0
				userID: (parseInt(Math.random() * 1000000) + 1).toString(),
				// Number: videoId
				videoID: parseInt(this.source.vi),
				// String: 顯示在 flash 某處標題
				matchName: `${this.source.teamA} vs. ${this.source.teamB}(主)`,
				startImmediately: true,
				playerURL: 'http://qwr092.club/swf/streamvp.swf',
				// Boolean: 控制 flash 內是否出現"皇璽會" logo
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
				// console.log(swfobject)
				// console.log(this.$liveHost)
				// console.log($(`#${this.id}`).length)
				// 16*9下去算
				if (window.chrome) {
					swfobject.ua.pv = [100, 0, 0]
				}
				swfobject.embedSWF(
					`${this.$liveHost}?v=${Math.round(Math.random() * 100000000)}`,
					this.id,
					// '400px',
					// '225px',
					'100%',
					'100%',
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
		}
	},
	computed: {
		isIE() {
			return this.$store.state.Info.isIE
		}
	},
	mounted() {
		require('webpack-jquery-ui/dialog')
		this.id = 'video-live' + this.$guid().split('-')[0]
		this.$nextTick(() => {
			this.jqLiveInit()
			$(this.$refs.liveDialog).dialog({
				width: 408,
				height: 306,
				position: {
					my: 'right bottom',
					at: 'right bottom',
					of: window
				},
				title: `${this.source.teamA}  VS  ${this.source.teamB}(主)`,
				resize: (event, ui) => {
					setTimeout(() => {
						var $target = $(event.target)
						$target.css({
							width: 'auto'
						})
						$target.parent().height($target.height() + 60)
					}, 50)
				},
				close: (event, ui) => {
					this.$emit('close.live1', this.index)
				}
			})
		})
	}
}
</script>

<style lang="stylus" scoped>
</style>
