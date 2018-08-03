<template>
  <footer id="ft-menu" class="ft-menu" v-if="isShow">
    <ul>
      <li class="ft-i1">
        <router-link :to="{ name: 'sport-mobile-index' }" active-class="active" exact>
          <i></i>{{ $t('index') }}
        </router-link>
      </li>
      <li class="ft-i2">
        <router-link :to="{ name: 'sport-mobile-event-live' }" active-class="active" exact>
          <i></i>{{ $t('live') }}
        </router-link>
      </li>
      <li class="ft-i3">
        <router-link :to="{ name: 'sport-mobile-bet-box' }" active-class="active" exact>
          <i></i>{{ $t('bet') }}
          <t>{{ singleBet.length }}</t>
        </router-link>
      </li>
      <li class="ft-i4">
        <router-link :to="{ name: 'sport-mobile-favorites' }" active-class="active" exact>
          <i></i>{{ $t('myFavorite') }}
        </router-link>
      </li>
      <li class="ft-i5">
        <router-link :to="{ name: 'sport-mobile-event-list-sports' }" active-class="active">
          <i></i>{{ $t('allEvent') }}
        </router-link>
      </li>
    </ul>

  </footer>
</template>

<script>
import Bet from 'src/mixins/Sport/Bet'
export default {
	mixins: [Bet],
	data: () => ({
		isShow: true
	}),
	created() {
		this.$bus.on('show.footer', () => {
			this.isShow = true
			this.$emit('update:isShowFooter', this.isShow)
		})
		this.$bus.on('hide.footer', () => {
			this.isShow = false
			this.$emit('update:isShowFooter', this.isShow)
		})
	},
	destroyed() {
		this.$bus.off('show.footer')
		this.$bus.off('hide.footer')
	}
}
</script>

<style lang="stylus">
#ft-menu
  position fixed
</style>
