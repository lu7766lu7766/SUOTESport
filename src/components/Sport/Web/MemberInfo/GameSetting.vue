<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <p class="bg-warning">{{ $t('singleBetMin') }} : {{ minBet }}</p>
      </div>

      <div class="col-md-4">
        <label class="col-md-5 s_title">{{ $t('sport') }}</label>
        <div class="form-group col-md-13">
          <select name="ors_to_attr_type" class="form-control" v-model="cSport">
            <option v-for="data in sports" :key="data.sbl_code" :value="data">{{ $t(data.sbl_code) }}</option>
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <label class="col-md-4 s_title">聯賽</label>
        <div class="form-group col-md-14">
          <select name="ors_to_attr_type" class="form-control" v-model="cLeagueScale">
            <option v-for="(val, name) in leagueScaleConf" :key="name" :value="val">{{ $t(name) }}</option>
          </select>
        </div>
      </div>
      <div class="col-sm-2">
        <input type="button" :value="$t('search')" class="btn btn-pharaoh" v-if="$store.state.Login.isLogin" @click="onGetGameSetting()">
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary" @click="onGetLeagueAndSendData()">{{ $t('search.league') }}</button>
      </div>

    </div>
    <table class="table-fill" v-if="datas.length">
      <thead>
        <tr>
          <th class="text-left" width="20%">{{ $t('game') }}</th>
          <th class="text-left" width="20%">{{ $t('play') }}</th>
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
</template>

<script>
import GameSetting from 'src/mixins/Sport/GameSetting'

export default {
	mixins: [GameSetting]
}
</script>

<style lang="stylus" scoped>
.notTitle td
  background #252525
  color #FFFFFF

.notTitle:nth-child(odd) td
  background #252525 !important
  color #FFFFFF
</style>
