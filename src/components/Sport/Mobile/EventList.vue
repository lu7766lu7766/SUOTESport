<template>
	<section>
		<div class="container search">
			<div class="row">
				<ol class="breadcrumb">
					<li>
						<router-link :to="{ name: 'sport-mobile-event-list-sports' }">{{ $t(getSblCode(sbl_guid)) }}</router-link>
					</li>
					<li>
						<router-link :to="{ name: 'sport-mobile-event-list-areas' }">{{ $t(getScyCodeBySblSra(sbl_guid, sra_guid)) }}</router-link>
					</li>
					<li>
						<router-link :to="{ name: 'sport-mobile-event-list-leagues' }">{{ $t(getSleCode(sle_guid)) }}</router-link>
					</li>
					<a style="float: right; position: relative; color: white;" @click="onRefresh">
						<i v-if="!isEventLoading" class="glyphicon glyphicon-refresh" style="top: 3px; right: 2px;"></i>
						<i v-else class='fa fa-circle-o-notch fa-spin' style="top: 2px; right: 2px;"></i>
						{{ this.showSec }}
					</a>
				</ol>
			</div>

			<div class="row">
				<div class="col-xs-12">
					<div id="custom_carousel" class="carousel slide">
						<div class="controls">
							<ul class="nav">
								<li :class="{active: start_time == ''}" @click="onDateChange('')">
									<a>{{ $t('all') }}</a>
								</li>
								<li v-for="i in [0, 1, 2, 3, 4, 5, 6]" :key="i" :class="{
										active: start_time == getAddDayTime(i)
									}" @click="onDateChange(getAddDayTime(i))">
									<a>{{ $moment().AddDay(i).Format($t('dateFormat2')) }}</a>
								</li>
							</ul>
						</div>
						<!-- Wrapper for slides -->
						<all-picker :sges="sges" :spys="spys" :sgeGuids.sync="sgeGuids" :spyGuids.sync="spyGuids" @change="onFilterChange();" />
						<!-- End Carousel Inner -->
					</div>
				</div>
			</div>
		</div>

		<game-list :datas="datas" />

	</section>
</template>

<script>
import Sports from 'src/mixins/Sport/Sports-mobile'
import { mapActions } from 'vuex'

export default {
	name: 'event-list',
	mixins: [Sports],
	components: {
		GameList: require('@/Sport/Mobile/shared/GameList'),
		AllPicker: require('@/Sport/Mobile/shared/AllPicker')
	},
	data: () => ({
		start_time: ''
	}),
	methods: {
		onDateChange(datatime) {
			this.start_time = datatime
			this.onRefresh()
		},
		onFilterChange() {
			this.onRefresh()
		},
		async onGetGameAndDataInit() {
			await this.onGetGame({
				sbl_guid: this.sbl_guid,
				sra_guid: [this.sra_guid]
			})
			this.sgeGuids = [this.sges[0].sge_guid]
			this.spyGuids = _.cloneDeep(this.allSpyGuidList)

			this.onRefresh()
		},

		getReqData() {
			return {
				sle_guid: [this.sle_guid],
				sge_guid: this.sgeGuids,
				spy_guid: this.spyGuids,
				start_time: this.start_time,
				order_type: this.orderType,
				expired: 0,
				perpage: this.perPage,
				page: this.page
			}
		}
	},
	computed: {
		sbl_guid() {
			return this.$route.params.sbl_guid
		},
		sra_guid() {
			return this.$route.params.sra_guid
		},
		sle_guid() {
			return this.$route.params.sle_guid
		},
		allSpyGuidList() {
			return _.map(this.spys, 'spy_guid')
		}
	},
	async mounted() {
		this.$bus.emit('show.footer')
		this.$dataTick(() => {
			this.onGetGameAndDataInit()
		})
	}
}
</script>
