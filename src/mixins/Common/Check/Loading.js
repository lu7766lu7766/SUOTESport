export default {
	created() {
		showLoadingPage()
		this.$on('okHead', () => {
			$('#loading-box .word').css({
				transform: 'translate(-50%, -50%)'
			})
			this.$cssTick(() => {
				this.$dataTick(() => {
					this.$nextTick(() => {
						this.$imgTick(() => {
							hideloadingPage()
						})
					})
				})
			})
		})
	}
}

var showLoadingPage = () => {
		$('body').addClass('readyBody')
		$('#loading-box').show()
	},
	hideloadingPage = () => {
		$('#loading-box').hide()
		$('body').removeClass('readyBody')
	}
