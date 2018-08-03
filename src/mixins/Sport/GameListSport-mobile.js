import GameList from 'src/mixins/Sport/GameList'
import SpyConf from 'src/config/SpyConf'

export default {
	mixins: [GameList],
	props: {
		datas: {
			require: true,
			type: Array
		}
	},
	data: () => ({
		hasOpenedSetList: [],
		showSpyCode: [
			SpyConf.SPREAD,
			SpyConf.ODDEVEN,
			SpyConf.TOTAL,
			SpyConf.CAPOT,
			SpyConf.ADVANTAGE,
			SpyConf.GRAB_FIRST_POINT,
			SpyConf.GRAB_LAST_POINT
		]
	}),
	computed: {
		sets() {
			return this.datas.length
				? _.map(this.datas, setData => {
					setData.plays = _.keyBy(setData.plays, sep => this.getSpyCode(sep.sep_spy_guid))
					return setData
				})
				: {}
		}
	},
	methods: {
		mCollapse(refName) {
			const index = this.hasOpenedSetList.indexOf(refName)
			if (index > -1) {
				this.hasOpenedSetList.splice(index, 1)
			} else {
				this.hasOpenedSetList.push(refName)
			}
			this.collapse(refName)
		}
	}
}
