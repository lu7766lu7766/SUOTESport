<template>
	<iframe :src="currencyStoreUrl" style="height:100vh; width:100%; border: 0px;"></iframe>
</template>

<script>
export default {
	computed: {
		currencyStoreUrl() {
			return this.$route.query.branch + '/currency-store/buy/' + this.$route.params.pfc_guid
		}
	},
	async created() {
		await this.$store.dispatch('GET_CURRENCY_STORE_BASIC')
		var store = this.$store.state.Payment.store
		if (store && store.p78_pfc_name) {
			document.title = store.p78_pfc_name
			$('body')
				.removeClass('readyBody')
				.css({
					overflow: 'hidden',
					padding: 0,
					margin: 0
				})
			$('#loading-box').hide()
		} else {
			this.$router.push({ name: 'interface-error' })
		}
	}
}
</script>
