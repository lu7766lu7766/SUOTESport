<template>
  <div class="pull-right fastbetting">
    {{ $t('label.betFaster') }}
    <div class="btn-group">
      <input id="bettinginput" type="search" class="form-control"  :placeholder="$t('label.plsInputMoney')" v-model.number="fastMoney">
      <span id="bettingclear" class="glyphicon glyphicon-remove-circle" @click="clearFastMoney()"></span>
    </div>
    <span class="switch" @click="betFasterChange()">
      <input type="checkbox" class="switch-input" :checked="isBetFaster">
      <span class="switch-label" data-on="On" data-off="Off"></span>
      <span class="switch-handle"></span>
    </span>
    <button ref="betFasterInstro" type="button" class="betting-info-bt" data-container="body" data-toggle="popover" data-placement="bottom" :data-content="$t('label.betFasterInstro')" data-html="true">?</button>
  </div>
</template>

<script>
import { BetType } from 'src/store/module/bet'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      betFasterChange: BetType.betFasterChange,
			setFastMoney: BetType.setFastMoney
    }),
    clearFastMoney() {
			this.setFastMoney('')
		}
  },
  computed: {
    ...mapState({
			isBetFaster: state => state.Bet.isFaster
    }),
    fastMoney: {
			get() {
				return this.$store.state.Bet.fastMoney
			},
			set(val) {
				this.setFastMoney(val)
			}
		}
  },
  mounted() {
    this.$nextTick(() => {
      $(this.$refs.betFasterInstro).popover()
    })
  }
}
</script>