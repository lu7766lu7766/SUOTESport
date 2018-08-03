<template>
	<section>
		<h1 class="sports-info-header_header">
			{{ $t('hotGames') }}
			<bet-faster />
		</h1>
		<div class="panel with-nav-tabs panel-BO">
		<div class="panel-heading">
			<ul class="nav nav-tabs">
				<li v-for="(sets, scy_guid) in hotGames" :key="scy_guid" :class="{ active: currentCategory == scy_guid }">
					<a data-toggle="tab" :href="'#tab'+scy_guid">{{ $t(getScyCode(scy_guid)) }}</a>
				</li>
			</ul>
		</div>
		<div class="panel-body">
			<div class="tab-content">
				<div class="tab-pane fade in" v-for="(sets, scy_guid) in hotGames" :key="scy_guid" :class="{ active: currentCategory == scy_guid }"  :id="'tab' + scy_guid">
					<div class="alliance-group">
						<game-list-sport :sets="sets" />
					</div>
				</div>
			</div>
		</div>
	</div>
	</section>
</template>

<script>
import SportIndex from 'src/mixins/Sport/SportIndex'
import { mapActions } from 'vuex'

export default {
	mixins: [SportIndex],
	components: {
		GameListSport: require('@/Sport/Web/shared/GameListSport'),
		BetFaster: require('@/Sport/Web/shared/BetFaster')
	},
	data: () => ({
		hotGames: {},
		currentCategory: ''
	}),
	methods: {
		...mapActions(['getHotGame'])
	},
	async mounted() {
		var res = await this.getHotGame()
		if (res.code === 0) {
			this.hotGames = _.groupBy(res.data, 'set_scy_guid')
			this.currentCategory = _.keys(this.hotGames)[0]
		}
	}
}
</script>