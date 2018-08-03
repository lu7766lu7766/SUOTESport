export default [
	{
		path: '',
		component: () => import('@/Sport/Mobile/Index'),
		name: 'sport-mobile-index'
	},
	{
		path: 'news',
		component: () => import('@/Sport/Mobile/News'),
		name: 'sport-mobile-news'
	},
	{
		path: 'news/:nGuid',
		component: () => import('@/Sport/Mobile/NewsDetail'),
		name: 'sport-mobile-news-detail'
	},
	{
		path: 'event-list',
		component: () => import('@/Sport/Mobile/EventListSports'),
		name: 'sport-mobile-event-list-sports'
	},
	{
		path: 'event-list/areas/:sbl_guid',
		component: () => import('@/Sport/Mobile/EventListAreas'),
		name: 'sport-mobile-event-list-areas'
	},
	{
		path: 'event-list/leagues/:sbl_guid/:sra_guid',
		component: () => import('@/Sport/Mobile/EventListLeagues'),
		name: 'sport-mobile-event-list-leagues'
	},
	{
		path: 'event-list/:sbl_guid/:sra_guid/:sle_guid',
		component: () => import('@/Sport/Mobile/EventList'),
		name: 'sport-mobile-event-list'
	},
	{
		path: 'bet-box',
		component: () => import('@/Sport/Mobile/BetBox'),
		name: 'sport-mobile-bet-box'
	},
	{
		path: 'favorites',
		component: () => import('@/Sport/Mobile/Favorites'),
		name: 'sport-mobile-favorites'
	},
	{
		path: 'event-live',
		component: () => import('@/Sport/Mobile/EventLive'),
		name: 'sport-mobile-event-live'
	},
	{
		path: 'event-more/:set_guid',
		component: () => import('@/Sport/Mobile/EventMore'),
		name: 'sport-mobile-event-more'
	},
	{
		path: 'bet-detail',
		component: () => import('@/Sport/Mobile/BetDetail'),
		name: 'sport-mobile-bet-detail'
	},
	{
		path: 'game-results',
		component: () => import('@/Sport/Mobile/GameResults'),
		name: 'sport-mobile-game-results'
	},
	{
		path: 'custom-currency',
		component: () => import('@/Sport/Mobile/MemberInfo/CustomCurrency'),
		name: 'sport-mobile-custom-currency'
	},
	{
		path: 'game-setting',
		component: () => import('@/Sport/Mobile/MemberInfo/GameSetting'),
		name: 'sport-mobile-game-setting'
	},
	{
		path: 'rule',
		components: {
			default: () => import('@/Sport/Mobile/Rule')
		},
		name: 'sport-mobile-service-rule'
	},
	{
		path: 'relate',
		component: () => import('@/Sport/Mobile/RelateWebsite'),
		name: 'sport-mobile-service-relate'
	}
]
