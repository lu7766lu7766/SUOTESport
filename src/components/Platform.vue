<template>
	<router-view transition="slide"></router-view>
</template>

<script>
import WebSocketMixins from 'src/mixins/Common/WebSocket'
import { LoginType } from 'src/store/module/login'
import GAController from 'lib/GAController'

export default {
	mixins: [WebSocketMixins],
	data: () => ({
		timer: null
	}),
	watch: {
		isLogin(val) {
			// 期間改變
			if (val) {
				this.doIsLogin()
			} else {
				this.webSocketClose()
			}
		}
	},
	methods: {
		doIsLogin() {
			this.$bus.emit('update.unRead')
			this.webSocketConnect()
		}
	},
	computed: {
		isLogin() {
			return this.$store.state.Login.isLogin
		}
	},
	created() {
		GAController.proccess()
		if (this.isLogin) {
			// 初始執行
			this.doIsLogin()
		}
		this.$store.dispatch('GET_PLATFORM_BASIC')
		this.$bus.emit('awake')
		this.$bus.on('await', () => {
			clearInterval(this.timer)
		})
		this.$bus.on('awake', () => {
			this.timer = setInterval(() => {
				this.$store.dispatch(LoginType.POLLING, { req: 'checking' })
			}, 60 * 1000)
		})
	},
	destroyed() {
		clearInterval(this.timer)
		this.$bus.off('await')
		this.$bus.off('awake')
	}
}
</script>