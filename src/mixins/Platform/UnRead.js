import { mapActions } from 'vuex'

export default {
	data: () => ({
		unRead: 0,
		timer: null
	}),
	methods: {
		...mapActions(['getUnRead'])
	},
	created() {
		var updateUnRead = async () => {
			if (this.isLogin) {
				var res = await this.getUnRead()
				if (res.code === 0) {
					this.unRead = res.data.unread
				}
			}
		}
		var onCounting = () => {
			this.timer = setInterval(updateUnRead, 60 * 1000)
		}

		this.$bus.on('update.unRead', updateUnRead)
		updateUnRead()
		onCounting()
	},
	destroyed() {
		clearInterval(this.timer)
		this.$bus.off('update.unRead')
	}
}
