export default [
	{
		path: 'rule',
		components: {
			default: () => import('@/Sport/Service/Rule'),
			menu: () => import('@/Sport/Service/shared/RuleMenu')
		},
		name: 'sport-service-rule'
	},
	{
		path: 'relate',
		component: () => import('@/Sport/Service/RelateWebsite'),
		name: 'sport-service-relate'
	}
]
