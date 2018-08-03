export default {
	data() {
		return {
			type_ref: ['welcome', 'login', 'nodata', 'mainten', 'html'],
			typeList: [],
			contentList: [],
			describeList: [],
			$modal: null,
			tmpTodo: {},
			state: 1,
			canCloseList: [],
			timeList: []
		}
	},
	props: {
		id: {
			default: 'alert-modal',
			type: String
		}
	},
	watch: {
		contentList(newValue) {
			if (newValue.length > 0) {
				if (!this.canClose) {
					var $mask = $('<div class="alert_mask"></div>')
					$mask
						.css({
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							background: 'rgba(0, 0, 0, 0)',
							'z-index': '999999'
						})
						.appendTo('body')
					$(document).on('scroll', () => {
						$mask.scrollTop($(document).scrollTop())
					})
				}

				if (newValue.length == 1 || !this.state) {
					this.$modal.modal('show')
					setTimeout(() => {
						this.$modal.modal('hide')
					}, this.time)
				}
			}
		}
	},
	computed: {
		isMobile() {
			return this.$store.state.Info.isMobile
		},
		type() {
			return this.typeList[0]
		},
		content() {
			return this.contentList[0]
		},
		describe() {
			return this.describeList[0]
		},
		time() {
			return this.timeList[0] == 0 ? 999999999 : this.timeList[0] * 1000
		},
		canClose() {
			return this.canCloseList[0]
		}
	},
	mounted() {
		this.$modal = $('#' + this.id)
		this.$bus.on('show.alert', todo => {
			this.state = 1
			this.typeList.push(todo.type || 'login')
			this.contentList.push(todo.content || this.$t('alert.pleaseLogin'))
			this.describeList.push(todo.describe || '')
			this.canCloseList.push(todo.canClose === false ? false : true)
			this.timeList.push(todo.time === 0 ? 0 : todo.time || 1.5)

			if (this.isMobile) {
				$('#login-modal').modal('hide')
			}
		})
		this.$modal.on('hidden.bs.modal', e => {
			$('.alert_mask').remove()
			$('.modal-backdrop').remove()
			$(document).off('scroll')

			this.state = 0
			this.typeList.splice(0, 1)
			this.contentList.splice(0, 1)
			this.describeList.splice(0, 1)
			this.canCloseList.splice(0, 1)
			this.timeList.splice(0, 1)
		})

		this.$bus.on('hide.alert', () => {
			this.$modal.modal('hide')
		})
	},
	destroyed() {
		this.$bus.off('show.alert')
		this.$bus.off('hide.alert')
		this.$modal.off('hidden.bs.modal')
		$(document).off('scroll')
	}
}
