export default [
	{
		path: '',
		component: () => import('@/Platform/Cash/Mobile/Index'),
		name: 'cash-mobile-index'
	},
	{
		path: 'about',
		component: () => import('@/Platform/Cash/Mobile/About'),
		name: 'cash-mobile-about'
	},
	{
		path: 'news',
		component: () => import('@/Platform/Cash/Mobile/News'),
		name: 'cash-mobile-news'
	},
	{
		path: 'newsDetail/:nGuid',
		component: () => import('@/Platform/Cash/Mobile/NewsDetail'),
		name: 'cash-mobile-news-detail'
	},
	{
		path: 'promotions',
		component: () => import('@/Platform/Cash/Mobile/Promotions'),
		name: 'cash-mobile-promotions'
	},
	{
		path: 'promotionsDetail/:nID',
		component: () => import('@/Platform/Cash/Mobile/PromotionsDetail'),
		name: 'cash-mobile-promotions-detail'
	},
	{
		path: 'message',
		component: () => import('@/Platform/Cash/Mobile/Message'),
		name: 'cash-mobile-message'
	},
	{
		path: 'faq',
		component: () => import('@/Platform/Cash/Mobile/FAQ'),
		name: 'cash-mobile-faq'
	},
	{
		path: 'downloadTeach',
		component: () => import('@/Platform/Cash/Mobile/DownloadTeach/index'),
		name: 'cash-mobile-dowonload-teach'
	},
	// Register
	{
		path: 'forget',
		component: () => import('@/Platform/Cash/Mobile/Register/ForgetPassword'),
		name: 'cash-mobile-forget'
	},
	{
		path: 'reset-password',
		component: () => import('@/Platform/Cash/Mobile/Register/ResetPassword'),
		name: 'cash-mobile-reset-password'
	},
	{
		path: 'login',
		component: () => import('@/Platform/Cash/Mobile/Register/Login'),
		name: 'cash-mobile-login'
	},
	{
		path: 'forgetPassword',
		component: () => import('@/Platform/Cash/Mobile/Register/ForgetPassword'),
		name: 'cash-mobile-forget-password'
	},
	{
		path: 'joinMember',
		component: () => import('@/Platform/Cash/Mobile/Register/JoinMember'),
		name: 'cash-mobile-join-member'
	},
	{
		path: 'joinMember-step2',
		component: () => import('@/Platform/Cash/Mobile/Register/JoinMember2'),
		name: 'cash-mobile-join-member2'
	},
	{
		path: 'joinMember-step3',
		component: () => import('@/Platform/Cash/Mobile/Register/JoinMember3'),
		name: 'cash-mobile-join-member3'
	},
	// MemberCenter
	{
		path: 'baseInfo',
		component: () => import('@/Platform/Cash/Mobile/MemberCenter/BaseInfo'),
		name: 'cash-mobile-base-info'
	},
	{
		path: 'currencyTransaction',
		component: () => import('@/Platform/Cash/Mobile/MemberCenter/CurrencyTransaction'),
		name: 'cash-mobile-currency-transaction'
	},
	{
		path: 'pointTransform',
		component: () => import('@/Platform/Cash/Mobile/MemberCenter/PointTransform'),
		name: 'cash-mobile-point-transform'
	},
	{
		path: 'pointHistory',
		component: () => import('@/Platform/Cash/Mobile/MemberCenter/PointHistory'),
		name: 'cash-mobile-point-history'
	},
	{
		path: 'betDetailReport',
		component: () => import('@/Platform/Cash/Mobile/MemberCenter/BetDetailReport'),
		name: 'cash-mobile-bet-detail-report'
	},
	{
		path: 'betDetail/:timeType/:reportType/:start/:end',
		component: () => import('@/Platform/Cash/Mobile/MemberCenter/BetDetail'),
		name: 'cash-mobile-bet-detail'
	},
	{
		path: 'privacy',
		component: () => import('@/Platform/Cash/Mobile/Privacy'),
		name: 'cash-mobile-privacy'
	},
	{
		path: 'dealIntroduce',
		component: () => import('@/Platform/Cash/Mobile/DealIntroduce'),
		name: 'cash-mobile-dealIntroduce'
	},
	{
		path: 'yebpay',
		component: () => import('@/Platform/Cash/Mobile/Yebpay'),
		name: 'cash-mobile-yebpay'
	}
]
