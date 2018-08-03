import { mapState, mapGetters } from 'vuex'
import { MenuType } from 'src/store/module/menu'
import { SportsType } from 'src/store/module/sports'
import SportIndex from 'src/mixins/Sport/SportIndex'
import mLang from 'src/mixins/Common/Lang'

export default {
	mixins: [SportIndex, mLang],
	methods: {
		getCurrentAreas(sbl_guid) {
			let areas = []
			if (this.gSblGuidLeagues && sbl_guid in this.gSblGuidLeagues) {
				_.forEach(this.gSblGuidLeagues[sbl_guid], x => {
					areas.push(this.areas.filter(y => y.sra_guid == x.sle_sra_guid)[0])
				})
			}
			return _.uniq(_.orderBy(areas, 'sra_code'))
		},
		getCurrentLeagues(sbl_guid, sra_guid) {
			if (this.gSblGuidLeagues && this.gSblGuidLeagues.hasOwnProperty(sbl_guid)) {
				return _.orderBy(this.gSblGuidLeagues[sbl_guid].filter(x => x.sle_sra_guid == sra_guid), 'sle_code')
			}
			return []
		},
		getSportIcon(sport_code) {
			var res = {}
			switch (sport_code) {
				case 'FTB': // 橄欖球
					res['background-position'] = '-19px -19px'
					res.class = 'football'
					break
				case 'BSB': // 棒球
					res['background-position'] = '-57px -38px'
					res.class = 'baseball'
					break
				case 'SOCR': // 足球
					res['background-position'] = '-76px -0px'
					res.class = 'soccer'
					break
				case 'BSKB': // 籃球
					res['background-position'] = '-133px -0px'
					res.class = 'basketball'
					break
				case 'ICEHY': // 冰球
					res['background-position'] = '-38px -19px'
					res.class = 'puck'
					break
				case 'TNS': // 網球
					res['background-position'] = '-95px -0px'
					res.class = 'Badminton'
					break
				case 'ACFTB': // 美式足球
					res['background-position'] = '-19px -19px'
					res.class = 'football'
					break
				case 'INDEX': // 指數
					res['background-position'] = '-38px -115px'
					res.class = 'stock'
					break
				case 'LOTTO': // 彩球
					res['background-position'] = '-57px -57px'
					res.class = 'bingo'
					break
				case 'HERE': //"賽馬",
					res['background-position'] = '-172px -36px'
					res.class = 'horse-racing'
					break
				case 'GRG': // "賽狗",
					res['background-position'] = '-132px -56px'
					res.class = 'dog-racing'
					break
				case 'VLB': //"排球",
					res['background-position'] = '-152px -19px'
					res.class = 'volleyball'
					break
				case 'BMT': //"羽毛球",
					res['background-position'] = '-76px -76px'
					res.class = 'badminton2'
					break
				case 'GF': //"高爾夫球",
					res['background-position'] = '-57px -19px'
					res.class = 'golf'
					break
				case 'BX': //"拳擊",
					res['background-position'] = '-75px -38px'
					res.class = 'boxing'
					break
				case 'BLD': //"撞球",
					res['background-position'] = '-94px -57px'
					res.class = 'billiards'
					break
				case 'ESPS': //"電競",
					res['background-position'] = '0px -190px'
					res.class = 'game'
					break
				default:
					res['background-position'] = '-0px -19px'
					break
			}
			return res
		},
		isShowSbl(sblCode) {
			const creditShowSblCode = ["BSB", "BSKB", "ICEHY", "SOCR", "ACFTB", "LOTTO", "INDEX", "GRG", "HERE"]
			return this.branch.p32_bch_type == 1 ||  // 現金
				(this.branch.p32_bch_type == 2 && creditShowSblCode.indexOf(sblCode) > -1) // 信用球類自訂
		},

		orderByHasEvent(sports) {
			return _.orderBy(sports, sport => (this.count[sport.sbl_guid].count ? 0 : 1))
		}
	},
	computed: {
		...mapState({
			sports: state => state.sports,
			areas: state => state.areas,
			currentSblGuid: state => state.Menu.currentSblGuid,
			currentSraGuids: state => state.Menu.currentSraGuids
		}),
		...mapGetters({
			sleGuids: MenuType.sleGuids,
			sraGuids: MenuType.sraGuids,
			gSblGuidLeagues: 'gSblGuidLeagues',
			isLiveTxt: SportsType.isLiveTxt
		}),

		count() {
			var res = {}
			_.forEach(this.sports, sport => {
				var sport_count = 0
				res[sport.sbl_guid] = {}
				_.forEach(this.getCurrentAreas(sport.sbl_guid), area => {
					var area_count = 0
					res[sport.sbl_guid][area.sra_guid] = {}
					_.forEach(this.getCurrentLeagues(sport.sbl_guid, area.sra_guid), league => {
						if (typeof league.event_count[this.isLiveTxt] == 'number') {
							sport_count += league.event_count[this.isLiveTxt]
							area_count += league.event_count[this.isLiveTxt]
						}
					})
					res[sport.sbl_guid][area.sra_guid].count = area_count
				})
				res[sport.sbl_guid].count = sport_count
			})
			return res
		}
	}
}
