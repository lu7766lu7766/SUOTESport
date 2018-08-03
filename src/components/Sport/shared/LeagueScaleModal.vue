<template>
	<div class="modal fade" id="ViewModal" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="admodal-container">
				<div class="modal-header">
					<h4 class="modal-title">{{ $t(getLeagueScaleByValue(cLeagueScale)) }}</h4>
				</div>
				<div class="modal-body">
					<ul class="gamelist">
						<li v-for="league in mLeagues">
							{{ $t(league.sle_code) }}
						</li>
					</ul>
					<button type="button" class="close" data-dismiss="modal"></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import GameSetting from 'src/mixins/Sport/GameSetting'

export default {
	mixins: [GameSetting],
	mounted() {
		this.$bus.on('current.league.update', data => {
			this.cLeagueScale = data
		})
		this.$bus.on('league.scale.show', data => {
			this.mLeagues = data.mLeagues
			this.leaguePager = data.leaguePager
			$(this.$el).modal('show')
		})

		var $scroller = $('#ViewModal .gamelist')
		$scroller.off('scroll').on('scroll', () => {
			var realScrollTop = $scroller.scrollTop() + $scroller.height()
			if (realScrollTop == $scroller[0].scrollHeight) {
				this.$bus.emit('scroll.bottom')
			}
		})
		this.$bus.on('scroll.bottom', () => {
			this.onScrollBottom(
				async () => {
					var datas = _.cloneDeep(this.mLeagues)
					await this.onGetLeagueByScale()
					this.mLeagues = _.concat(datas, this.mLeagues)
				},
				this.leaguePager,
				$scroller
			)
		})
	},
	destroyed() {
		this.$bus.off('league.scale.show')
		this.$bus.off('current.league.update')
		$('#ViewModal .gamelist').off('scroll')
		this.$bus.off('scroll.bottom')
	}
}
</script>

<style lang="stylus" scoped>
#ViewModal
	z-index 1200

	& .gamelist
		overflow-x hidden
		overflow-y auto
</style>
