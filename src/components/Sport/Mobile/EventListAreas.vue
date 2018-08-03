<template>
  <section>
    <div class="container search">
      <div class="row">
        <ol class="breadcrumb">
          <li>
            <router-link :to="{ name: 'sport-mobile-event-list-sports' }">{{ $t(getSblCode(sbl_guid))}}</router-link>
          </li>
          <li>
            <a href="#">-</a>
          </li>
        </ol>
      </div>
    </div>

    <main class="page-container">
      <div class="container">
        <div class="gamelist_t">{{ $t('area') }}</div>
        <ul class="gamelist">
          <li v-for="area in getCurrentAreas(sbl_guid)" v-if="count[sbl_guid][area.sra_guid].count" @click="$router.push({ 
                name: 'sport-mobile-event-list-leagues',
                params: {
                  sbl_guid, sra_guid: area.sra_guid
                }
              })">
            <a>
              <!-- {{ $t(area.sra_code) }} -->
              {{ $t(getScyCodeBySblSra(sbl_guid, area.sra_guid)) }}
              <span>({{ count[sbl_guid][area.sra_guid].count }})</span>
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
		}
	},
	created() {
		this.$bus.emit('show.footer')
	}
}
</script>