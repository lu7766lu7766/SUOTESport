export default [
	{
		path: 'error',
		component: () => import('@/Interface/error'),
		name: 'interface-error'
	},
	{
		path: 'store/:pfc_guid',
		component: () => import('@/Interface/Store/index'),
		name: 'interface-store'
	},
	{
		path: 'backup',
		component: () => import('@/Interface/Backup/index'),
		name: 'interface-backup'
	}
]
