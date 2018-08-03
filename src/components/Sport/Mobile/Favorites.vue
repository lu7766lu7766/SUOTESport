<template>
	<section>
		<div class="container search">
			<div class="row">
				<ol class="breadcrumb">
					<li>
						<a>{{ $t('event') }}</a>
					</li>
					<li>
						<a>{{ $t('myFavorite') }}</a>
					</li>
				</ol>
			</div>

			<div class="row">
				<div class="col-xs-12">
					<div id="custom_carousel" class="carousel slide">

						<!-- Wrapper for slides -->
						<!-- <all-picker :sges="games" :spys="plays" :sgeGuids.sync="sgeGuids" :spyGuids.sync="spyGuids"/> -->
						<!-- End Carousel Inner -->

					</div>

				</div>
			</div>

		</div>
		<game-list :datas="datas" class="favorite" />

		<!--footer end-->
	</section>
</template>

<script>
import Favorites from 'src/mixins/Sport/Favorites'

export default {
	name: 'favorites',
	mixins: [Favorites],
	components: {
		GameList: require('@/Sport/Mobile/shared/GameList')
		// AllPicker: require('@/Sport/Mobile/shared/AllPicker')
	},
	data: () => ({
		// spyGuids: [],
		// sgeGuids: [],
		datas: []
	}),
	methods: {
		// onFilterChange () {
		//   this.onGetSets()
		// }
	},
	computed: {
		// total () { return this.setsPagerModel.total },
		// currentDatas () {
		//   return _.filter(this.datas, d => this.sgeGuids.indexOf(d.sep_sge_guid) > -1 && this.spyGuids.indexOf(d.sep_spy_guid) > -1)
		// }
	},
	watch: {
		setsPagerModel(newValue) {
			this.datas = _.map(newValue.data, set => {
				this.proccessSeps(set.plays)
				return set
			})
		}
	},
	created() {
		this.$bus.emit('show.footer')
		// this.$dataTick(() => {
		//   this.sgeGuids = this.games.length ? [this.games[0].sge_guid] : []
		//   this.spyGuids = _.map(this.plays, 'spy_guid')
		// })
	}
}
</script>