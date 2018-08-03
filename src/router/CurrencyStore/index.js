export default [
	{
		path: 'buy/:pfc_guid',
		component: () => import('@/CurrencyStore/Buy.vue'),
		children: [
			{
				path: '',
				component: () => import('@/CurrencyStore/Buy/Buy1'),
				name: 'currency-store-buy1'
			},
			{
				path: 'step2',
				component: () => import('@/CurrencyStore/Buy/Buy2'),
				name: 'currency-store-buy2'
			},
			{
				path: 'step3',
				component: () => import('@/CurrencyStore/Buy/Buy3'),
				name: 'currency-store-buy3'
			},
			{
				path: 'special-account',
				component: () => import('@/CurrencyStore/Buy/SpecialAccount'),
				name: 'currency-store-special-account'
			},
			{
				path: 'check-account',
				component: () => import('@/CurrencyStore/Buy/CheckAccount'),
				name: 'currency-store-check-account'
			},
			{
				path: 'overtimes-error',
				component: () => import('@/CurrencyStore/Buy/OverTimesError'),
				name: 'currency-store-overtimes-error'
			}
		]
	},
	{
		path: 'sell/:pfc_guid',
		component: () => import('@/CurrencyStore/Sell.vue'),
		children: [
			{
				path: '',
				component: () => import('@/CurrencyStore/Sell/Sell1'),
				name: 'currency-store-sell1'
			},
			{
				path: 'step2',
				component: () => import('@/CurrencyStore/Sell/Sell2'),
				name: 'currency-store-sell2'
			}
		]
	},
	{
		path: 'record/:pfc_guid',
		component: () => import('@/CurrencyStore/Record.vue'),
		children: [
			{
				path: '',
				component: () => import('@/CurrencyStore/Record/index'),
				name: 'currency-store-record'
			}
		]
	},
	{
		path: 'cvs-pay-step/:pfc_guid',
		component: () => import('@/CurrencyStore/CVSPayStep.vue'),
		name: 'currency-store-cvs-pay-step'
	}
]
