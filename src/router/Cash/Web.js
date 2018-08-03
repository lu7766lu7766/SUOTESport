export default [
	{
		path: '',
		component: () => import('@/Platform/Cash/Web/Index'),
		name: 'cash-index'
	},
	{
		path: 'privacy',
		component: () => import('@/Platform/Cash/Web/Privacy'),
		name: 'cash-privacy'
	},
	{
		path: 'about',
		component: () => import('@/Platform/Cash/Web/About'),
		name: 'cash-about'
	},
	{
		path: 'news',
		component: () => import('@/Platform/Cash/Web/News'),
		name: 'cash-news'
	},
	{
		path: 'newsDetail/:nGuid',
		component: () => import('@/Platform/Cash/Web/NewsDetail'),
		name: 'cash-news-detail'
	},
	{
		path: 'appDownload',
		component: () => import('@/Platform/Cash/Web/AppDownload'),
		name: 'cash-app-download'
	},
	{
		path: 'promotions',
		component: () => import('@/Platform/Cash/Web/Promotions'),
		name: 'cash-promotions'
	},
	{
		path: 'promotionsDetail/:nID',
		component: () => import('@/Platform/Cash/Web/PromotionsDetail'),
		name: 'cash-promotions-detail'
	},
	{
		path: 'message',
		component: () => import('@/Platform/Cash/Web/Message'),
		name: 'cash-message'
	},
	{
		path: 'faq',
		component: () => import('@/Platform/Cash/Web/FAQ'),
		name: 'cash-faq'
	},
	{
		path: 'deal-introduce',
		component: () => import('@/Platform/Cash/Web/DealIntroduce'),
		name: 'cash-deal-introduce'
	},
	// Register
	{
		path: 'register-step1',
		component: () => import('@/Platform/Cash/Web/Register/Step1'),
		name: 'cash-register-step1'
	},
	{
		path: 'register-step2',
		component: () => import('@/Platform/Cash/Web/Register/Step2'),
		name: 'cash-register-step2'
	},
	{
		path: 'register-step3',
		component: () => import('@/Platform/Cash/Web/Register/Step3'),
		name: 'cash-register-step3'
	},
	{
		path: 'register-check',
		component: () => import('@/Platform/Cash/Web/Register/Check'),
		name: 'cash-register-check'
	},
	{
		path: 'forget',
		component: () => import('@/Platform/Cash/Web/Register/ForgetPassword'),
		name: 'cash-forget-pswd'
	},
	{
		path: 'yebpay',
		component: () => import('@/Platform/Cash/Web/Yebpay'),
		name: 'cash-yebpay'
	},
	// MemberCenter
	{
		path: 'memberCenter',
		component: () => import('@/Platform/Cash/Web/MemberCenter/index.vue'),
		name: 'cash-member-center',
		children: [
			{
				path: 'baseInfo',
				component: () => import('@/Platform/Cash/Web/MemberCenter/BaseInfo.vue'),
				name: 'cash-base-info'
			},
			{
				path: 'currencyTransaction',
				component: () => import('@/Platform/Cash/Web/MemberCenter/CurrencyTransaction.vue'),
				name: 'cash-currency-transaction'
			},
			{
				path: 'pointTransform',
				component: () => import('@/Platform/Cash/Web/MemberCenter/PointTransform.vue'),
				name: 'cash-point-transform'
			},
			{
				path: 'betDetailReport',
				component: () => import('@/Platform/Cash/Web/MemberCenter/BetDetailReport'),
				name: 'cash-bet-detail-report'
			},
			{
				path: 'pointHistory',
				component: () => import('@/Platform/Cash/Web/MemberCenter/PointHistory'),
				name: 'cash-point-history'
			}
		]
	}
]
