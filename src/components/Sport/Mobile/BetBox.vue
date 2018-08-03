<template>
  <section>
    <div class="page_title">
      <a class="back" @click="$router.go(-1)"></a>
      <span>{{ $t('bet') }}</span>
    </div>
    <main class="page-container">

      <div class="Order_box">

        <div class="panel with-nav-tabs panel-Order">
          <div class="panel-heading">
            <ul class="nav nav-tabs">
              <li class="active">
                <a href="#tab2Order" data-toggle="tab" aria-expanded="true">{{ $t('singleMode') }}</a>
              </li>
              <li class="">
                <a href="#tab1Order" data-toggle="tab" aria-expanded="false">{{ $t('passLevel') }}</a>
              </li>
              <li class="">
                <a href="#tab3Order" data-toggle="tab" aria-expanded="false" @click="onGetBetList()">{{ $t('betList') }}</a>
              </li>

            </ul>
          </div>
          <!-- 單式 -->
          <div class="panel-body">
            <div class="tab-content">
              <div class="tab-pane fade active in" id="tab2Order">
                <div class="clear_order">
                  <a class="btn btn-clear" href="#" role="button" @click="clearBetList()">
                    {{ $t('label.clearBetList') }}
                  </a>
                </div>
                <div class="norace" v-if="!singleBet.length">
                  {{ $t('noBetList') }}
                </div>
                <section v-if="singleBet.length">
                  <div class="order_box_group-20">
                    <div class="new_order_list checkbox checkbox-warning" v-for="(bet, $index) in singleBet" :key="$index">
                      <input :id="'singleBet' + $index" type="checkbox" v-model="bet.isChecked" @click="singleResetChecked($index)">

                      <label :for="'singleBet' + $index">
                        <span class="order_delete">
                          <a @click="onBetChange(bet, $event)">
                            <i class="fa fa-times" aria-hidden="true"></i>
                          </a>
                        </span>
                        <span class="market">
                          <b>
                            {{ $t(getScyCode(bet.spo_scy_guid)) }} - {{ $t(getSgeCode(bet.spo_sge_guid)) }} - {{ $t(getSpyCode(bet.spo_spy_guid)) }}
                          </b>
                        </span>
                        <span class="event" v-html="getBetListTitle({
                          stmList: getStmListByStms(bet.teams), 
                          handicapStmCode: bet.handicapStmCode || '',
                          isSoccer: isSoccerByScyCode(getScyCode(bet.sep_scy_guid)),
                          spy_code: getSpyCode(bet.spo_spy_guid), 
                          fraction: bet.currentHandicap.fraction,
                          percent: bet.currentHandicap.percent
                        })"></span>

                        <span class="pick">{{ $t(getDisplayCode(bet)) }}
                          <span class="odds">{{ bet.spo_odds }}</span>
                        </span>
                      </label>

                      <div class="Order_amount">
                        <span>{{ $t('betMoney') }}</span>
                        <span class="price">
                          <my-numeric class="form-control" v-model.number="bet.cash"></my-numeric>
                        </span>
                        <span class="token">
                          <a class="tokenbt" style="cursor:pointer" v-for="(data, index) in storeTrans2Data()" :key="index" :title="data.name" @click="bet.cash = (bet.cash==''? 0: bet.cash) + data.value">
                            <img :src="currencyTemp.find(temp => data.value == temp.value).src" />
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- new_order_list ed -->
                  <div class="order_fixed">
                    <div class="Win_amount">
                      <span>{{ $t('winMoney') }}</span>
                      <span class="price ">
                        <my-numeric class="form-control" :value="singleWinMoney" :event="true" @change="chgSingleWinMoney"></my-numeric>
                      </span>
                    </div>
                    <div class="amount_info">
                      <span>{{ $t('singleBetMin') }}
                        <b>{{ minBet | currency }}</b>
                      </span>
                      <span>{{ $t('singleBetMax') }}
                        <b>{{ singleMaxBet | currency }}</b>
                      </span>
                      <span>{{ $t('singleTeamMax') }}
                        <b>{{ singleMaxTeam | currency }}</b>
                      </span>
                      <span>{{ $t('sgeBetMax') }}
                        <b v-if="currentSingleBet">{{ currentSingleBet.sep_single_bet_limit | currency }}</b>
                        <b v-else>0</b>
                      </span>
                    </div>
                    <div class="order_bt">
                      <a class="btn btn-betting2" role="button" v-show="isLogin" @click="singleBetting">
                        {{ $t('bet') }}
                      </a>
                    </div>
                  </div>
                </section>

              </div>
              <!-- 1 -->
              <!-- 過關 -->
              <div class="tab-pane fade" id="tab1Order">
                <div class="norace" v-if="!multiBet.length">
                  {{ $t('noBetList') }}
                </div>
                <section v-if="multiBet.length">
                  <div class="order_box_group-10">
                    <div class="clear_order">
                      <a class="btn btn-clear" href="#" role="button" @click="clearBetList()">
                        {{ $t('label.clearBetList') }}
                      </a>
                    </div>
                    <div class="new_order_list checkbox checkbox-warning" v-for="(bet,$index) in multiBet" :key="$index">
                      <input :id="'multiBet' + $index" type="checkbox" v-model="bet.isChecked" @click="filterSameSet($index)">

                      <label :for="'multiBet' + $index">
                        <span class="order_delete">
                          <a @click="onBetChange(bet, $event)">
                            <i class="fa fa-times" aria-hidden="true"></i>
                          </a>
                        </span>
                        <span class="market">
                          <b>
                            {{ $t(getScyCode(bet.spo_scy_guid)) }} - {{ $t(getSgeCode(bet.spo_sge_guid)) }} - {{$t(getSpyCode(bet.spo_spy_guid))}}
                          </b>
                        </span>
                        <span class="event" v-html="getBetListTitle({
                            stmList: getStmListByStms(bet.teams), 
                            handicapStmCode: bet.handicapStmCode || '',
                            isSoccer: isSoccerByScyCode(getScyCode(bet.sep_scy_guid)),
                            spy_code: getSpyCode(bet.spo_spy_guid), 
                            fraction: bet.currentHandicap.fraction,
                            percent: bet.currentHandicap.percent
                          })"></span>

                        <span class="pick">{{$t(getDisplayCode(bet))}}
                          <span class="odds">{{(parseFloat(bet.spo_odds) + parseFloat(bet.complex_odds_diff)).toFixed(3)}}</span>
                        </span>
                      </label>
                    </div>
                    <!-- new_order_list ed -->
                  </div>

                  <div class="order_fixed">
                    <div class="Order_amount">
                      <span>{{ $t('betMoney') }}</span>
                      <span class="price">
                        <my-numeric class="form-control" v-model.number="multiBetCash"></my-numeric>
                      </span>
                      <div class="token">
                        <a class="tokenbt" style="cursor:pointer" v-for="(data, index) in storeTrans2Data()" :key="index" :title="data.name" @click="multiBetCash = (multiBetCash==''? 0: multiBetCash) + data.value">
                          <img :src="currencyTemp.find(temp => data.value == temp.value).src" />
                        </a>
                      </div>
                    </div>
                    <div class="Win_amount">
                      <span>{{ $t('winMoney') }}</span>
                      <span class="price ">
                        <my-numeric class="form-control" :value="multiWinMoney" :event="true" @change="chgMultiWinMoney"></my-numeric>
                      </span>
                    </div>
                    <div class="amount_info">
                      <span>{{ $t('singleBetMin') }}
                        <b>{{ minBet | currency }}</b>
                      </span>
                      <span>{{ $t('singleBetMax') }}
                        <b>{{ multiMaxBet | currency }}</b>
                      </span>
                      <span>{{ $t('singleTeamMax') }}
                        <b>{{ multiMaxTeam | currency }}</b>
                      </span>
                      <span>{{ $t('label.levelCount') }}
                        <b>{{ multiParlayMax }}</b>
                      </span>
                      <span style="width:98%">{{ $t('label.winMax') }}
                        <b>{{ multiWinMax }}</b>
                      </span>
                    </div>
                    <div class="order_bt">
                      <a class="btn btn-betting2" role="button" v-if="isLogin" @click="multiBetBetting">
                        {{ $t('bet') }}
                      </a>
                    </div>
                  </div>
                </section>
              </div>
              <!-- 2 -->
              <!-- 投注列表 -->
              <div class="tab-pane fade" id="tab3Order">
                <div class="norace" v-if="!betList.length && !isRequest">
                  {{ $t('noBetList') }}
                </div>
                <div class="new_order_list checkbox checkbox-warning" v-for="(bet, $index) in betList" :key="$index">
                  <div class="bet_order2">
                    <div class="bet_order_t">{{ bet.number }}</div>
                    <div class="bet_order_d">{{ $moment(bet.bet_time).Format('Y-m-d') }}</div>
                    <div class="bet_order_n">{{ $t(bet.type)}}</div>
                  </div>
                  <section v-for="(target, $key) in bet.targets_info" :key="$key">
                    <span class="market">
                      <b>
                        {{ $t(target.category) }} - {{ $t(target.game) }} - {{ $t(target.play) }}
                      </b>
                    </span>
                    <span class="event" v-html="getBetListTitle({
                        stmList: target.bet_info.vs, 
                        handicapStmCode: target.bet_info.master || '',
                        isSoccer: isSoccerByScyCode(target.category),
                        spy_code: target.play, 
                        fraction: target.bet_info.fraction,
                        percent: target.bet_info.percent
                      })">
                    </span>
                    <span class="pick">{{ $t(target.bet_info.target) }}
                      <span class="odds">{{ target.bet_info.odds | currency(3) }}</span>
                    </span>
                  </section>

                  <div class="Order_amount">
                    <span>{{ $t('betMoney') }}</span>
                    <span class="price">
                      {{ bet.cash | currency }}
                    </span>
                  </div>
                  <div class="Order_amount_win">
                    <span>{{ $t('loseWinResult') }}</span>
                    <span class="price">
                      {{ bet.bonus | currency(2) }}
                    </span>
                  </div>

                </div>
                <!-- new_order_list ed -->

              </div>
              <!-- 3 -->
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import Bet from 'src/mixins/Sport/Bet'
import CustomCurrency from 'src/mixins/Sport/CustomCurrency'

export default {
	mixins: [Bet, CustomCurrency],
	mounted() {
		this.$bus.emit('hide.footer')
	}
}
</script>

<style lang="stylus">
</style>
