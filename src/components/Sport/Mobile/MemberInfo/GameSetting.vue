<template>
  <section>
    <div class="page_title">
      <a class="back" @click="$router.go(-1)"></a>
      <span>{{ $t('gameSetting') }}</span>
    </div>
    <main class="page-container memberinfo">
      <div class="container search">
        <div class="row">
          <div class="col-xs-6">
            <div class="form-group">
              <p class="bg-warning">{{ $t('singleBetMin') }} : {{ minBet }}</p>
            </div>
          </div>
          <div class="col-xs-6">
            <div class="form-group">
              <select name="ors_to_attr_type" class="form-control2" v-model="cSport">
                <option v-for="data in sports" :value="data">{{ $t(data.sbl_code) }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-6">
            <select name="ors_to_attr_type" class="form-control2" v-model="cLeagueScale">
              <option v-for="(val, name) in leagueScaleConf" :value="val">{{ $t(name) }}</option>
            </select>
          </div>
          <div class="col-xs-2 row-no-padding">
            <p>
              <a class="btn btn-pharaoh" @click="onGetGameSetting()" style="padding:4px 12px;">{{ $t('search') }}</a>
            </p>
          </div>
          <div class="col-xs-4">
            <p>
              <a class="btn btn-primary pull-right" data-toggle="modal" data-target="#LeagueModal" @click="onGetLeagueAndSendData()" style="padding:4px 12px;">{{ $t('search.league') }}</a>
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="member_s_box clearfix">
          <div class="member_content currency">

            <table class="table-fill">
              <thead>
                <tr>
                  <th class="text-left" width="15%">{{ $t('game') }}</th>
                  <th class="text-left" width="15%">{{ $t('play') }}</th>
                  <th class="text-left" width="20%">{{ $t('backWater') }}</th>
                  <th class="text-left" width="20%">{{ $t('singleBetMax') }}</th>
                  <th class="text-left" width="20%">{{ $t('singleTeamMax') }}</th>

                </tr>
              </thead>
              <tbody class="table-hover">
                <template v-for="(gSpyDatas, index) in datas">
                  <template v-for="data in gSpyDatas">
                    <tr v-if="['FHALF', 'SHALF', 'FHALF_LIVE', 'SHALF_LIVE'].indexOf(getSgeCodeById(data.p43_gmac_sge_id)) == -1" v-show="data.isShow" :class="{notTitle: !data.isTitle}" @click="toggleSetting(index)">
                      <td class="text-left">{{ $t(getSgeCodeById(data.p43_gmac_sge_id)) }}</td>
                      <td class="text-left">{{ $t(getSpyCodeById(data.p43_gmac_spy_id)) }}</td>
                      <td class="text-left">{{ data.p43_gmac_config_commission }}</td>
                      <td class="text-left">{{ data.p43_gmac_config_bet_max }}</td>
                      <td class="text-left">{{ data.p43_gmac_config_team_max }}</td>
                    </tr>
                    <tr v-else-if="['FHALF'].indexOf(getSgeCodeById(data.p43_gmac_sge_id)) > -1" v-show="data.isShow" :class="{notTitle: !data.isTitle}" @click="toggleSetting(index)">
                      <td class="text-left">{{ $t('HALF') }}</td>
                      <td class="text-left">{{ $t(getSpyCodeById(data.p43_gmac_spy_id)) }}</td>
                      <td class="text-left">{{ data.p43_gmac_config_commission }}</td>
                      <td class="text-left">{{ data.p43_gmac_config_bet_max }}</td>
                      <td class="text-left">{{ data.p43_gmac_config_team_max }}</td>
                    </tr>
                    <tr v-else-if="['FHALF_LIVE'].indexOf(getSgeCodeById(data.p43_gmac_sge_id)) > -1" v-show="data.isShow" :class="{notTitle: !data.isTitle}" @click="toggleSetting(index)">
                      <td class="text-left">{{ $t('HALF_LIVE') }}</td>
                      <td class="text-left">{{ $t(getSpyCodeById(data.p43_gmac_spy_id)) }}</td>
                      <td class="text-left">{{ data.p43_gmac_config_commission }}</td>
                      <td class="text-left">{{ data.p43_gmac_config_bet_max }}</td>
                      <td class="text-left">{{ data.p43_gmac_config_team_max }}</td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import GameSetting from 'src/mixins/Sport/GameSetting'
export default {
	mixins: [GameSetting],
	mounted() {
		this.$bus.emit('hide.footer')
		$('#ViewModal .modal-dialog').css({
			position: 'absolute',
			width: '90%'
		})
	}
}
</script>

<style lang="stylus" scoped>
.notTitle td
  background #252525
  color #FFFFFF

.notTitle:nth-child(odd) td
  background #252525 !important
  color #FFFFFF

.gamelist
  max-height 200px
  overflow-y auto

.modal-body
  padding-top 0
</style>