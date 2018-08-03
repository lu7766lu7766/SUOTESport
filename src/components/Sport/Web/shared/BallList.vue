<template>

  <nav role="navigation" style="z-index:1100">
    <div class="navbar-default sidebar" role="navigation">
      <!--<button @click="showLog">showlog</button>-->
      <div class="sidebar-nav navbar-collapse" id="sidebar-area">
        <div class="menu-toggler sidebar-toggler">
          <span class="sr-only">{{ $t('collapseMenu') }}</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </div>
        <ul class="nav" id="sidebar">
          <li v-for="sport in orderByHasEvent(sports)" :key="sport.sbl_guid" v-if="sport && isShowSbl(sport.sbl_code)" :class="{ 
              active: sport.sbl_guid == currentSblGuid, 
              disabled: !count[sport.sbl_guid].count 
            }">
            <a class="dropdown-collapse pointer" @click="onSblChange(sport.sbl_guid)">
              <i class="sporticon " :style="getSportIcon(sport.sbl_code)">&nbsp;</i>
              <span class="side-menu-title">
                {{ $t(sport.sbl_code) }}
                <span v-if="typeof count[sport.sbl_guid].count == 'number'">
                  ({{ count[sport.sbl_guid].count }})
                </span>
              </span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level" v-show="currentSblGuid == sport.sbl_guid">
              <li v-for="area in getCurrentAreas(sport.sbl_guid)" :key="area.sra_guid" v-if="count[sport.sbl_guid][area.sra_guid].count" :class="{ 
                  active: currentSraGuids.indexOf(area.sra_guid) > -1
                }">
                <a class="dropdown-collapse sra-btn pointer" @click="onSraChange(sport.sbl_guid, area.sra_guid)">
                  <!-- {{ $t(area.sra_code) }} -->
                  {{ $t(getScyCodeBySblSra(sport.sbl_guid, area.sra_guid)) }}
                  <span v-if="typeof count[sport.sbl_guid][area.sra_guid].count == 'number'">
                    ({{ count[sport.sbl_guid][area.sra_guid].count }})
                  </span>
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level" v-show="currentSraGuids.indexOf(area.sra_guid) > -1">
                  <li v-for="league in getCurrentLeagues(sport.sbl_guid, area.sra_guid)" :key="league.sle_guid" v-if="league.event_count[isLiveTxt]" :class="{ 
                      active: sleGuids.indexOf(league.sle_guid) > -1 
                    }">
                    <a style="cursor:pointer" @click="onSleChange(sport.sbl_guid, area.sra_guid, league.sle_guid, league.event_count[isLiveTxt])">
                      <i class="fa fa-angle-right fa-1" aria-hidden="true"></i>
                      {{ $t(league.sle_code) }}
                      <span v-if="typeof league.event_count[isLiveTxt] == 'number'">
                        ({{ league.event_count[isLiveTxt] }})
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
import Menu from 'src/mixins/Sport/Menu'
import { MenuType } from 'src/store/module/menu'

export default {
	mixins: [Menu],
	methods: {
		onSblChange(sbl_guid) {
			if (this.currentSblGuid == sbl_guid) {
				sbl_guid = ''
			}
			this.$store.commit({
				type: MenuType.ChgSblGuid,
				sbl_guid
			})
		},
		onSraChange(sbl_guid, sra_guid) {
			this.$store.commit({
				type: MenuType.ChgSraGuids,
				sbl_guid,
				sra_guid
			})
		},
		onSleChange(sbl_guid, sra_guid, sle_guid, count) {
			if (count && count > 0) {
				this.$store.commit({
					type: MenuType.ChgSleGuids,
					sbl_guid,
					sra_guid,
					sle_guid
				})
				this.$router.push({ name: 'sport-sports' })
			}
		}
	},
	mounted() {
		this.$dataTick(() => {
			$.getScript('/static/script/sport.js')
		})
	}
}
</script>

<style lang="stylus" scoped>
.disabled
  filter grayscale(1)
</style>
