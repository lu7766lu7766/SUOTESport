import storage from '~/store'

const type = {
	notFromPlatform: 'Info/notFromPlatform',
	setInfo: 'Info/setInfo'
}

export { type as InfoType }

export default {
	namespaced: true,
	state: {
		layout: null,
		isIE: '',
		isMobile: true,
		isFromPlatform: true,
		site: ''
		// isIOS: storage.get('isIOS') || false
	},
	mutations: {
		notFromPlatform(state) {
			state.isFromPlatform = false
		},

		setInfo(state, payload) {
			state.isIE = payload.isIE
			state.isMobile = payload.isMobile
			state.layout = payload.layout
			state.site = payload.site
			// state.isIOS = payload.isIOS
		}
	}
}
