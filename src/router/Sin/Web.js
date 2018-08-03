export default [
	{
		path: '',
		component: () => import('@/Platform/Sin/Web/Index'),
		name: 'sin-index'
	},
	{
		path: 'news',
		component: () => import('@/Platform/Sin/Web/News'),
		name: 'sin-news'
	},
	{
		path: 'newsDetail/:nGuid',
		component: () => import('@/Platform/Sin/Web/NewsDetail'),
		name: 'sin-news-detail'
	},
	{
		path: 'message',
		component: () => import('@/Platform/Sin/Web/Message'),
		name: 'sin-message'
	},
	{
		path: 'privacy',
		component: () => import('@/Platform/Sin/Web/Privacy'),
		name: 'sin-privacy'
	},
	{
		path: 'faq',
		component: () => import('@/Platform/Sin/Web/FAQ'),
		name: 'sin-faq'
	},
	// MemberCenter
	{
		path: 'betDetailReport',
		component: () => import('@/Platform/Sin/Web/MemberCenter/BetDetailReport'),
		name: 'sin-member-betdetail-report'
	},
	{
		path: 'baseInfo',
		component: () => import('@/Platform/Sin/Web/MemberCenter/BaseInfo'),
		name: 'sin-member-base-info'
	},
	{
		path: 'wallet',
		component: () => import('@/Platform/Sin/Web/MemberCenter/Wallet'),
		name: 'sin-member-wallet'
	}
]
