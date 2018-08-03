<template>
	<section>
		<div class="AD_box">
			<a><img src="/resource/static/sport/images/ad/ad.jpg" class="img-responsive"></a>
		</div>

		<!-- AD_box ed -->
		<div class="BO_box">
			<h1 class="sports-info-header_header">
				{{$t(getSblCode(sblGuid))}}{{ $t('odds') }}
				<span v-if="!isLive" class="span1">{{ $t('notlive') }}</span>
				<span v-else class="span2">{{ $t('live') }}</span>

				<bet-faster />
			</h1>
			<div class="panel with-nav-tabs panel-BO">
				<div class="panel-heading" v-if="isLive">
					<ul class="nav nav-tabs" :style="{
								visibility: 'hidden'
							}">
						<li class="active">
							<a>{{ $t('all') }}</a>
						</li>
					</ul>
				</div>
				<date-choicer v-else @change="onDateChange" :startTime="start_time" />

				<!-- 場次 -->
				<!--<sge-choicer :start_time="start_time" @change="getSep" v-model="sgeGuids" :sges="sges"/>-->

				<!-- 玩法 -->
				<!--<spy-choicer :start_time="start_time" @change="getSep" v-model="spyGuids" :spys="spys"/>-->

			</div>
			<!-- BO_box ed -->

			<div class="selectbox">

				<!-- 場次 -->
				<ul class="pull-left">
					<li v-for="(sgeCode, index) in showSgeCodeList" :key="index">
						<a href="#" class="btn btn-session" :class="{
									check: cSgeCodeList.indexOf(sgeCode) > -1
								}" @click="setCSgeCode(sgeCode)">{{ $t(sgeCode) }}</a>
					</li>
				</ul>
				<!-- <ul style="float: left">
						<li>
							<a href="#" class="btn btn-select" :class="{'active': orderType == 'time'}" @click="onOrderChange('time')" data-toggle="button">{{ $t('time') }}
								<i class="fa fa-chevron-down" aria-hidden="true"></i>
							</a>
						</li>
						<li>
							<a href="#" class="btn btn-select" :class="{'active': orderType == 'id'}" @click="onOrderChange('id')" data-toggle="button">{{ $t('eventID') }}
								<i class="fa fa-chevron-down" aria-hidden="true"></i>
							</a>
						</li>
					</ul> -->
				<ul style="float:right; margin-right:10px">
					<li>
						<span style="color: #fff">{{showSec}}</span>
					</li>
					<li>
						<a href="#" class="myBtn btn btn-pharaoh" @click="onTimesUp" data-toggle="button">{{ $t('refresh') }}
							<i v-if="isEventLoading" class='fa fa-circle-o-notch fa-spin'></i>
						</a>
					</li>
				</ul>
				<div style="clear:both;"></div>
			</div>

			<game-list-and-pager :setsPagerModel="setsPagerModel" :page="page" v-on:pageChg="onPageChange" />

		</div>
	</section>
</template>

<script>
import storage from '~/store'
import Sports from 'src/mixins/Sport/Sports'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { MenuType } from 'src/store/module/menu'
import { SportsType } from 'src/store/module/sports'
import SpyConf from 'src/config/SpyConf'

var start_time = storage.get('start_time') != undefined ? storage.get('start_time') : ''
start_time = start_time < new Date().Format('Y-m-d').GetTime() ? '' : start_time
export default {
	mixins: [Sports],
	components: {
		GameListAndPager: require('@/Sport/Web/shared/GameListAndPager'),
		DateChoicer: require('@/Sport/Web/shared/DateChoicer'),
		BetFaster: require('@/Sport/Web/shared/BetFaster')
	},
	data: () => ({
		getDataSpyCode: [
			SpyConf.SPREAD,
			SpyConf.ODDEVEN,
			SpyConf.TOTAL,
			SpyConf.CAPOT,
			SpyConf.ADVANTAGE,
			SpyConf.TIE,
			SpyConf.GRAB_FIRST_POINT,
			SpyConf.GRAB_LAST_POINT
		],
		start_time,
		setsPagerModel: {}, // 賽次資料(含pager屬性)
		perPage: 100,
		page: storage.get('page') || 1,
		timer: null
	}),
	watch: {
		/**
		 * 目前選中的場次code
		 * 走地與非走地切換也會異動cSgeCodeList
		 */
		cSgeCodeList() {
			this.updateSgeGuids()
			this.onRefresh()
		},
		isLive() {
			this.clearMenuDatas()
		},
		/**
		 * 聯盟異動
		 * 會引發sraGuids異動，取用getGame，導致cSgeCodeList改變，即會觸發onRefresh()
		 */
		sleGuids(newVal, oldVal) {
			if (newVal != oldVal) {
				this.getBasicSgeSpyGuids()
			}
		},
		/**
		 * 地區異動
		 */
		async sraGuids() {
			if (this.sraGuids.length) {
				var oShowSgeCodeList = this.showSgeCodeList
				await this.onGetGame({
					sbl_guid: this.currentSblGuid,
					sra_guid: this.sraGuids
				})
				if (this.showSgeCodeList && !_.isEqual(oShowSgeCodeList, this.showSgeCodeList)) {
					// 與原先相同則不重設index
					this.setCSgeCode(this.showSgeCodeList[0])
				}
			}
		},
		/**
		 * 球類異動
		 */
		currentSblGuid() {
			this.scys = []
		}
	},
	methods: {
		...mapMutations({
			setCSgeCode: SportsType.setCSgeCode,
			clearMenuDatas: MenuType.ClearDatas
		}),
		...mapActions(['getMultiEvent']),
		/**
		 * 取得基本的場次玩法guid
		 */
		getBasicSgeSpyGuids() {
			this.updateSpyGuids()
			this.updateSgeGuids()
		},
		updateSpyGuids() {
			this.spyGuids = _.reduce(
				this.getDataSpyCode,
				(result, code) => {
					if (this.spyCodeIndex[code]) result.push(this.spyCodeIndex[code].spy_guid)
					return result
				},
				[]
			)
		},
		updateSgeGuids() {
			this.sgeGuids = _.reduce(
				this.cSgeCodeList,
				(result, code) => {
					if (this.sgeCodeIndex[code]) result.push(this.sgeCodeIndex[code].sge_guid)
					return result
				},
				[]
			)
		},
		/**
		 * 時間異動
		 */
		onDateChange(datatime) {
			this.start_time = datatime
			this.onRefresh()
		},
		/**
		 * 排序異動，目前沒用到
		 */
		// onOrderChange(orderType) {
		// 	this.orderType = orderType
		// 	this.onRefresh()
		// },
		/**
		 * 頁數異動
		 */
		onPageChange(page) {
			this.page = page
			this.$toTop(600)
			this.onTimesUp()
		},
		getReqData() {
			return {
				start_time: !this.isLive ? this.start_time : '',
				sle_guid: this.sleGuids,
				sge_guid: this.sgeGuids,
				spy_guid: this.spyGuids,
				order_type: this.orderType,
				perpage: this.perPage,
				expired: this.isLive ? 1 : 0,
				page: this.page
			}
		},
		/**
		 * 網頁版場次玩法固定，所以不放location
		 */
		async onGetSets() {
			if (!this.sleGuids.length || !this.sgeGuids.length || !this.spyGuids.length) {
				this.setsPagerModel = {}
				return
			}
			storage.set('start_time', this.start_time)
			this.isEventLoading = true
			var res = await this.getMultiEvent(this.getReqData())
			if (res.code === 0) {
				this.setsPagerModel = res.data
			} else {
				this.setsPagerModel = {}
			}
			this.isEventLoading = false
		},
		/**
		 * web版只會顯示一頁資料，所以資料都會被覆蓋
		 */
		onRefresh() {
			// 需求變化，所以返回第一頁
			this.page = 1
			this.onTimesUp()
		},
		onTimesUp() {
			// 資料更新
			this.showSec = this.waitSec
			this.onGetSets()
		},
		/**
		 * 開始計時
		 */
		startCounting() {
			// 走地與單式更新時間
			this.showSec = this.waitSec
			this.timer = setInterval(() => {
				if (--this.showSec === 0) {
					this.onTimesUp()
				}
			}, 1000)
		},
		/**
		 * 移除計時偵聽
		 */
		stopCounting() {
			clearInterval(this.timer)
		}
	},
	computed: {
		...mapState({
			sblGuid: state => state.Menu.currentSblGuid,
			isLive: state => state.Sports.isLive,
			currentSblGuid: state => state.Menu.currentSblGuid
		}),
		...mapGetters({
			sraGuids: MenuType.sraGuids,
			sleGuids: MenuType.sleGuids
		})
	},
	async mounted() {
		this.$dataTick(() => {
			this.getBasicSgeSpyGuids()
			// onGetGame，導致cSgeCodeList改變，所以會觸發onRefresh()
			// this.onRefresh()
			this.onGetGame({
				sbl_guid: this.currentSblGuid,
				sra_guid: this.sraGuids
			})
		})

		this.startCounting()
	},
	destroyed() {
		this.stopCounting()
	}
}
</script>

<style lang="stylus" scoped>
.btn-select.active
	color #ffcc00
	background-color #000

.myBtn
	padding 2px 10px
</style>
