export default [
	{
		path: '',
		component: () => import('@/Platform/Sin/Mobile/Index.vue'),
		name: 'sin-mobile-index'
	},
	{
		path: 'about',
		component: () => import('@/Platform/Sin/Mobile/About.vue'),
		name: 'sin-mobile-about'
	},
	{
		path: 'privacy',
		component: () => import('@/Platform/Sin/Mobile/Privacy.vue'),
		name: 'sin-mobile-privacy'
	},
	{
		path: 'login',
		component: () => import('@/Platform/Sin/Mobile/Login.vue'),
		name: 'sin-mobile-login'
	},
	{
		path: 'news',
		component: () => import('@/Platform/Sin/Mobile/News.vue'),
		name: 'sin-mobile-news'
	},
	{
		path: 'news-detail/:nGuid',
		component: () => import('@/Platform/Sin/Mobile/NewsDetail.vue'),
		name: 'sin-mobile-news-detail'
	},
	{
		path: 'message',
		component: () => import('@/Platform/Sin/Mobile/Message.vue'),
		name: 'sin-mobile-message'
	},
	{
		path: 'faq',
		component: () => import('@/Platform/Sin/Mobile/FAQ'),
		name: 'sin-mobile-faq'
	},
	// MemberCenter
	{
		path: 'member',
		component: () => import('@/Platform/Sin/Mobile/MemberCenter/BaseInfo.vue'),
		name: 'sin-mobile-base-info'
	},
	{
		path: 'bet-detail-report',
		component: () => import('@/Platform/Sin/Mobile/MemberCenter/BetDetailReport.vue'),
		name: 'sin-mobile-bet-detail-report'
	},
	{
		path: 'bet-detail/:timeType/:reportType/:start/:end',
		component: () => import('@/Platform/Sin/Mobile/MemberCenter/BetDetail.vue'),
		name: 'sin-mobile-bet-detail'
	},
	{
		path: 'wallet',
		component: () => import('@/Platform/Sin/Mobile/MemberCenter/Wallet.vue'),
		name: 'sin-mobile-wallet'
	}
]
