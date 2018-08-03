<template>
  <section>
    <div class="container search">
      <div class="row">
        <ol class="breadcrumb">
          <li>
            <router-link :to="{ name: 'sport-mobile-event-list-sports' }">
              {{ $t(getSblCode(sbl_guid))}}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'sport-mobile-event-list-areas' }">
              {{ $t(getScyCodeBySblSra(sbl_guid, sra_guid))}}
            </router-link>
          </li>
          <li>
            <a href="#">-</a>
          </li>
        </ol>
      </div>
    </div>

    <main class="page-container">
      <div class="container">
        <div class="gamelist_t">{{ $t('league') }}</div>
        <ul class="gamelist">
          <li v-for="league in getCurrentLeagues(sbl_guid, sra_guid)" :key="league.sle_code" v-if="league.event_count[isLiveTxt]" @click="$router.push({ 
                name: 'sport-mobile-event-list',
                params: {
                  sbl_guid, sra_guid, sle_guid: league.sle_guid
                }
              })">
            <a>
              {{ $t(league.sle_code) }}
              <span>({{ league.event_count[isLiveTxt] }})</span>
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
	computed: {
		sbl_guid() {
			return this.$route.params.sbl_guid
		},
		sra_guid() {
			return this.$route.params.sra_guid
		}
	},
	created() {
		this.$bus.emit('show.footer')
	}
}
</script>