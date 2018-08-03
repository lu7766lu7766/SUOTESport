import RouteController from 'lib/RouteController'

export default {
	beforeRouteEnter: RouteController.checkLogin,
	beforeRouteUpdate: RouteController.checkLogin
}
