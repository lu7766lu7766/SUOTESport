export default [
	{
		path: '',
		component: () => import('@/Platform/Credit/Web/Index'),
		name: 'credit-index'
	},
	{
		path: 'news',
		component: () => import('@/Platform/Credit/Web/News'),
		name: 'credit-news'
	},
	{
		path: 'newsDetail/:nGuid',
		component: () => import('@/Platform/Credit/Web/NewsDetail'),
		name: 'credit-news-detail'
	},
	{
		path: 'message',
		component: () => import('@/Platform/Credit/Web/Message'),
		name: 'credit-message'
	},
	{
		path: 'appDownload',
		component: () => import('@/Platform/Credit/Web/AppDownload'),
		name: 'credit-app-download'
	},
	{
		path: 'about',
		component: () => import('@/Platform/Credit/Web/About'),
		name: 'credit-about'
	},
	{
		path: 'privacy',
		component: () => import('@/Platform/Credit/Web/Privacy'),
		name: 'credit-privacy'
	},
	{
		path: 'faq',
		component: () => import('@/Platform/Credit/Web/FAQ'),
		name: 'credit-faq'
	},
	// MemberCenter
	{
		path: 'betDetailReport',
		component: () => import('@/Platform/Credit/Web/MemberCenter/BetDetailReport'),
		name: 'credit-member-betdetail-report'
	},
	{
		path: 'baseInfo',
		component: () => import('@/Platform/Credit/Web/MemberCenter/BaseInfo'),
		name: 'credit-member-base-info'
	},
	{
		path: 'wallet',
		component: () => import('@/Platform/Credit/Web/MemberCenter/Wallet'),
		name: 'credit-member-wallet'
	}
]
