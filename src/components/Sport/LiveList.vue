<template>
	<div class="main-container-bg">
		<div class="container">
			<!-- Navigation -->
			<div class="row nav">
				<div class="col-md-5" style="padding-right: 0px;padding-left: 0px;">
					<ul class="main-btn">
						<li class="active">
							<a>
								{{ $t('live.live-list') }}
							</a>
							<a class="reset pointer" @click="getList()">
								<span class="glyphicon glyphicon-refresh"></span>
								{{ $t('live.refresh') }}
							</a>
						</li>
					</ul>
				</div>
				<div class="col-md-13">
					<div class="logo pull-left">
						<span>{{ $t('live.iwinbet') }}</span> {{ $t('live.here-live') }}</div>
					<ul class="mov-change pull-right">
						<li :class="{active:type=='multi'}" @click="type='multi'">
							<a class="four"></a>
						</li>
						<li :class="{active:type=='single'}" @click="type='single'">
							<a class="one"></a>
						</li>
					</ul>
				</div>
				<!-- col-md-13 ed -->
			</div>
			<div class="row">
				<div class="col-md-5 side">
					<div class="wrapperlive center-block">
						<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
							<div class="panel panel-live" v-for="(setDatas, sblCode) in datas" :key="sblCode">
								<div class="panel-heading" :class="{ 'active': sblCode == listFirstSblCode }" role="tab" id="headingOne">
									<h4 class="panel-title">
										<a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#collapse'+sblCode" aria-expanded="true" aria-controls="collapseOne">
											{{ $t(sblCode) }}
										</a>
									</h4>
								</div>
								<div :id="'collapse'+sblCode" class="panel-collapse collapse" :class="{ 'in': sblCode == listFirstSblCode }" role="tabpanel" aria-labelledby="headingOne">
									<div class="panel-body">
										<div class="divTable" v-for="(setData, index) in setDatas" :key="index">
											<div class="divTableBody">
												<div class="divTableRow">
													<div class="divTableCelltd" style="width:20%;">
														<div>{{ $moment(setData[0].set_start_time).Format('m-d')}}</div>
														<div>{{ $moment(setData[0].set_start_time).Format('H:i')}}</div>
													</div>
													<div class="divTableCelltd" style="width:70%;">
														<section v-for="(stmCode, index) in setData[0].teams" :key="index">
															<div class="vs" v-if="index > 0">vs</div>
															<t>{{ $t(stmCode) }}</t>
														</section>
													</div>
													<div class="divTableCelltd" style="width:10%;">
														<section v-for="(data, index) in setData" :key="index">
															<a id="popupDialog" class="tv" @click="openLive(data)">
																<i class="fa fa-youtube-play"></i>
															</a>
														</section>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- single -->
				<div class="col-md-13 mov" v-if="type=='single'">
					<div class="playname1" v-if="singleVideo.livePart">
						<div class="tag">{{ $t(singleVideo.p46_sad_sbl_code) }}</div>
						<button type="button" class="btn btn-mov" @click="closeLive()">x</button>
						<component :is="singleVideo.livePart" :source="singleVideo.live"></component>
						<h3>{{ singleVideo.teams.join(' vs ')}}</h3>
					</div>
					<div class="playname1" v-else>
						{{ $t('live.pls-choose-channel') }}
					</div>
				</div>
				<!-- multi -->
				<div class="col-md-13 mov" v-if="type=='multi'">
					<div class="row" v-for="row in getRange(maxVideo/colspan)" :key="row">
						<div class="col-md-9" v-for="col in getRange(colspan)" :key="row*colspan+col" :class="{ ['mov-f-box' + (col+1)]: true}">
							<div class="playname2" v-for="index in [row*2+col]" :key="index">
								<section v-if="multiVideo[index].livePart" style="height:100%">
									<div class="tag">{{ $t(multiVideo[index].p46_sad_sbl_code) }}</div>
									<button type="button" class="btn btn-mov" @click="closeLive(index)">x</button>
									<component :is="multiVideo[index].livePart" :source="multiVideo[index].live"></component>
									<h3>{{ multiVideo[index].teams.join(' vs ')}}</h3>
								</section>
								<section v-else>
									<h4>{{ $t('live.live') }}{{ index + 1 }}</h4> {{ $t('live.pls-choose-channel') }}
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- container end -->
	</div>
</template>

<script>
import Loading from 'src/mixins/Common/Check/Loading'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import { mapActions, mapGetters } from 'vuex'

export default {
	mixins: [Loading, CheckLogin],
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/sport-mobile/images/favicon.png',
				sizes: '16x16',
				type: 'image/png'
			},
			{ rel: 'stylesheet', href: '/resource/static/sport/bootstrap/css/bootstrap.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport/fonts/font-awesome/css/font-awesome.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport/css/animations.css' },
			{ rel: 'stylesheet', href: '/resource/static/sport/css/live.css' }
		]
	},
	components: {
		Live1: require('@/Sport/LiveList/Live1'),
		Live2: require('@/Sport/LiveList/Live2'),
		Live3: require('@/Sport/LiveList/Live3')
	},
	data: () => ({
		sourceData: {},
		type: 'single',
		singleVideo: {},
		multiVideo: [{}, {}, {}, {}],
		colspan: 2,
		maxVideo: 4
	}),
	methods: {
		...mapActions(['getLiveList']),
		jqInit() {
			$(this.$el)
				.find('.panel-collapse')
				.on('show.bs.collapse', function() {
					$(this)
						.siblings('.panel-heading')
						.addClass('active')
				})

			$(this.$el)
				.find('.panel-collapse')
				.on('hide.bs.collapse', function() {
					$(this)
						.siblings('.panel-heading')
						.removeClass('active')
				})
		},
		/** 取得列表 */
		async getList() {
			var res = await this.getLiveList()
			if (res.code === 0) {
				this.sourceData = res.data
			}
		},
		getRange(num) {
			return _.range(num)
		},
		openLive(data) {
			if (this.type == 'single') {
				this.singleVideo = {}
				this.$nextTick(() => {
					this.singleVideo = data
				})
			} else if (this.type == 'multi') {
				const index = this.multiVideo.findIndex(data => data.livePart == undefined)
				this.multiVideo[index] = data
				this.multiVideo = _.cloneDeep(this.multiVideo)
			}
		},
		closeLive(index) {
			if (this.type == 'single') {
				this.singleVideo = {}
			} else if (this.type == 'multi') {
				this.multiVideo[index] = {}
				this.multiVideo = _.cloneDeep(this.multiVideo)
			}
		}
	},
	computed: {
		...mapGetters(['sportCodeList']),
		setID() {
			return Number(this.$route.query.set_id)
		},
		flattenDatas() {
			return _.flatten(
				_.map(
					_.flatten(
						_.map(this.sourceData, (setDatas, livePart) => {
							return _.map(setDatas, liveData => {
								liveData.livePart = livePart
								liveData.teams = _.map(_.orderBy(liveData.set_teams_info, 'stm_sort'), data =>
									this.$t(data.stm_code)
								)
								liveData.livePart = livePart
								liveData.live =
									liveData.p46_sad_live_origin_data || // live1
									liveData.p46_sad_app_live_origin_data || // live2
									liveData.p46_sad_live_channel_origin_data // live3
								return liveData
							})
						})
					)
				)
			)
		},
		dataFirstSblCode() {
			// var res = _.head(this.flattenDatas)
			// return res ? res.p46_sad_sbl_code : ''
			return _.head(Object.keys(this.datas)) || ''
		},
		setIDData() {
			return _.find(this.flattenDatas, { p46_sad_set_id: this.setID })
		},
		listFirstSblCode() {
			return this.setIDData ? this.setIDData.p46_sad_sbl_code : this.dataFirstSblCode
		},
		datas() {
			var res = _.mapValues(
				_.groupBy(
					_.orderBy(
						this.flattenDatas,
						[data => this.sportCodeList.indexOf(data.p46_sad_sbl_code), data => data.set_start_time],
						['asc', 'desc']
					),
					'p46_sad_sbl_code'
				),
				sblDatas => {
					// set_id為數字，會被groupBy自動排序，原本的排序就會亂掉，如果再出錯就用forEach直接重寫
					return _.groupBy(sblDatas, data => data.set_start_time + '.' + data.p46_sad_set_id)
				}
			)
			return res
		}
	},
	async created() {
		// await this.$store.dispatch('GET_LIVE_LIST_BASIC')
		var res = await this.getLiveList()
		if (res.code === 0) {
			this.sourceData = res.data
			if (this.setID) {
				if (this.setIDData) {
					this.openLive(this.datas[this.listFirstSblCode][this.setID][0])
				} else {
					this.$swal(this.$t('live.cannt-find-video'))
				}
			}
			this.$nextTick(this.jqInit)
		}
	}
}
</script>

<style lang="stylus" scoped>
.side
	overflow auto
</style>
