<template>
  <div class="modal fade" id="menuModal" role="dialog">
    <div class="modal-dialog">
      <!-- sra choice-->
      <div class="admodal-container" v-if="cSblGuid && !cSraGuid">
        <div class="modal-header">
          <h4 class="modal-title">{{ $t(getSblCode(cSblGuid)) }}</h4>
        </div>
        <div class="modal-body">
          <ul class="gamelist">
            <li v-for="area in getCurrentAreas(cSblGuid)" :key="area.sra_guid" v-if="count[cSblGuid][area.sra_guid].count" @click="setSraGuid(area.sra_guid)">
              <a>
                <!-- {{ $t(area.sra_code) }} -->
                {{ $t(getScyCodeBySblSra(cSblGuid, area.sra_guid)) }}
                <span>({{ count[cSblGuid][area.sra_guid].count }})</span>
                <i class="fa fa-arrow-right fa-1x" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
        <button type="button" class="close" data-dismiss="modal"></button>
      </div>

      <!-- sle choice-->
      <div class="admodal-container" v-if="cSraGuid && !cSleGuid">
        <div class="modal-header">
          <h4 class="modal-title">{{ $t(getScyCodeBySblSra(cSblGuid, cSraGuid)) }}</h4>
        </div>
        <div class="modal-body">
          <ul class="gamelist">
            <li v-for="league in getCurrentLeagues(cSblGuid, cSraGuid)" :key="league.sle_guid" v-if="league.event_count[isLiveTxt]" @click="setSleGuid(league.sle_guid)">
              <a>{{ $t(league.sle_code) }}
                <span>({{ league.event_count[isLiveTxt] }})</span>
                <i class="fa fa-arrow-right fa-1x" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
        <button type="button" class="close" data-dismiss="modal"></button>
      </div>

    </div>
  </div>
</template>

<script>
import Menu from 'src/mixins/Sport/Menu'
export default {
	mixins: [Menu],
	data: () => ({
		cSblGuid: '',
		cSraGuid: '',
		cSleGuid: ''
	}),
	methods: {
		// jqInit() {
		// 	$(function() {
		// 		function reposition() {
		// 			var modal = $(this),
		// 				dialog = modal.find('.modal-dialog')
		// 			modal.css({
		// 				display: 'block'
		// 			})
		// 			dialog.css('margin-top', Math.max(0, ($(window).height() - dialog.height()) / 2))
		// 		}
		// 		$('#menuModal')
		// 			.addClass('vertical-container')
		// 			.on('show.bs.modal', reposition)
		// 		$(document).on('scroll', reposition)
		// 	})
		// },
		setSraGuid(guid) {
			this.cSraGuid = guid
		},
		setSleGuid(guid) {
			this.cSleGuid = guid
			this.$router.push({
				name: 'sport-mobile-event-list',
				params: {
					sbl_guid: this.cSblGuid,
					sra_guid: this.cSraGuid,
					sle_guid: this.cSleGuid
				}
			})
			$('#menuModal').modal('hide')
		}
	},
	mounted() {
		this.cSblGuid = ''
		this.cSraGuid = ''
		this.cSleGuid = ''
		$('#menuModal').on('hide.bs.modal', () => {
			this.cSraGuid = ''
			this.cSleGuid = ''
		})
		this.$bus.on('set.sblGuid', guid => {
			$('#menuModal').modal('show')
			this.cSblGuid = guid
		})
		// this.jqInit()
	},
	destroyed() {
		this.$bus.off('set.sblGuid')
		$('#menuModal').off('hide.bs.modal')
	}
}
</script>

<style lang="stylus" scoped>
.modal-dialog
  position absolute
  top 50% !important
  transform translate(0, -50%) !important
  -ms-transform translate(0, -50%) !important
  -webkit-transform translate(0, -50%) !important
  margin auto 5%
  width 90%
  height 50%

.modal-body
  position absolute
  top 45px
  bottom 45px
  left 0
  right 0
  margin 15px 0 10px 0
  overflow-y auto

.close
  position absolute
  bottom 0
  left 0
  right 0
  margin 2px auto
</style>
