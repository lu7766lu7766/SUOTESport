import { mapActions } from 'vuex'

export default {
	data: () => ({
		advList: []
	}),
	methods: {
		...mapActions(['getAdvertising']),
		advLink(item) {
			if (item.p84_advertising_basic.p84_abc_link !== null) {
				if (item.p84_advertising_basic.p84_abc_blank === 'y') {
					window.open(item.p84_advertising_basic.p84_abc_link)
				} else {
					window.location.href = item.p84_advertising_basic.p84_abc_link
				}
			}
		}
	},
	async mounted() {
		var res = await this.getAdvertising()
		if (res.code === 0) {
			this.advList = res.data
			this.$nextTick(() => {
				$('.carousel').carousel()
			})
		}
	}
}
