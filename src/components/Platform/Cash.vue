<template>
	<router-view transition="slide"></router-view>
</template>

<script>
import Quota from 'src/mixins/Common/Quota'
import MemberLevel from 'src/mixins/Common/MemberLevel'

export default {
	mixins: [Quota, MemberLevel],
	watch: {
		isLogin(val) {
			if (val) {
				this.updateQuota()
				this.updateUserPoint()
				this.onGetMemberLevel()
			}
		}
	},
	data: () => ({
		timer: null
	}),
	computed: {
		isLogin() {
			return this.$store.state.Login.isLogin
		}
	},
	created() {
		if (this.isLogin) {
			this.updateQuota()
			this.updateUserPoint()
			this.onGetMemberLevel()
		}

		this.$bus.emit('awake')
		this.$bus.on('await', () => {
			clearInterval(this.timer)
		})
		this.$bus.on('awake', () => {
			this.timer = setInterval(() => {
				if (this.isLogin) {
					this.updateQuota()
				}
			}, 30 * 1000)
		})
	},
	destroyed() {
		clearInterval(this.timer)
		this.$bus.off('await')
		this.$bus.off('awake')
	}
}
</script>