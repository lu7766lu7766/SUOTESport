<template>
  <main class="page-container game">
    <div class="container" v-if="!datas.length">
      <div class="row">
        <div class="col-xs-12">
          <div class="norace">
            {{ $t('noEvent') }}
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="alliance-group" :class="{ 
          'graydisabled': !Object.keys(set.plays) 
        }" v-for="set in sets" :key="set.set_guid">
        <section>
          <h2 class="accordion-toggle panel-heading3 collapsed" :class="{ 
            'graydisabled': !set.set_sep_count 
            }" :data-toggle="set.set_sep_count ? 'collapse': ''" @click="isFavorites && set.set_sep_count? 
                  $router.push({ name: 'sport-mobile-event-more', params: { set_guid: set.set_guid } }): 
                  mCollapse('event' + set.set_guid)">
            <section>
              <!-- v-if="isShowTeamName(getSpyCode(set.sep_spy_guid))" -->
              <span v-for="(team, index) in getCTeamOrder(set)" :key="index">
                <span v-if="index > 0"> vs </span>
                {{ $t(team.stm_code) }}
                <t v-if="team.stm_sort == 0">({{ $t('master') }})</t>
              </span>
            </section>

            <!-- <section v-else>
                <i class="diamond"></i>{{ getFightStmsName(set.sep_info.team, ' vs ') }}({{ $t('master') }})<br>
              </section> -->

            <t>{{ $moment(set.set_start_time).Format('Y-m-d H:i') }}</t>
            <small v-if="set.set_detail_content && set.set_detail_content.isMulti">G2</small>
            <a class="fav" :class="{ acitve: isSetFavorite(set.set_guid) && isLogin }" @click.stop="onSetFavoriteChange(set.set_guid)">
              <i class="fa" :class="isFavorites ? 'fa-times' : 'fa-star'" aria-hidden="true"></i>
            </a>

            <router-link :to="{ name: 'sport-mobile-event-more', params: { set_guid: set.set_guid } }" v-if="set.set_sep_count" class="btn btn-moregame">
              +({{ set.set_sep_count || 'more'}})
            </router-link>
          </h2>

          <div :ref="'event' + set.set_guid" class="g_list-box collapse" :class="{
              'in': hasOpenedSetList.indexOf('event' + set.set_guid) > -1
            }" v-if="!isFavorites">
            <div class="row g_list" v-if="hasPitcher(set)">
              <div class="col-xs-6 row-no-padding" v-for="(team, index) in getCTeamOrder(set)" :key="index">
                <div class="hitter">
                  <span v-if="team.stm_sort == 1">{{ set.set_detail_content.pitcher.away }}</span>
                  <span v-else-if="team.stm_sort == 0">{{ set.set_detail_content.pitcher.home }}</span>
                </div>
              </div>
            </div>

            <section v-for="spy_code in getCorrectOrderList('playCodeList', showSpyCode)" :key="spy_code">
              <section v-for="sep in [set.plays[spy_code]]" v-if="sep" :key="sep.sep_guid">
                <div class="BO_info">{{ $t(spy_code) }}</div>
                <div class="row g_list">

                  <div class="row-no-padding" :class="{
                      [getSpoClass(sep.odds.length, index)]: true
                    }" v-for="(odd, index) in sep.odds" :key="index">
                    <a class="btn btn-betting" :class="{ check: spoGuids.indexOf(odd.spo_guid)>-1 }" role="button" @click="onBetChange(odd)">
                      <span className="option-name">
                        <span v-if="isShowHandicap(getSpyCode(sep.sep_spy_guid))">
                          <span v-if="odd.spo_has_handicap" class="c-handicap">{{ getHandicap(odd) }}</span>
                          <span v-else></span>
                        </span>
                        {{ $t(getDisplayCode(odd)) }}
                      </span>
                      <span class="option-odds">
                        {{ odd.spo_odds }}
                      </span>
                    </a>
                  </div>
                </div>
              </section>
            </section>

          </div>
          <!-- g_list-box ed -->
        </section>
      </div>

    </div>
  </main>
</template>

<script>
import GameList from 'src/mixins/Sport/GameListSport-mobile'

export default {
	mixins: [GameList],
	methods: {
		getSpoClass(len, index) {
			if (len % 2 == 1 && index == len - 1) {
				return 'col-xs-12' // full size
			} else {
				return 'col-xs-6' // half size
			}
		}
	},
	computed: {
		isFavorites() {
			return this.$route.name == 'sport-mobile-favorites'
		}
	}
}
</script>

<style lang="stylus" scoped>
.container .alliance-group h2
  padding-right 40px
</style>
