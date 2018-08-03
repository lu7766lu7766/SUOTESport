import Vue from 'vue'
import store from 'src/store'
import VueRouter from 'vue-router'
import RouteConf from 'src/config/RouteConf'

const routes = [
	{
		path: '',
		component: () => import('src/App'),
		children: [
			{
				path: '',
				component: () => import('@/Platform'),
				children: [
					{
						path: RouteConf.sPLATFORM_PENDING,
						component: () => import('@/Platform/Pending')
					},
					{
						path: '',
						component: () => import('@/Platform/Credit'),
						children: [
							{
								path: RouteConf.sPLATFORM_CREDIT,
								component: () => import('@/Platform/Credit/Web'),
								children: require('./Credit/Web').default
							},
							{
								path: RouteConf.sPLATFORM_CREDIT + '/betDetail/:timeType/:reportType/:start/:end',
								component: () => import('@/Platform/Credit/BetDetail'),
								name: 'credit-member-betdetail'
							},
							{
								path: RouteConf.sPLATFORM_CREDIT_MOBILE,
								component: () => import('@/Platform/Credit/Mobile'),
								children: require('./Credit/Mobile').default
							}
						]
					},
					{
						path: '',
						component: () => import('@/Platform/Cash'),
						children: [
							{
								path: RouteConf.sPLATFORM_CASH,
								component: () => import('@/Platform/Cash/Web.vue'),
								children: require('./Cash/Web').default
							},
							{
								path: RouteConf.sPLATFORM_CASH + '/betDetail/:timeType/:reportType/:start/:end',
								component: () => import('@/Platform/Cash/BetDetail'),
								name: 'cash-bet-detail'
							},
							{
								path: RouteConf.sPLATFORM_CASH_MOBILE,
								component: () => import('@/Platform/Cash/Mobile.vue'),
								children: require('./Cash/Mobile').default
							}
						]
					},
					{
						path: '',
						component: () => import('@/Platform/Sin'),
						children: [
							{
								path: RouteConf.sPLATFORM_SIN,
								component: () => import('@/Platform/Sin/Web'),
								children: require('./Sin/Web').default
							},
							{
								path: RouteConf.sPLATFORM_SIN + '/betDetail/:timeType/:reportType/:start/:end',
								component: () => import('@/Platform/Sin/BetDetail'),
								name: 'sin-member-betdetail'
							},
							{
								path: RouteConf.sPLATFORM_SIN_MOBILE,
								component: () => import('@/Platform/Sin/Mobile'),
								children: require('./Sin/Mobile').default
							}
						]
					}
				]
			},
			{
				path: '',
				component: () => import('@/Sport'),
				children: [
					{
						path: RouteConf.sSPORT,
						component: () => import('@/Sport/Web'),
						children: require('./Sport/Web').default
					},
					{
						path: RouteConf.sSPORT + '/service',
						component: () => import('@/Sport/Service'),
						children: require('./Sport/Service').default
					},
					{
						path: RouteConf.sSPORT + '/live-list',
						component: () => import('@/Sport/LiveList'),
						children: require('./Sport/LiveList').default
					},
					{
						path: RouteConf.sSPORT_MOBILE,
						component: () => import('@/Sport/Mobile'),
						children: require('./Sport/Mobile').default
					}
				]
			},
			{
				path: RouteConf.sCURRENCY_STORE,
				component: () => import('@/CurrencyStore'),
				children: require('./CurrencyStore/index').default
			},
			{
				path: RouteConf.sINTERFACE,
				component: () => import('@/Interface'),
				children: require('./Interface/index').default
			}
		]
	},
	{ path: '*', redirect: '/' }
]

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
	routes // same with routes: routes
})

export default router
