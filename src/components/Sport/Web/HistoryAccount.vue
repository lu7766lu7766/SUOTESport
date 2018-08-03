<template>
  <section>
    <div class="AD_box">
      <a><img src="/resource/static/sport/images/ad/ad.jpg" class="img-responsive"></a>
    </div>
    <!-- AD_box ed -->
    <div class="BO_box">
      <h1 class="sports-news">{{ $t('historyAccount') }}</h1>
      <div class="member_s_box clearfix">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label class="col-md-4 s_title">{{ $t('start') }}</label>
              <datetimepicker v-model="start_time" class="col-md-14 date" type="datepicker" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="col-md-4 s_title">~ {{ $t('stop') }}</label>
              <datetimepicker v-model="stop_time" class="col-md-14 date" type="datepicker" />
            </div>
          </div>
          <div class="col-md-8">
            <div class="selectbox2">
              <ul class="pull-left">
                <li>
                  <a class="pointer btn btn-date" data-toggle="button" @click="mySetTime('lastDay')">{{ $t('label.lastDay') }}</a>
                </li>
                <li>
                  <a class="pointer btn btn-date" data-toggle="button" @click="mySetTime('afterDay')">{{ $t('label.afterDay') }}</a>
                </li>
                <li>
                  <a class="pointer btn btn-date" data-toggle="button" @click="mySetTime('lastWeek')">{{ $t('label.lastWeek') }}</a>
                </li>
                <li>
                  <a class="pointer btn btn-date" data-toggle="button" @click="mySetTime('thisWeek')">{{ $t('label.thisWeek') }}</a>
                </li>
                <li>
                  <a class="pointer btn btn-date" data-toggle="button" @click="mySetTime('lastMonth')">{{ $t('label.lastMonth') }}</a>
                </li>
                <li>
                  <a class="pointer btn btn-date" data-toggle="button" @click="mySetTime('thisMonth')">{{ $t('label.thisMonth') }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-2" v-if="$store.state.Login.isLogin">
            <input type="button" :value="$t('search')" class="btn btn-pharaoh" @click="onGetHisstoryAccountGroup()">
          </div>
        </div>

        <!-- list -->
        <div class="member_content" v-if="groups.length">
          <div class="panel-group-news" id="accordion">
            <div class="panel panel-default" v-for="(group, index) in groups" :key="index" v-show="!hasShow || group.isShow">
              <div class="panel-heading2 accordion-toggle collapsed" @click="getDetails(group)">
                <h4 class="panel-title">{{ group.date }}
                  <span class="pull-right total3">{{ $t('loseWinResultWithCommission') }} :
                    <t :class="{[group.winMoney > -1? 't-green' : 't-red']: true}">{{ group.winMoney | currency(2) }}</t>
                  </span>
                  <span class="pull-right total2">{{ $t('betMoney') }} : {{ group.betMoney | currency(2) }}</span>
                  <span class="pull-right total1">{{ $t('betCount') }} : {{ group.betTotal }}</span>
                </h4>
              </div>

              <div class="panel-collapse collapse" :class="{ 'in': group.isShow }">
                <div class="panel-body2">
                  <table class="table-fill">
                    <thead>
                      <tr>
                        <th class="text-left" width="15%">{{ $t('betID') }}</th>
                        <th class="text-left" width="14%">{{ $t('accountDate') }}</th>
                        <th class="text-left" width="35%">{{ $t('betContent') }}</th>
                        <th class="text-left" width="12%">{{ $t('betMoney') }}</th>
                        <th class="text-left" width="10%">{{ $t('status') }}</th>
                        <th class="text-left" width="13%">{{ $t('loseWinResultWithCommission') }}</th>
                        <th class="text-left" width="10%">{{ $t('backWater') }}</th>
                      </tr>
                    </thead>
                    <tbody class="table-hover">
                      <tr v-for="(detail, index2) in group.details" :key="index2">
                        <td class="text-left">
                          {{ detail.number }}<br> {{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}
                        </td>
                        <td class="text-left">{{ group.date }}</td>
                        <td class="text-left">
                          <hr>
                          <t class="c_red2">{{ $t(detail.type) }}</t>
                          <hr>
                          <section v-for="(target, index3) in detail.targets_info" :key="index3">
                            {{ $t(target.category) }} - {{ $t(target.play) }} - {{ $t(target.game) }}
                            <br>
                            <span v-html="getBetListTitle({
                                stmList: target.bet_info.vs,
                                spy_code: target.play,
                                handicapStmCode: target.bet_info.master,
                                isSoccer: isSoccerByScyCode(target.category),
                                fraction: target.bet_info.fraction,
                                percent: target.bet_info.percent,
                                vs_score: target.vs_score
                              })">
                            </span>
                            <hr>
                            <span class="c_orange">{{ $t(target.bet_info.target) + ' ' }}{{ target.bet_info.odds | currency(3) }}</span>
                            <hr>
                          </section>
                        </td>
                        <td class="text-left">{{ detail.cash | currency }}</td>

                        <td class="text-left">{{ $t(detail.status) }}</td>
                        <td class="text-left" :class="{[detail.result > -1? 't-green' : 't-red']: true}">{{ detail.result | currency(2) }}</td>
                        <td class="text-left">{{ detail.commission }}</td>

                      </tr>
                    </tbody>
                  </table>
                  <my-pager :lastPage="group.lastPage" :page="group.page" @change="pageChg" style="background-color: black" />
                </div>
              </div>
            </div>
            <hr />
            <!-- total -->
            <div class="panel-heading2 accordion-toggle collapsed" v-if="groups.length">
              <h4 class="panel-title">
                <span style="visibility: hidden;">&nbsp;</span>
                <span class="pull-right total3">{{ $t('totalLoseWinResultWithCommission') }} :
                  <t :class="{[total.winMoney < 0 ? 't-red' : 't-green']: true}">{{ total.winMoney | currency(2) }}</t>
                </span>
                <span class="pull-right total2">{{ $t('totalBetMoney') }} : {{ total.betMoney | currency(2) }}</span>
                <span class="pull-right total1">{{ $t('totalBetCount') }} : {{ total.betTotal }}</span>
              </h4>
            </div>
          </div>
        </div>
        <!-- list end -->
        <div class="member_content" v-else>
          <div class="alliance-group">
            <div class="g_list-box">
              <div class="norace">
                {{ $t('noBetList') }}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- BO_box ed -->
  </section>
</template>

<script>
import TimeSetting from 'src/mixins/Common/TimeSetting'
import BetDetail from 'src/mixins/Sport/BetDetail'

export default {
	mixins: [BetDetail, TimeSetting],
	data() {
		return {
			start_time: '',
			stop_time: '',
			isBetDetail: false,
			status: ['checked_out', 'recheckout', 'cancel'] // , 'received'
		}
	},
	methods: {
		mySetTime(type) {
			this.setTime(type)
		}
	},
	created() {
		this.mySetTime('thisWeek')
		this.onGetHisstoryAccountGroup()
	}
}
</script>

<style scoped>
.s_title {
	text-align: right;
}
</style>
