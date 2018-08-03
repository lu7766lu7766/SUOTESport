<template>
	<section>
		<div class="container search">

			<div class="row">
				<div class="col-xs-12">
					<div id="custom_carousel" class="carousel slide">
						<div class="controls">
							<ul class="nav">
								<li v-for="sport in sbls" :class="{ 
										active: sport.sbl_guid == sblGuid 
									}" :key="sport.sbl_guid" >
									<a @click="onSblChange(sport.sbl_guid)">{{ $t(sport.sbl_code) }}
										<i>{{ count[sport.sbl_guid].count }}</i>
									</a>
								</li>
							</ul>
						</div>
						<!-- Wrapper for slides -->
						<div class="carousel-inner newsnn">
							<all-picker 
								@change="onFilterChange" 
								@change:sra="onSraChange" 
								:sras="sras" 
								:sraGuids.sync="mSraGuids" 
								:sles="sles" 
								:sleGuids.sync="mSleGuids" 
								:sges="sges" 
								:sgeGuids.sync="sgeGuids" 
								:spys="spys" 
								:spyGuids.sync="spyGuids" 
								:sblGuid="sblGuid" />
							<!-- End Item -->
						</div>
						<!-- End Carousel Inner -->

					</div>

				</div>
			</div>

		</div>

		<game-list :datas="datas" class="livegame" />

		<!--footer end-->
	</section>
</template>

<script>
import Menu from 'src/mixins/Sport/Menu'
import Sports from 'src/mixins/Sport/Sports-mobile'
import { SportsType } from 'src/store/module/sports'
import { mapActions } from 'vuex'

export default {
	name: 'event-live',
	mixins: [Menu, Sports],
	components: {
		GameList: require('@/Sport/Mobile/shared/GameList'),
		AllPicker: require('@/Sport/Mobile/shared/AllPicker')
	},
	data: () => ({
		start_time: '',
		sblGuid: '',
		mSraGuids: [],
		mSleGuids: []
	}),
	methods: {
		onSblChange(guid) {
			this.sblGuid = guid
			this.mSraGuids = [this.sras[0].sra_guid]
			this.onGetGameAndDataInit()
		},
		onSraChange() {
			this.onGetGameAndDataInit()
		},
		onFilterChange() {
			this.onRefresh()
		},
		onExit() {
			this.$bus.emit('show.alert', { content: this.$t('noEvent') })
			this.$router.push({ name: 'sport-mobile-index' })
		},
		async onGetGameAndDataInit() {
			if (this.sblGuid != '' && this.mSraGuids.length) {
				await this.onGetGame({
					sbl_guid: this.sblGuid,
					sra_guid: this.mSraGuids
				})
				this.mSleGuids = this.sles.length ? [this.sles[0].sle_guid] : []
				this.sgeGuids = this.sges.length ? [this.sges[0].sge_guid] : []
				this.spyGuids = _.map(this.spys, 'spy_guid')

				this.onRefresh()
			} else {
				this.onExit()
			}
		},

		getReqData() {
			return {
				sle_guid: this.mSleGuids,
				sge_guid: this.sgeGuids,
				spy_guid: this.spyGuids,
				// start_time: this.start_time,
				order_type: this.orderType,
				expired: 1,
				perpage: this.perPage,
				page: this.page
			}
		}
	},
	computed: {
		sbls() {
			return _.filter(this.sports, sport => this.count[sport.sbl_guid].count)
		},
		sras() {
			return _.filter(this.getCurrentAreas(this.sblGuid), area => {
				area.set_count = this.count[this.sblGuid][area.sra_guid].count
				return this.count[this.sblGuid][area.sra_guid].count
			})
		},
		sles() {
			return _.filter(this.getCurrentLeagues(this.sblGuid, this.mSraGuids[0]), league => {
				league.set_count = league.event_count[this.isLiveTxt]
				return league.event_count[this.isLiveTxt]
			})
		}
	},
	async created() {
		this.$bus.emit('show.footer')
		this.$store.commit(SportsType.setIsLive, true)

		this.$dataTick(() => {
			this.sblGuid = this.sbls.length ? this.sbls[0].sbl_guid : ''
			this.mSraGuids = this.sras.length ? [this.sras[0].sra_guid] : []
			this.onGetGameAndDataInit()
		})
	},
	destroyed() {
		this.$store.commit(SportsType.setIsLive, false)
	}
}
</script>