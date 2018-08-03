const type = {
	setTags: 'News/setTags',
	setCategorys: 'News/setCategorys',
	setSportCategorys: 'News/setSportCategorys'
}

export { type as NewsType }

export default {
	namespaced: true,
	state: {
		tags: [],
		categorys: []
	},
	mutations: {
		setTags(state, res) {
			if (res.code === 0) {
				state.tags = res.data.data
			}
		},
		setCategorys(state, res) {
			if (res.code === 0) {
				state.categorys = res.data.data
			}
		},
		setSportCategorys(state, res) {
			if (res.code === 0 && res.data) {
				state.categorys = [res.data]
			}
		}
	}
}
