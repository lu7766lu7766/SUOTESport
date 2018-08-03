import { mapState, mapActions } from 'vuex'
import SportIndex from 'src/mixins/Sport/SportIndex'
import SpyConf from 'src/config/SpyConf';

export default {
	mixins: [SportIndex],
	components: {
		MyPager: require('@/shared/MyPager'),
		datetimepicker: require('@/shared/datetimepicker')
	},
	data() {
		return {
			dateTime: new Date().Format('Y-m-d'),
			leagueMap: [],
			sport: '',
			league: '',
			category: '',
			page: 1,
			total: 0,
			perPage: 20,
			datas: []
		}
	},
	methods: {
		...mapActions(['getGameResult2', 'getLeagueFilter']),
		getReqData() {
			return {
				sbl_guid: this.sport,
				sle_guid: this.league,
				scy_guid: this.category,
				date_time: this.dateTime.GetTime(),
				perpage: this.perPage,
				page: this.page
			}
		},
		async getDatas() {
			var res = await this.getGameResult2(this.getReqData())
			if (res.code === 0) {
				this.total = res.data.total
				if (this.total > 0) {
					var datas = _.cloneDeep(res.data.data)
					_.forEach(datas, data => {
						data.plays = _.map(_.groupBy(data.plays, 'sep_sge_guid'), gSgeDatas => {
							// 預設顯示讓分，如果沒開讓分才顯示其他玩法
							return _.find(gSgeDatas, data => data.sep_info.play.code == SpyConf.SPREAD) ||
								gSgeDatas[0]
						})
						data.plays = _.map(this.sepsProccess(data.plays))
					})
					this.datas = datas
				} else {
					this.$bus.emit('show.alert', {
						type: 'mainten',
						content: this.$t('noResult')
					})
				}
			}
		},
		currentOrderBy(seps) {
			return _.orderBy(seps, [
				data => {
					return this.gameCodeList.indexOf(data.sep_info.game.code) // 先依場次
				}
			])
		},
		sepsProccess(seps) {
			const isSoccer = this.isSoccerByScyCode(this.getScyCode(this.category))

			return _.mapValues(this.currentOrderBy(seps), (data, index) => {
				data.isShow = index == 0
				data.isTitle = index == 0
				data.sep_info.team = _.orderBy(data.sep_info.team, 'stm_sort', isSoccer ? 'asc' : 'desc') // 客上主下，足球相反
				return data
			})
		},
		toggleSeps(seps) {
			_.forEach(seps, sep => {
				sep.isShow = sep.isTitle ? true : !sep.isShow
			})
		},
		pageChg(page) {
			this.page = page
			this.getDatas().then(() => {
				this.$toTop()
			})
		},

		async onGetCurrentLeague() {
			this.league = ''
			if (this.category) {
				var res = await this.getLeagueFilter({
					scy_guid: this.category,
					date_time: this.dateTime.GetTime()
				})
				if (res.code === 0) {
					// trigger onLeagueChange
					this.leagueMap = res.data
					// this.league = this.leagueMap.length ? this.leagueMap[0].sle_guid : ''
				}
			} else {
				this.leagueMap = []
			}
		},
		onCategoryChange() {
			this.onGetCurrentLeague()
			if (this.category == '' || this.league == '') {
				this.pageChg(1)
			}
		},
		onLeagueChange() {
			this.pageChg(1)
		},
		search() {
			this.league = ''
			this.category = ''
			this.onLeagueChange()
		}
	},
	computed: {
		lastPage() {
			return Math.ceil(this.total / this.perPage)
		},
		categorysFilter() {
			return this.categorys.filter(c => c.scy_sbl_guid == this.sport)
		}
	},
	mounted() {
		this.$watchAsObservable('sport').subscribe(x => {
			this.category = ''
		})
		this.$watchAsObservable('dateTime').subscribe(x => {
			this.onGetCurrentLeague()
		})
		// this.$watchAsObservable('category').subscribe(x => {
		// 	// this.leagueMap = _.filter(this.leagues, ['sle_scy_guid', this.category])
		// 	// this.league = this.leagueMap.length ? this.leagueMap[0].sle_guid : ''
		// })
		// this.$watchAsObservable('league').subscribe(x => {})

		this.$dataTick(() => {
			this.sport = this.sports[0].sbl_guid
		})
	}
}
