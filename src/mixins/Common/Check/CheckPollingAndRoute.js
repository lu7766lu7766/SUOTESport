import RouteController from 'lib/RouteController'

export default {
	beforeRouteEnter: RouteController.checkPollingAndRoute,
	beforeRouteUpdate: RouteController.checkPollingAndRoute
}
