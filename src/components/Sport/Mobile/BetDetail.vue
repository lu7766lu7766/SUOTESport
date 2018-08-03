<template>
  <section>
    <div class="page_title">
      <a class="back" @click="$router.go(-1)"></a>
      <span>{{ $t('betDetail') }}</span>
    </div>
    <main class="page-container">
      <div class="Order_box">
        <div class="panel with-nav-tabs panel-Order">
          <div class="panel-heading">
            <ul class="nav nav-tabs">
              <li class="active" @click="onStatusChange('betDetail')">
                <a href="#tab4Order" data-toggle="tab" aria-expanded="true">{{ $t('betDetail') }}</a>
              </li>
              <li class="" @click="onStatusChange('historyAccount')">
                <a href="#tab5Order" data-toggle="tab" aria-expanded="false">{{ $t('historyAccount') }}</a>
              </li>
            </ul>
          </div>
          <div class="panel-body">
            <div class="tab-content">
              <!-- 投注明細 -->
              <div class="tab-pane fade active in" id="tab4Order">
                <div class="panel-group-news" id="accordion" v-if="groups.length">
                  <div class="panel panel-default" v-for="(group, index) in groups" :key="index">
                    <div class="panel-heading2 accordion-toggle collapsed" @click="getDetails(group)">
                      <h4 class="panel-title">&nbsp;
                        <span class="pull-right total3">{{ $t('totalBetMoney') }} : {{ group.betMoney | currency(2) }}</span>
                        <span class="pull-right" style="padding-right:20px">{{ $t('betCount') }} : {{ group.betTotal }}</span>
                      </h4>

                    </div>
                    <div class="panel-collapse collapse" :class="{ 'in': group.isShow }">
                      <div class="panel-body2">

                        <div class="new_order_list checkbox checkbox-warning" v-for="(detail, index2) in group.details" :key="index2">
                          <div class="bet_order2">
                            <div class="bet_order_t">{{ detail.number }}</div>
                            <div class="bet_order_d">{{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}</div>
                            <div class="bet_order_n">{{ $t(detail.type) }}</div>
                          </div>
                          <span class="">{{ $t('accountDate') }} : {{ $moment(detail.refer_date).Format('Y-m-d') }}</span>
                          <hr>
                          <section v-for="(target, index3) in detail.targets_info" :key="index3" style="padding:5px 0">
                            <span class="event">
                              {{ $t(target.category) }} - {{ $t(target.game) }} - {{ $t(target.play) }}
                            </span>
                            <span class="event" v-html="getBetListTitle({
                                  stmList: target.bet_info.vs,
                                  spy_code: target.play,
                                  handicapStmCode: target.bet_info.master,
                                  isSoccer: isSoccerByScyCode(target.category),
                                  fraction: target.bet_info.fraction,
                                  percent: target.bet_info.percent
                                })"></span>
                            <hr />
                            <span class="pick">{{ $t(target.bet_info.target) }}
                              <span class="odds">{{ target.bet_info.odds | currency(3) }}</span>
                            </span>
                            <hr />
                          </section>

                          <div class="Order_amount">
                            <span>{{ $t('betMoney') }}</span>
                            <span class="price">
                              {{ detail.cash | currency }}
                            </span>
                          </div>
                          <div class="Order_amount_win">
                            <span>{{ $t('winMoney') }}</span>
                            <span class="price green">
                              {{ getWinMoney(detail) | currency(2) }}
                            </span>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <!-- new_order_list ed -->

                <div class="container" v-else>

                  <div class="row">
                    <div class="col-xs-12" style="margin-top:10px">
                      <div class="norace">
                        查無資料
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 歷史帳務 -->
              <div class="tab-pane fade" id="tab5Order">
                <div class="datebar">
                  <div class="container">
                    <div class="row">
                      <div class="col-xs-6">
                        <div class="form-group">
                          <datetimepicker class="datepicker" :value="historyAccount.start_time" @change="onStartTimeChange" />
                        </div>
                      </div>
                      <div class="col-xs-6">
                        <div class="form-group">
                          <datetimepicker class="datepicker" :value="historyAccount.stop_time" @change="onStopTimeChange" />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12" style="padding-left: 15px">
                        <div class="form-group">
                          <div class="selectbox2">
                            <ul>
                              <li>
                                <a class="btn btn-date" data-toggle="button" @click="mySetTime('lastDay')">{{ $t('label.lastDay') }}</a>
                              </li>
                              <li>
                                <a class="btn btn-date" data-toggle="button" @click="mySetTime('afterDay')">{{ $t('label.afterDay') }}</a>
                              </li>
                              <li>
                                <a class="btn btn-date" data-toggle="button" @click="mySetTime('lastWeek')">{{ $t('label.lastWeek') }}</a>
                              </li>
                              <li>
                                <a class="btn btn-date" data-toggle="button" @click="mySetTime('thisWeek')">{{ $t('label.thisWeek') }}</a>
                              </li>
                              <li>
                                <a class="btn btn-date" data-toggle="button" @click="mySetTime('lastMonth')">{{ $t('label.lastMonth') }}</a>
                              </li>
                              <li>
                                <a class="btn btn-date" data-toggle="button" @click="mySetTime('thisMonth')">{{ $t('label.thisMonth') }}</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="panel-group-news" id="accordion" v-if="groups.length">
                  <div class="panel panel-default" v-for="(group, index) in groups" :key="index" v-show="!hasShow || group.isShow">
                    <button class="panel-heading2 accordion-toggle collapsed" @click="getDetails(group)">
                      <h4 class="panel-title">{{ group.date }}
                        <span class="pull-right total3">{{ $t('loseWinResultWithCommission') }} :
                          <t :class="{[group.winMoney < 0 ? 't-red' : 't-green']: true}">{{ group.winMoney | currency(2) }}</t>
                        </span>
                        <span class="pull-right total3">{{ $t('betMoney') }} : {{ group.betMoney | currency(2) }}</span>
                        <span class="pull-right total3">{{ $t('betCount') }} : {{ group.betTotal }}</span>
                      </h4>
                    </button>

                    <div class="panel-collapse collapse" :class="{ 'in': group.isShow }">
                      <div class="panel-body2">

                        <div class="new_order_list checkbox checkbox-warning" v-for="(detail, index2) in group.details" :key="index2">
                          <div class="bet_order">
                            <div class="bet_order_t">{{ detail.number }}</div>
                            <div class="bet_order_d">{{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}</div>
                            <div class="bet_order_n">{{ $t(detail.type) }}</div>
                          </div>
                          <div class="bet_order_con">
                            <section v-for="(target, index3) in detail.targets_info" :key="index3">
                              <i class="fa fa-arrow-circle-o-right fa-2x" aria-hidden="true"></i>
                              <span class="event">
                                {{ $t(target.category) }} - {{ $t(target.game) }} - {{ $t(target.play) }}
                              </span>
                              <span class="market"></span>
                              <span v-html="getBetListTitle({
                                  stmList: target.bet_info.vs,
                                  spy_code: target.play,
                                  handicapStmCode: target.bet_info.master,
                                  isSoccer: isSoccerByScyCode(target.category),
                                  fraction: target.bet_info.fraction,
                                  percent: target.bet_info.percent,
                                  vs_score: target.vs_score
                                })"></span>
                              <div class="Order_amount">
                                <span class="org">{{ $t(target.bet_info.target) }}</span>
                                <span class="price">
                                  {{ target.bet_info.odds | currency(3) }}
                                </span>
                              </div>
                            </section>
                            <hr>
                            <div class="Order_amount_win">
                              <span>{{ $t('betMoney') }} : {{ detail.cash | currency }}</span>
                              <span class="price">
                                {{ $t('loseWinResultWithCommission') }} :
                                <span :class="{[detail.result < 0 ? 't-red' : 't-green']: true}">
                                  {{ detail.result | currency(2) }}
                                </span>
                              </span>
                            </div>
                            <div class="Order_amount_win">
                              <span class="price">
                                {{ $t('backWater') }} :
                                <span class="green">{{ detail.commission }}</span>
                              </span>
                              <div class="clearfix"></div>
                            </div>
                          </div>
                        </div>
                        <!-- list end -->

                      </div>
                    </div>
                  </div>
                  <hr />
                  <!-- total -->
                  <div class="panel-heading2 accordion-toggle collapsed" v-if="groups.length">
                    <h4 class="panel-title">
                      <span style="visibility: hidden;">&nbsp;</span>
                      <span class="pull-right total3">{{ $t('totalLoseWinResultWithCommission') }} :
                        <t :class="{[total.winMoney < 0? 't-red' : 't-green']: true}">{{ total.winMoney | currency(2) }}</t>
                      </span>
                      <span class="pull-right total3">{{ $t('totalBetMoney') }} : {{ total.betMoney | currency(2) }}</span>
                      <span class="pull-right total3">{{ $t('totalBetCount') }} : {{ total.betTotal }}</span>
                    </h4>
                  </div>
                </div>

                <div class="container" v-else>
                  <div class="row">
                    <div class="col-xs-12">
                      <div class="norace">
                        查無資料
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import TimeSetting from 'src/mixins/Common/TimeSetting'
import BetDetail from 'src/mixins/Sport/BetDetail'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
	mixins: [BetDetail, TimeSetting, MobilePager],
	data: () => ({
		betDetail: {
			start_time: '',
			stop_time: '',
			status: ['received']
		},
		historyAccount: {
			start_time: '',
			stop_time: '',
			status: ['checked_out', 'recheckout', 'cancel']
		},
		cStatus: 'betDetail'
	}),
	methods: {
		myReqBody() {
			return {
				status: this.cData.status,
				start: this.cData.start_time.GetTime(),
				end: this.cData.stop_time.GetDayEndTime()
			}
		},
		async onStatusChange(status) {
			this.cStatus = status
			this.groups = []
			if (this.isBetDetail) {
				this.onGetBetDetailGroup(this.myReqBody())
			} else {
				this.onGetHisstoryAccountGroup(this.myReqBody())
			}
		},
		mySetTime(timeType) {
			this.setTime(timeType, this.historyAccount)
			if (!this.isBetDetail) {
				// mounted call
				this.onGetHisstoryAccountGroup(this.myReqBody())
			}
		},
		onStartTimeChange(newValue) {
			this.historyAccount.start_time = newValue
			this.onGetHisstoryAccountGroup(this.myReqBody())
		},
		onStopTimeChange(newValue) {
			this.historyAccount.stop_time = newValue
			this.onGetHisstoryAccountGroup(this.myReqBody())
		}
	},
	computed: {
		cData() {
			return this[this.cStatus]
		},
		isBetDetail() {
			return this.cStatus == 'betDetail'
		}
	},
	mounted() {
		this.mySetTime('thisWeek')

		this.onGetBetDetailGroup(this.myReqBody())
		this.$bus.emit('hide.footer')
		// var $containers = $(document) //$('#tab4Order, #tab5Order')
		// var $container
		// $containers.off('scroll').on('scroll', () => {
		// 	$container = $containers.filter('.in')
		// 	var realScrollTop = $container.scrollTop() + $container.height()
		// 	if (realScrollTop == $container[0].scrollHeight) {
		// 		this.$bus.emit('scroll.bottom')
		// 	}
		// })

		this.$bus.on('scroll.bottom', () => {
			this.onScrollBottom(async () => {
				var details = _.cloneDeep(this.cGroup.details)
				if (this.isBetDetail) {
					await this.onGetBetDetailList(this.cGroup)
				} else {
					await this.onGetHisstoryAccountList(this.cGroup)
				}
				this.cGroup.details = _.concat(details, this.cGroup.details)
			}, this.cGroup)
		})
	},
	destroyed() {
		this.$bus.off('scroll.bottom')
		// $('#tab4Order, #tab5Order').off('scroll')
	}
}
</script>
