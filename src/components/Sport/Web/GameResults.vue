<template>
  <section>

    <div class="AD_box">
      <a><img src="/resource/static/sport/images/ad/ad.jpg" class="img-responsive"></a>
    </div>
    <!-- AD_box ed -->
    <div class="BO_box">
      <h1 class="sports-news">{{ $t('gameResults') }}</h1>
      <div class="member_s_box clearfix">
        <div class="row">
          <div class="col-md-6">
            <label class="col-md-4 s_title">{{ $t('time') }}</label>
            <div class="form-group col-md-14">
              <datetimepicker v-model="dateTime" class="col-md-18 date" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-md-4 s_title">{{ $t('sport') }}</label>
              <div class="form-group col-md-14">
                <select name="ors_to_attr_type" class="form-control" v-model="sport">
                  <option v-for="(data, index) in sports" :key="index" :value="data.sbl_guid">{{ $t(data.sbl_code) }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <input :disabled="!sport && !dateTime" type="button" :value="$t('search')" class="btn btn-pharaoh" @click="search()">
          </div>
        </div>

        <div class="member_content">
          <div class="selectbox2" v-if="total">
            <ul class="pull-right">
              <li>
                <select name="ors_to_attr_type" class="select-box" v-model="category" @change="onCategoryChange">
                  <option value="">{{ $t('all') }}</option>
                  <option v-for="(data, index) in categorysFilter" :key="index" :value="data.scy_guid">{{ $t(data.scy_code) }}</option>
                </select>
              </li>
              <li>
                <select name="ors_to_attr_type" class="select-box" v-model="league" @change="onLeagueChange">
                  <option value="" class="getCredit-js">{{ $t('all') }}</option>
                  <option class="getCredit-js" v-for="(data, index) in leagueMap" :key="index" :value="data.sle_guid">{{ $t(data.sle_code) }}</option>
                </select>
              </li>
            </ul>
          </div>
          <table class="table-fill" v-if="total">
            <thead>
              <tr>
                <th class="text-left" width="8%">{{ $t('category') }}</th>
                <th class="text-left" width="13%">{{ $t('leagueName') }}</th>
                <th class="text-left" width="15%">{{ $t('gameTime') }}</th>
                <th class="text-left" width="25%">{{ $t('masterSlaveTeam') }}</th>
                <th class="text-left" width="10%">{{ $t('game') }}</th>
                <th class="text-left" width="10%">{{ $t('gameResults') }}</th>
                <th class="text-left" width="19%">{{ $t('remark') }}</th>
              </tr>
            </thead>
            <tbody class="table-hover" v-for="(gSetDatas, index) in datas" :key="index">
              <!-- 賽事 -->
              <!-- 場次資料 -->
              <tr v-for="(data, key) in gSetDatas.plays" :key="key" :class="{ 
                  'table-open': !data.isTitle
                }" v-show="data.isShow" @click="data.isTitle ? toggleSeps(gSetDatas.plays) : ''">
                <!-- 球種 -->
                <td>{{ $t(data.sep_info.category.code) }}</td>
                <!-- 聯盟 -->
                <td>{{ $t(data.sep_info.league_group.code) + ' ' + $t(data.sep_info.league.code) }}</td>
                <!-- 時間 -->
                <td>
                  {{ $moment(data.sep_start_time).Format('Y-m-d') }} <br> {{ $moment(data.sep_start_time).Format('H:i') }}
                </td>
                <!-- 主客隊 -->
                <td>
                  <span class="rhome" v-for="team in data.sep_info.team" :key="team.stm_code">
                    <b v-if="team.stm_sort == '0'" class="c_orange">{{ $t('master') }}</b>
                    <b v-else>{{ $t('slave') }}</b>
                    {{ $t(team.stm_code) }}
                  </span>
                </td>
                <!-- 場次 -->
                <td>
                  {{ $t(data.sep_info.game.code) }}
                  <span v-if="data.isTitle" class="fa fa-caret-square-o-down"></span>
                </td>
                <!-- 輸贏結果 -->
                <td>
                  <span class="rhome" v-for="team in data.sep_info.team" :key="team.stm_code">
                    <b v-if="team.stm_sort == '0'" class="c_orange">{{ $t('master') }}</b>
                    <b v-else>{{ $t('slave') }}</b>
                    {{ data.sep_results.info[team.stm_code] }}
                  </span>
                </td>
                <!-- 備註 -->
                <td>{{ data.sep_cancel_note }}</td>
              </tr>
            </tbody>
          </table>
          <my-pager :lastPage="lastPage" :page="page" @change="pageChg" />
        </div>
      </div>
    </div>
    <!-- BO_box ed -->
  </section>
</template>

<script>
import GameResults from 'src/mixins/Sport/GameResults'

export default {
	name: 'game-results',
	mixins: [GameResults]
}
</script>

<style lang="stylus" scoped>
tbody
  border 1px solid #B1B1B1

  .table-open td
    background-color #fffae4
    padding 6px 10px
    border-right 1px solid #969696

  .table-open:nth-child(odd) td
    background-color #fffae4
    padding 6px 10px
    border-right 1px solid #969696

.s_title
  text-align right
</style>
