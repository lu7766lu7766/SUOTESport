<template>
	<section>
		<section v-for="(setDatas, sle_guid) in gSleSetSgeDatas" :key="sle_guid">
			<section v-for="game in games" :key="game.sge_guid" v-if="(
					isSports && 
					(cSgeCodeList.indexOf(getSgeCode(game.sge_guid)) > -1) ) ||
	        ((isFavorites || isEvent || isHotGame) && gSleEventCount[sle_guid][game.sge_guid] > 0)">
				<div class="divTable fixed">
					<div class="divTableBody">
						<div class="divTableRow">
							<div class="divTableCellth fv"></div>
							<div class="divTableCellth ti">{{ $t('time') }}</div>
							<div class="divTableCellth tm">{{ $t('masterSlaveTeam') }}</div>
							<div v-for="(code, index) in myGetCorrectOrderList('playCodeList', showSpyCode, setDatas[0].set_scy_guid)" :key="index" class="divTableCellth" :class="{ [getClassBySpyCode(code)]: true }">
								{{ $t(code) }}
							</div>
							<div class="divTableCellth mr" v-if="isSports"></div>
						</div>
					</div>
				</div>
				<div class="teambox">

					<!-- 聯盟與場次 -->
					<h2>
						<a class="pointer">
							<i class="fa fa-star" :class="{ s_bt_1: isSleFavorite(setDatas) }" aria-hidden="true" @click="onSleFavoriteChange(setDatas)"></i>
							<!--  -->
						</a>
						<a class="pointer">
							{{ $t('league') }}: {{ $t(getSleCode(sle_guid)) }} -
							<b>{{ $t(game.sge_code) }}</b>
							<span v-if="gSleEventCount[sle_guid][game.sge_guid] > 1">({{ gSleEventCount[sle_guid][game.sge_guid] }})</span>
						</a>
					</h2>

					<!-- 賽事資料 -->
					<div class="divTable" v-for="setData in setDatas" v-if="(isFavorites && setData.plays[game.sge_guid]) ||
	                           (!isFavorites)" :key="setData.set_guid">
						<div class="divTableBody">
							<div class="divTableRow">

								<!-- 我的最愛 -->
								<div class="divTableCelltd fv">
									<a class="pointer fav" :class="{ acitve: isSetFavorite(setData.set_guid) && isLogin }" @click="onSetFavoriteChange(setData.set_guid)">
										<i class="fa fa-star" aria-hidden="true"></i>
									</a>
								</div>

								<!-- time -->
								<div class="divTableCelltd ti">
									<small class="G2" v-if="setData.set_detail_content && setData.set_detail_content.isMulti">G2</small>
									<div>{{ $moment(setData.set_start_time).Format('m-d') }}</div>
									<div>{{ $moment(setData.set_start_time).Format('H:i') }}</div>
								</div>

								<!-- team info -->
								<div class="divTableCelltd tm">
									<section v-for="team in getCTeamOrder(setData)" :key="team.stm_code">
										<t>
											<span>{{ $t(team.stm_code) }}</span>
											<b class="host" v-if="team.stm_sort == 0">{{ $t('master') }}</b>
											<!-- 投手 -->
											<template v-if="hasPitcher(setData)">
												<span v-if="team.stm_sort == 1">({{ setData.set_detail_content.pitcher.away }})</span>
												<span v-if="team.stm_sort == 0">({{ setData.set_detail_content.pitcher.home }})</span>
											</template>
										</t>
										<br>
									</section>
									<!-- 和局邏輯 -->
									<section v-if="setData.plays[game.sge_guid] && setData.plays[game.sge_guid].tie">
										{{ $t('tie') }}
									</section>
								</div>

								<!-- 玩法欄位 -->
								<div v-for="(code, index) in myGetCorrectOrderList('playCodeList', showSpyCode, setData.set_scy_guid)" :key="index" :class="{ [getClassBySpyCode(code)]: true }" class="divTableCelltd">
									<section v-if="setData.plays[game.sge_guid] && setData.plays[game.sge_guid][code]">
										<section v-for="(data, index2) in [setData.plays[game.sge_guid][code]]" :key="index2">
											<section v-for="odd in data.odds" :key="odd.spo_guid">
												<t>
													<!-- 盤口 -->
													<span v-if="isShowHandicap(getSpyCode(data.sep_spy_guid))" class="c-handicap">
														<span v-if="odd.spo_has_handicap">
															{{ getHandicap(odd) }}
														</span>
														<span v-else></span>
													</span>
													<!-- 特殊投注目標名稱 -->
													<span v-if="isHasToTransTeamName(odd.spo_distinguish)">
														{{ $t(getDisplayCode(odd)) }}
													</span>
												</t>
												<a class="pointer startorder" :class="{ 
														c_yello: spoGuids.indexOf(odd.spo_guid)>-1 
													}" @click="checkHasFasterBetting(odd)">{{ odd.spo_odds | currency(3) }}</a>
												<!-- <i v-if="odd.spo_odds_change == 0" class="fa fa-long-arrow-up" style="visibility: hidden;"></i>
												<i v-if="odd.spo_odds_change == 1" class="fa fa-long-arrow-up red"></i>
												<i v-if="odd.spo_odds_change == 2" class="fa fa-long-arrow-down green"></i> -->
												<br>
											</section>
										</section>
										<!-- 和局邏輯 -->
										<section v-if="setData.plays[game.sge_guid].tie && code == 'capot'">
											<br v-for="(odd, index) in setData.odds" :key="index" />
											<t v-for="(tieOdd, index) in setData.plays.tie.odds" :key="index">
												<a class="pointer startorder" :class="{ 
														c_yello: spoGuids.indexOf(tieOdd.spo_guid)>-1 
													}" @click="checkHasFasterBetting(tieOdd)">{{ tieOdd.spo_odds | currency(3) }}</a>
											</t>
										</section>
									</section>
								</div>

								<!-- 賽事更多 & 直播 -->
								<div class="divTableCelltd mr" v-if="isSports">
									<router-link v-if="setData.set_sep_count" :to="{ name: 'sport-event', params: { set_guid: setData.set_guid } }" class="tb-btn-moregame pointer" role="button" data-toggle="tooltip" data-placement="top" title="多種玩法">
										{{ '+' + setData.set_sep_count }}
									</router-link>
									<section v-if="setData.set_live_data">
										<!-- 直撥1 -->
										<section v-if="setData.set_live_data.live1 || setData.set_live_data.live2 || setData.set_live_data.live3">
											<a class="tv pointer" @click="openByRoute({
                              name: 'sport-live-list',
															query: {
																'set_id': setData.set_id
															}
                            }, {height: 550, width:1060}, 'live-list')">
												<i class="fa fa-youtube-play" aria-hidden="true" data-toggle="tooltip" data-placement="top"></i>
											</a>
										</section>
									</section>
								</div>
							</div>

						</div>
					</div>

				</div>
			</section>
		</section>
	</section>
</template>

<script>
import GameList from 'src/mixins/Sport/GameList'
import Bet from 'src/mixins/Sport/Bet'
import Link from 'src/mixins/Common/Link'
import { mapState } from 'vuex'
import { setTimeout } from 'timers'
import SpyConf from 'src/config/SpyConf'

export default {
	name: 'game-list-sport',
	mixins: [GameList, Bet, Link],
	components: {},
	props: {
		sets: {
			type: Array,
			required: true
		}
	},
	data: () => ({
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
	methods: {
		/** 點選聯盟加入我的最愛 */
		onSleFavoriteChange(setDatas) {
			var target = !this.isSleFavorite(setDatas)
			_.forEach(setDatas, setData => {
				var source = this.isSetFavorite(setData.set_guid)
				if (source != target) {
					this.onSetFavoriteChange(setData.set_guid)
				}
			})
		},
		/** 聯盟是否有加入我的最愛判斷 */
		isSleFavorite(setDatas) {
			var res = true
			_.forEach(setDatas, setData => {
				if (!this.isSetFavorite(setData.set_guid)) {
					res = false
					return false
				}
			})
			return res
		},
		/** 取得玩法class */
		getClassBySpyCode(code) {
			switch (code) {
				case 'spread': // 讓分
					return 'odd1'
					break
				case 'total': // 大小
					return 'odd4'
					break
				case 'oddeven': // 單雙
					return 'odd3'
					break
				case 'capot': // 獨贏
					return 'odd5'
					break
				case 'advantage': // 一輸
					return 'odd2'
					break
				case 'grabFirstPoint': // 搶首分
					return 'odd6'
					break
				case 'grabLastPoint': // 搶尾分
					return 'odd7'
					break
			}
			return 'odd5'
		},
		// 寫入視訊源
		showLive1(source) {
			this.$bus.emit('show.live1', source)
		},
		// 寫入視訊源2
		showLive2(source) {
			this.$bus.emit('show.live2', source)
		},
		// 寫入視訊源3
		showLive3(source) {
			this.$bus.emit('show.live3', source)
		},
		/** 確認是否有快速投注 */
		checkHasFasterBetting(spo) {
			if ((this.isSports || this.isHotGame) && this.isBetFaster) {
				this.fastBetting(spo)
			} else {
				this.onBetChange(spo)
			}
		},
		/** 自訂取得正確順序的method */
		myGetCorrectOrderList(prop, list, scyGuid) {
			/** 賽事更多頁、棒球才有搶首搶尾分 */
			const sblCode = this.scyGuidIndex[scyGuid]
				? this.sblGuidIndex[this.scyGuidIndex[scyGuid].scy_sbl_guid].sbl_code
				: ''
			let cloneList = _.cloneDeep(list)
			if (!(this.isEvent && sblCode == 'BSB')) {
				_.remove(cloneList, code => code == 'grabFirstPoint' || code == 'grabLastPoint')
			}
			return this.getCorrectOrderList(prop, cloneList)
		}
	},
	watch: {
		sets(nVal) {
			// 屬性在畫面成型就已經丟進來，所以不可以放在mounted
			if (nVal) {
				this.$nextTick(() => {
					$('[data-toggle="tooltip"]').tooltip()
				})
			}
		}
	},
	computed: {
		...mapState({
			isLive: state => state.Sports.isLive,
			isBetFaster: state => state.Bet.isFaster
		}),

		/** 首頁熱門賽事 */
		isHotGame() {
			return this.$route.name == 'sport-index'
		},
		/** 賽事列表 */
		isSports() {
			return this.$route.name == 'sport-sports'
		},
		/** 我的最愛 */
		isFavorites() {
			return this.$route.name == 'sport-favorites'
		},
		/** 賽事更多 */
		isEvent() {
			return this.$route.name == 'sport-event'
		},
		// sgeGuids () { return _.map(_.map(this.sets, set => set.plays), 'sep_sge_guid') },
		gSleSetSgeDatas() {
			// set sge_guid group in plays
			return this.sets
				? _.mapValues(_.groupBy(_.cloneDeep(this.sets), 'set_sle_guid'), gSleSets => {
						_.forEach(gSleSets, set => {
							set.plays = _.mapValues(
								_.groupBy(this.proccessSeps(set.plays), 'sep_sge_guid'),
								gSgeDatas => _.keyBy(gSgeDatas, sep => this.getSpyCode(sep.sep_spy_guid))
							)
						})
						return gSleSets
				  })
				: {}
		},
		/** 聯盟賽事 */
		gSleEventCount() {
			return _.reduce(
				this.gSleSetSgeDatas,
				(result, setSgeSpyCodeDatas, sle_guid) => {
					result[sle_guid] = {}
					_.forEach(this.games, game => {
						let res = 0

						_.forEach(setSgeSpyCodeDatas, set => {
							res += typeof set.plays[game.sge_guid] == 'object' ? 1 : 0
						})

						result[sle_guid][game.sge_guid] = res
					})
					return result
				},
				{}
			)
		}
	}
}
</script>

<style lang="stylus" scoped>
.c_yello
	color #ffc000

.odd1, .odd4
	width 10%

.odd2, .odd3
	width 9%

a.tv
	margin-left -15px
</style>
