export default [
	{
		path: '',
		component: () => import('@/Sport/Web/Index'),
		name: 'sport-index'
	},
	{
		path: 'sports',
		component: () => import('@/Sport/Web/Sports'),
		name: 'sport-sports'
	},
	{
		path: 'favorites',
		component: () => import('@/Sport/Web/Favorites'),
		name: 'sport-favorites'
	},
	{
		path: 'event/:set_guid',
		component: () => import('@/Sport/Web/Event'),
		name: 'sport-event'
	},
	{
		path: 'news',
		component: () => import('@/Sport/Web/News'),
		name: 'sport-news'
	},
	{
		path: 'memberInfo',
		component: () => import('@/Sport/Web/MemberInfo/index'),
		children: [
			// { path: '', component: LayoutBaseInfo },
			// { path: 'gameSetting', component: LayoutGameSetting },
			{
				path: '',
				component: () => import('@/Sport/Web/MemberInfo/GameSetting'),
				name: 'sport-game-setting'
			},
			{
				path: 'customCurrency',
				component: () => import('@/Sport/Web/MemberInfo/CustomCurrency'),
				name: 'sport-custom-currency'
			}
		]
	},
	{
		path: 'historyAccount',
		component: () => import('@/Sport/Web/HistoryAccount'),
		name: 'sport-history-account'
	},
	{
		path: 'betDetail',
		component: () => import('@/Sport/Web/BetDetail'),
		name: 'sport-bet-detail'
	},
	{
		path: 'gameResults',
		component: () => import('@/Sport/Web/GameResults'),
		name: 'sport-game-results'
	},
	{
		path: 'service',
		component: () => import('@/Sport/Web/Service/index'),
		name: 'sport-service',
		children: [
			{
				path: 'websiteProtocol',
				component: () => import('@/Sport/Web/Service/WebsiteProtocol'),
				name: 'sport-website-protocol'
			}
		]
	}
]
