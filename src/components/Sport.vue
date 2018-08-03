<template>
	<router-view transition="slide"></router-view>
</template>

<script>
import Quota from 'src/mixins/Common/Quota'
import WebSocketMixins from 'src/mixins/Common/WebSocket'
import { LoginType } from 'src/store/module/login'

export default {
	mixins: [Quota, WebSocketMixins],
	data: () => ({
		timer: null,
		quotaUpdateTimer: null
	}),
	watch: {
		isLogin(val) {
			if (val) {
				this.doIsLogin()
			} else {
				this.webSocketClose()
			}
		}
	},
	methods: {
		doIsLogin() {
			this.$store.dispatch(LoginType.GET_CURRENCY)
			this.updateSportQuota()
			this.webSocketConnect()
		}
	},
	computed: {
		isLogin() {
			return this.$store.state.Login.isLogin
		}
	},
	created() {
		if (this.isLogin) {
			this.doIsLogin()
		}
		this.$store.dispatch('GET_SPORTS_BASIC')

		this.$bus.emit('awake')
		this.$bus.on('await', () => {
			clearInterval(this.timer)
		})

		this.$bus.on('awake', () => {
			this.timer = setInterval(() => {
				this.$store.dispatch(LoginType.POLLING, { req: 'checking' })
				this.$store.dispatch('GET_LEAGUES')
			}, 60 * 1000)
		})

		this.quotaUpdateTimer = setInterval(() => {
			this.updateSportQuota()
		}, 15 * 60 * 1000)
	},
	destroyed() {
		clearInterval(this.timer)
		clearInterval(this.quotaUpdateTimer)
		this.$bus.off('await')
		this.$bus.off('awake')
	}
}
</script>