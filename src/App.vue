<template>
	<router-view transition="slide"></router-view>
</template>

<script>
// common js
require('lib/myLib')
// common custom js
require('sweetalert2/dist/sweetalert2.min.css')
require('bootstrap')
import 'babel-polyfill'
// common custom css
import Vue from 'vue'
import { InfoType } from 'src/store/module/info'
import CheckPollingAndRoute from 'src/mixins/Common/Check/CheckPollingAndRoute'
import SEOController from 'lib/SEOController'
const { isMobile } = config

import vue2hammer from 'static/script/vue2hammer'

export default {
	mixins: [CheckPollingAndRoute],
	methods: {
		isIE() {
			var undef,
				v = 3,
				div = document.createElement('div'),
				all = div.getElementsByTagName('i')
			while (((div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->'), all[0])) {
				return v > 4 ? v : undef
			}
		}
	},
	async created() {
		SEOController.proccess()

		if (isMobile) {
			this.$bus.on('show.loading', () => {
				this.$loading('loading...')
			})
			this.$bus.on('close.loading', () => {
				this.$loading.close()
				$('.lx-load-mark:hidden').remove()
			})

			if (!this.isIE()) {
				Vue.use(vue2hammer)
			}
		}

		this.$store.commit({
			type: InfoType.setInfo,
			isIE: this.isIE(),
			isMobile
		})
	}
}
</script>

<style lang="stylus">
.pointer
	cursor pointer

.c_red
	color red

.c-handicap
	color #00CCFF

select.my-style
	-webkit-appearance none

.vertical-container
	-webkit-display flex
	display flex
	-webkit-align-items center
	align-items center
	-webkit-justify-content center
	justify-content center

.inline
	white-space nowrap
</style>
