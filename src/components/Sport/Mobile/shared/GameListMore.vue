<template>
  <main class="page-container gamemore">

    <div class="container">

      <div class="row">
        <div class="col-xs-12">
          <div id="custom_carousel" class="carousel slide">
            <div class="controls">
              <div class="row">
                <div class="col-xs-10">
                  <ul class="nav">
                    <li v-for="sge in sges" :key="sge.sge_guid" :class="{active: sge.sge_guid == cSgeGuid }" @click="$emit('update:cSgeGuid', sge.sge_guid)">
                      <a>{{ $t(sge.sge_code) }}</a>
                    </li>
                  </ul>
                </div>
                <div class="col-xs-2">
                  <i v-if="isEventLoading" style="color:white; font-size:20px;" class='vertical-container fa fa-circle-o-notch fa-spin'></i>
                  <span v-else @click="$emit('refresh')" style="color:white; font-size:20px;" class='vertical-container glyphicon glyphicon-refresh'></span>
                </div>
              </div>
            </div>
            <!-- Wrapper for slides -->
            <div class="carousel-inner newsnn" v-for="set in sets" :key="set.set_guid">
              <section>
                <div class="item active" style="height: auto">
                  <div class="alliance-group">
                    <section v-for="spy_code in getCorrectOrderList('playCodeList', showSpyCode)" :key="spy_code">
                      <section v-for="sep in [set.plays[spy_code]]" v-if="sep" :key="sep.sep_guid">
                        <div class="g_list-box">
                          <button class="BO_info2 collapsed" @click="collapse(spy_code)" data-toggle="collapse" data-parent="#accordion">
                            {{ $t(spy_code) }}
                          </button>
                          <div :ref="spy_code" class="container collapse in">
                            <div class="row g_list">
                              <div class="col-xs-6 row-no-padding" v-for="odd in sep.odds" :key="odd.spo_guid">
                                <a class="btn btn-betting" :class="{ check: spoGuids.indexOf(odd.spo_guid)>-1 }" role="button" @click="onBetChange(odd)">
                                  <span className="option-name">
                                    <span v-if="isShowHandicap(getSpyCode(sep.sep_spy_guid))">
                                      <span v-if="odd.spo_has_handicap" class="c-handicap">{{ getHandicap(odd) }}</span>
                                      <span v-else></span>
                                    </span>
                                    {{ $t(getDisplayCode(odd)) }}</span>
                                  <span class="option-odds">
                                    {{ odd.spo_odds }}
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </section>
                  </div>
                </div>
              </section>

              <!-- End Item -->
            </div>
            <!-- End Carousel Inner -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import GameList from 'src/mixins/Sport/GameListSport-mobile'

export default {
	mixins: [GameList],
	props: {
		cSgeGuid: {
			type: String,
			require: true
		},
		sges: {
			type: Array,
			require: true
		},
		isEventLoading: {
			type: Boolean,
			default: false
		}
	}
}
</script>
