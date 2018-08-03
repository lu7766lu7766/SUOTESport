const type = {
	SetStore: 'Payment/setStore',
	SetResult: 'Payment/setResult',
	SetPaymentBank: 'Payment/setPaymentBank'
}

export { type as PaymentType }

export default {
	namespaced: true,
	state: {
		store: {},
		result: {},
		paymentBank: {}
	},
	mutations: {
		setStore(state, context) {
			if (context.res.code === 0) {
				state.store = _.find(context.res.data, { p78_pfc_guid: context.params.pfc_guid })
			}
		},
		setResult(state, context) {
			state.result = context
		},
		setPaymentBank(state, context) {
			state.paymentBank = context
		}
	}
}
