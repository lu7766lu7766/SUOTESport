<template>
	<div class="carousel-inner newsnn">
		<div class="row" v-if="sles || sras">
			<div class="col-xs-6" v-if="sles">
				<select ref="areaPicker" data-style="form-control2" @change="onAreaPickerChange($event.target.value)" style="display:none">
					<option v-for="sra in sras" :key="sra.sra_guid" :value='[ sra.sra_guid ]'>
						{{ $t(getScyCodeBySblSra(sblGuid, sra.sra_guid)) }}{{ sra.set_count? (`(${sra.set_count})`) : '' }}
					</option>
				</select>
			</div>
			<div class="col-xs-6" v-if="sras">
				<select ref="leaguePicker" data-style="form-control2" @change="onLeaguePickerChange($event.target.value)" style="display:none">
					<option v-for="sle in sles" :key="sle.sle_guid" :value='[ sle.sle_guid ]'>
						{{ $t(sle.sle_code) }}{{ sle.set_count? (`(${sle.set_count})`) : '' }}
					</option>
				</select>
			</div>
			<hr>
		</div>
		<div class="item row active" style="height: auto" v-if="sges || spys">
			<div class="col-xs-6" v-if="sges">
				<select ref="gamePicker" data-style="form-control2" @change="onGamePickerChange($event.target.value)" style="display:none">
					<option v-for="sge in sges" :key="sge.sge_guid" :value='[ sge.sge_guid ]'>
						{{ $t(sge.sge_code) }}
					</option>
				</select>
			</div>
			<div class="col-xs-6" v-if="spys">
				<select ref="playPicker" data-style="form-control2" @change="onPlayPickerChange($event.target.value)" style="display:none" multiple>
					<option value="all" selected>{{ $t('all') }}</option>
					<option v-for="spy in spys" :key="spy.spy_guid" :value='[ spy.spy_guid ]'>
						{{ $t(spy.spy_code) }}
					</option>
				</select>
			</div>
		</div>
		<!-- End Item -->
	</div>
</template>

<script>
import SportIndex from 'src/mixins/Sport/SportIndex'
export default {
	mixins: [SportIndex],
	props: ['sras', 'sraGuids', 'sles', 'sleGuids', 'sges', 'sgeGuids', 'spys', 'spyGuids', 'sblGuid'],
	methods: {
		onAreaPickerChange(value) {
			this.$emit('update:sraGuids', [$(this.$refs.areaPicker).val()])
			this.$emit('change:sra')
		},
		onLeaguePickerChange(value) {
			this.$emit('update:sleGuids', [$(this.$refs.leaguePicker).val()])
			this.$emit('change')
		},
		onGamePickerChange(value) {
			this.$emit('update:sgeGuids', [$(this.$refs.gamePicker).val()])
			this.$emit('change')
		},
		onPlayPickerChange(value) {
			if (value.indexOf('all') > -1) {
				$(this.$refs.playPicker).selectpicker('val', this.allSpyGuidList)
			}
			this.$emit('update:spyGuids', $(this.$refs.playPicker).val())
			this.$emit('change')
		}
	},
	watch: {
		sraGuids() {
			this.$nextTick(() => {
				$(this.$refs.areaPicker).selectpicker('refresh')
				$(this.$refs.areaPicker).selectpicker('val', this.sraGuids[0])
			})
		},
		sleGuids() {
			this.$nextTick(() => {
				$(this.$refs.leaguePicker).selectpicker('refresh')
				$(this.$refs.leaguePicker).selectpicker('val', this.sleGuids[0])
			})
		},
		sgeGuids() {
			this.$nextTick(() => {
				$(this.$refs.gamePicker).selectpicker('refresh')
				$(this.$refs.gamePicker).selectpicker('val', this.sgeGuids[0])
			})
		},
		spyGuids() {
			this.$nextTick(() => {
				$(this.$refs.playPicker).selectpicker('refresh')
				$(this.$refs.playPicker).selectpicker('val', this.spyGuids)
			})
		}
	},
	computed: {
		allSpyGuidList() {
			return _.map(this.spys, 'spy_guid')
		}
	},
	created() {
		require('~/bootstrap/dist/js/bootstrap.min.js')
		require('bootstrap-select')
	},
	mounted() {
		this.$dataTick(() => {
			this.$nextTick(() => {
				if (this.sras) {
					$(this.$refs.areaPicker).selectpicker()
					$(this.$refs.areaPicker).selectpicker('val', this.sraGuid)
				}
				if (this.sles) {
					$(this.$refs.leaguePicker).selectpicker()
					$(this.$refs.leaguePicker).selectpicker('val', this.sleGuids[0])
				}
				if (this.sges) {
					$(this.$refs.gamePicker).selectpicker()
					$(this.$refs.gamePicker).selectpicker('val', this.sgeGuids[0])
				}
				if (this.spys) {
					$(this.$refs.playPicker).selectpicker()
					$(this.$refs.playPicker).selectpicker('val', this.spyGuids)
				}
			})
		})
	}
}
</script>