import storage from '~/store'

const type = {
	setYebpayAccount: 'Yebpay/setYebpayAccount',
	setAllow: 'Yebpay/setAllow',
	setAlready: 'Yebpay/setAlready',
	setInterest: 'Yebpay/setInterest'
}

export { type as YebpayType }

export default {
	namespaced: true,
	state: {
		interest: 0,
		already: 0,
		allow: 0,
		lastTime: 0,
		wallet: 0,
		income_second: 0,
		income: 0,
		income_date_range: 0,
		yesterday_income: 0,
		showshow: 0
	},
	mutations: {
		setInterest(state, interest) {
			state.interest = interest
		},
		setAlready(state, already) {
			state.already = already
		},
		setAllow(state, allow) {
			state.allow = allow
		},
		setYebpayAccount(state, account) {
			state.lastTime = account.lastTime
			state.wallet = account.wallet
			state.income_second = account.income_second
			state.income = account.income
			state.income_date_range = account.income_date_range
			state.yesterday_income = account.yesterday_income
			state.showshow = account.showshow
		}
	}
}
