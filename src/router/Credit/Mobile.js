export default [
	{
		path: '',
		component: () => import('@/Platform/Credit/Mobile/Index.vue'),
		name: 'credit-mobile-index'
	},
	{
		path: 'about',
		component: () => import('@/Platform/Credit/Mobile/About.vue'),
		name: 'credit-mobile-about'
	},
	{
		path: 'privacy',
		component: () => import('@/Platform/Credit/Mobile/Privacy.vue'),
		name: 'credit-mobile-privacy'
	},
	{
		path: 'login',
		component: () => import('@/Platform/Credit/Mobile/Login.vue'),
		name: 'credit-mobile-login'
	},
	{
		path: 'news',
		component: () => import('@/Platform/Credit/Mobile/News.vue'),
		name: 'credit-mobile-news'
	},
	{
		path: 'news-detail/:nGuid',
		component: () => import('@/Platform/Credit/Mobile/NewsDetail.vue'),
		name: 'credit-mobile-news-detail'
	},
	{
		path: 'message',
		component: () => import('@/Platform/Credit/Mobile/Message.vue'),
		name: 'credit-mobile-message'
	},
	{
		path: 'faq',
		component: () => import('@/Platform/Credit/Mobile/FAQ'),
		name: 'credit-mobile-faq'
	},
	{
		path: 'downloadTeach',
		component: () => import('@/Platform/Credit/Mobile/DownloadTeach/index'),
		name: 'credit-mobile-dowonload-teach'
	},
	// MemberCenter
	{
		path: 'member',
		component: () => import('@/Platform/Credit/Mobile/MemberCenter/BaseInfo.vue'),
		name: 'credit-mobile-base-info'
	},
	{
		path: 'bet-detail-report',
		component: () => import('@/Platform/Credit/Mobile/MemberCenter/BetDetailReport.vue'),
		name: 'credit-mobile-bet-detail-report'
	},
	{
		path: 'bet-detail/:timeType/:reportType/:start/:end',
		component: () => import('@/Platform/Credit/Mobile/MemberCenter/BetDetail.vue'),
		name: 'credit-mobile-bet-detail'
	},
	{
		path: 'wallet',
		component: () => import('@/Platform/Credit/Mobile/MemberCenter/Wallet.vue'),
		name: 'credit-mobile-wallet'
	}
]
