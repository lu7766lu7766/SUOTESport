<template>
  <section>
    <div class="container search">
      <div class="row">
        <ol class="breadcrumb">
          <li>
            <a>{{ $t('event') }}</a>
          </li>
          <li>
            <a>-</a>
          </li>
        </ol>
      </div>
    </div>
    <main class="page-container">
      <div class="container">

        <div class="gamelist_t">{{ $t('sport') }}</div>

        <ul class="gamelist">
          <li tag="li" v-for="(sport, index) in orderByHasEvent(sports)" :key="index" v-if="sport && isShowSbl(sport.sbl_code)" :class="{
              disabled: count[sport.sbl_guid].count == 0
            }" @click="count[sport.sbl_guid].count ? $router.push({ 
                name: 'sport-mobile-event-list-areas', params: { sbl_guid: sport.sbl_guid } 
              }) : ''">
            <a>
              {{ $t(sport.sbl_code) }}
              <span>({{ count[sport.sbl_guid].count }})</span>
              <i class="fa fa-arrow-right fa-1x" aria-hidden="true"></i>
            </a>
          </li>
        </ul>

      </div>

    </main>

  </section>
</template>

<script>
import Menu from 'src/mixins/Sport/Menu'

export default {
	mixins: [Menu],
	methods: {
		checkEvents() {
			if (
				_.reduce(
					this.sports,
					(result, sport) => {
						return result && this.count[sport.sbl_guid].count == 0
					},
					true
				)
			) {
				this.$bus.emit('show.alert', { content: this.$t('noEvent') })
			}
		}
	},
	mounted() {
		this.$bus.emit('show.footer')
		if (!this.sports.length) {
			this.$watchAsObservable('sports').subscribe(x => {
				this.checkEvents()
			})
		} else {
			this.checkEvents()
		}
	}
}
</script>

<style lang="stylus" scoped>
.disabled > a
  color #bbb
</style>