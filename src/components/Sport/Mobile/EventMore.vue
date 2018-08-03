<template>
	<section>
		<div class="moretitle">
			<div class="titletab">
				<ul class="nav nav-tabs title-btn">
					<li :class="{ active: cTab=='main' }">
						<a @click="back2Main()">
							<i class="fa fa-users" aria-hidden="true"></i>
						</a>
					</li>
					<li v-show="hasMobileLive">
						<a href="#" ref="liveDropdown" class="dropdown-toggle" data-toggle="dropdown">
							<i class="fa fa-youtube-play" aria-hidden="true"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
							<li :class="{ active: cTab=='live2' }" v-if="isLive2Show">
								<a @click="cTab='live2'; live2Play()">{{ $t('live.live1') }}</a>
							</li>
							<li :class="{ active: cTab=='live3' }" v-if="isLive3Show">
								<a @click="cTab='live3'; live3Play()">{{ $t('live.live2') }}</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div @click="$router.go(-1)" class="team-info">
				<i class="fa fa-chevron-left" aria-hidden="true"></i> {{ $t('eventList') }} | {{ $t(getSleCode(leagueGuid)) }}
			</div>

		</div>
		<div class="moregame-panel">
			<div class="moregame-line">
				<div class="tab-content">
					<div class="tab-pane" :class="{ active: cTab=='main' }">
						<p class="team">
							<section v-for="(team, index) in teams" :key="index">
								<div class="col-xs-2" v-if="index != 0">V.S.</div>
								<div class="col-xs-5"> {{ $t(team.stm_code) }}</div>
							</section>
						</p>
					</div>
					<div class="tab-pane" :class="{ active: cTab=='live2' }">
						<live2 v-if="isLive2Show" :src="mySwitch.live2 || set.set_live_data.live2.url" />
					</div>
					<div class="tab-pane" :class="{ active: cTab=='live3' }">
						<live3 v-if="isLive3Show" :src="mySwitch.live3 || set.set_live_data.live3.mobileUrl" />
					</div>
				</div>
			</div>
		</div>
		<game-list :datas="cDatas" :sges="sges" :cSgeGuid.sync="cSgeGuid" :isEventLoading="isEventLoading" @refresh="onTimesUp" />

		<!--footer end-->
	</section>
</template>

<script>
import EventMore from 'src/mixins/Sport/EventMore'
import { mapActions } from 'vuex'

export default {
	mixins: [EventMore],
	components: {
		GameList: require('@/Sport/Mobile/shared/GameListMore'),
		AllPicker: require('@/Sport/Mobile/shared/AllPicker'),
		Live2: require('@/Sport/Mobile/shared/Live2'),
		Live3: require('@/Sport/Mobile/shared/Live3')
	},
	data: () => ({
		cSgeGuid: '',
		cTab: 'main',
		mySwitch: {
			// live2: 'http://live01.live168.us/ch05_control.m3u8',
			// live3: 'http://live01.live168.us/ch70_control.m3u8'
		}
	}),
	methods: {
		back2Main() {
			this.cTab = 'main'
			this.liveStop()
		},
		live2Play() {
			this.liveStop()
			this.$bus.emit('cancel.float')
			this.$bus.emit('live2.play')
		},
		live3Play() {
			this.liveStop()
			this.$bus.emit('cancel.float')
			this.$bus.emit('live3.play')
		},
		liveStop() {
			this.$bus.emit('live2.stop')
			this.$bus.emit('live3.stop')
		}
	},
	computed: {
		sges() {
			if (!this.sets.length) return []
			var sges = []
			this.$dataTick(() => {
				var allSges = this.getCorrectOrderList(
					'gameGuidList',
					_.uniq(_.map(this.sets[0].plays, 'sep_sge_guid'))
				)
				sges = _.reduce(
					allSges,
					(result, sge_guid) => {
						result.push(_.find(this.games, { sge_guid }))
						return result
					},
					[]
				)
				if (!this.cSgeGuid || _.findIndex(sges, { sge_guid: this.cSgeGuid }) == -1) {
					this.cSgeGuid = sges.length ? sges[0].sge_guid : ''
				}
			})
			return sges
		},
		cDatas() {
			if (!this.sets.length) return []
			var sets = _.cloneDeep(this.sets)
			sets[0].plays = _.filter(sets[0].plays, { sep_sge_guid: this.cSgeGuid })
			return sets
		},
		set() {
			return this.sets[0]
		},
		/**
		 * 有無視頻判斷
		 */
		hasLiveData() {
			return this.set && this.set.set_live_data
		},
		hasMobileLive() {
			return (
				this.mySwitch.live2 ||
				this.mySwitch.live3 ||
				(this.hasLiveData && (this.set.set_live_data.live2 || this.set.set_live_data.live3))
			)
		},
		isLive2Show() {
			return this.mySwitch.live2 || (this.hasLiveData && this.set.set_live_data.live2)
		},
		isLive3Show() {
			return this.mySwitch.live3 || (this.hasLiveData && this.set.set_live_data.live3)
		}
	},
	created() {
		this.$bus.emit('show.footer')
	},
	mounted() {
		$(this.$refs.liveDropdown).dropdown()
		this.$bus.on('show.main', this.back2Main)
	}
}
</script>

<style scoped>
.moretitle {
	display: -webkit-flex;
	display: flex;
	flex-direction: row-reverse;
	-webkit-align-items: center;
	align-items: center;
	padding-top: 0px;
	padding-bottom: 0px;
	padding-right: 0px;
}

.titletab {
	position: relative;
	right: 0px;
	top: 0px;
}

.title-btn {
	display: -webkit-flex;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
}

.team-info {
	text-overflow: ellipsis;
	overflow: hidden;
	-webkit-flex: 1;
	flex: 1;
}
</style>
