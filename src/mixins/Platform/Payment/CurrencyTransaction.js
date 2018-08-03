import { mapActions } from 'vuex'
import Bank from 'src/mixins/Platform/Bank'
import Link from 'src/mixins/Common/Link'

export default {
	mixins: [Bank, Link],
	data: () => ({
		currencyStores: []
	}),
	methods: {
		...mapActions(['getCurrencyStoreList']),
		hasNoBank2BaseInfo(route) {
			this.$bus.emit('show.alert', {
				content: '查無銀行帳戶'
			})
			this.$router.push(
				_.merge(route, {
					query: { s: 'bank' }
				})
			)
		},
		getCurrencyStoreUrl(pfc_guid) {
			return (
				this.$paymentHost +
				this.$router.match({
					name: 'interface-store',
					params: { pfc_guid },
					query: { branch: location.origin }
				}).fullPath
			)
		},
		openCurrencyStoreLink(pfc_guid) {
			this.windowOpenNoStatus(this.getCurrencyStoreUrl(pfc_guid))
		}
	},
	async created() {
		var res = await this.axios.all([this.getCurrencyStoreList(), this.getMyBank()])
		if (res[0].code === 0) {
			this.currencyStores = res[0].data
		}
	}
}
