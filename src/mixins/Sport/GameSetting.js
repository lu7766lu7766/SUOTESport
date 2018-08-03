import SportIndex from 'src/mixins/Sport/SportIndex'
import MobilePager from 'src/mixins/Common/MobilePager'
import { mapGetters, mapActions } from 'vuex'
import { LoginType } from 'src/store/module/login'
import { BetType } from 'src/store/module/bet'
import LeagueScaleConf from 'src/config/LeagueScaleConf'

export default {
	mixins: [SportIndex, MobilePager],
	data: () => ({
		datas: [],
		cSport: {}, // 為一個球類物件
		cLeagueScale: 0,
		leagueScaleConf: LeagueScaleConf,
		mLeagues: [],
		leaguePager: {}
	}),
	watch: {
		cLeagueScale(newVal) {
			this.resetData()
		}
	},
	methods: {
		...mapActions(['getLeagueByScale']),
		toggleSetting(index) {
			_.forEach(this.datas[index], set => {
				set.isShow = set.isTitle ? true : !set.isShow
			})
		},
		onGetGameSetting() {
			//this.userInfo.account.p43_game_mode_account_config
			var datas = _.filter(
				_.map(this.gameSetting),
				config => config.p43_gmac_league == this.cLeagueScale && config.p43_gmac_sbl_id == this.cSport.sbl_id
			)
			if (!datas.length) {
				this.$bus.emit('show.alert', {
					type: 'mainten',
					content: this.$t('noResult')
				})
			} else {
				const gamesIDList = _.map(this.games, 'sge_id')
				const playsIDList = _.map(this.plays, 'spy_id')
				datas = _.orderBy(datas, [
					data => _.indexOf(gamesIDList, data.p43_gmac_sge_id),
					data => _.indexOf(playsIDList, data.p43_gmac_spy_id)
				])
				this.datas = _.map(
					_.mapValues(_.groupBy(datas, 'p43_gmac_sge_id'), gSgeDatas => {
						return _.mapValues(gSgeDatas, (data, index) => {
							data.isTitle = index == 0
							data.isShow = index == 0
							return data
						})
					})
				)
				// 2,3 merge 12,13 merge
				// 上下半場 走地上下半場
				// 目前寫在view上
			}
		},
		async onGetLeagueByScale() {
			var res = await this.getLeagueByScale({
				sbl_guid: this.cSport.sbl_guid,
				scale_type: this.cLeagueScale,
				page: this.leaguePager.page
			})
			if (res.code === 0) {
				this.mLeagues = res.data.data
				this.leaguePager.lastPage = res.data.last_page
			}
		},
		resetData() {
			this.mLeagues = []
			this.leaguePager = {
				page: 1,
				lastPage: 0
			}
			this.$bus.emit('current.league.update', this.cLeagueScale)
		},
		async onGetLeagueAndSendData() {
			this.resetData()
			await this.onGetLeagueByScale()
			this.$bus.emit('league.scale.show', {
				mLeagues: this.mLeagues,
				leaguePager: this.leaguePager
			})
		},
		getLeagueScaleByValue(cLeagueScale) {
			return this.$getKeyByValue(this.leagueScaleConf, cLeagueScale)
		}
	},
	computed: mapGetters({
		minBet: BetType.minBet,
		gameSetting: LoginType.gameSetting
	}),
	created() {
		this.cLeagueScale = _.map(LeagueScaleConf)[0]
		this.$dataTick(() => {
			this.cSport = this.sports[0]
		})
	}
}
