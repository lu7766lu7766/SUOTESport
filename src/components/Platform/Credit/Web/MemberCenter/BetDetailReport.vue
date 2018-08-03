<template>
  <section>
    <div class="banner-member-02">
      <div class="row">
        <div class="title">
          <h1>投注明細</h1>
          <span>Member</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <div class="row">
          <div class="col-lg-10 dates-wrapper">
            <div class="row">
              <div class="col-lg-7">
                <div class="row">

                  <div class="col-md-2 col-sm-12">
                    <div class="row">
                      <div class="btn-group show-on-hover">
                        <button ref="timeType" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                          {{ $t(timeType) }}
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                          <li v-for="timeType in betDetailTimeType" :key="timeType.code" @click="onTimeTypeChange(timeType.code)">
                            <a class="pointer">{{ $t(timeType.code) }}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-10 col-sm-12">
                    <div class="row">
                      <div class="field clearfix date-range-start date-wrapper">
                        <div class="label dates-item">
                          <label for="datepicker-start">起:</label>
                        </div>
                        <datetimepicker class="input" v-model="start_time" :icon="false" />

                      </div>
                      <div class="field clearfix date-range-start date-wrapper">
                        <div class="label dates-item">
                          <label for="datepicker-end">迄:</label>
                        </div>
                        <datetimepicker class="input" v-model="stop_time" :icon="false" />

                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="col-lg-5">
                <div class="row">
                  <div class="bt-range pull-right">
                    <button class="btn btn-primary" @click="setTime('lastDay')">前一天</button>
                    <button class="btn btn-primary" @click="setTime('afterDay')">後一天</button>
                    <button class="btn btn-primary" @click="setTime('lastWeek')">上週</button>
                    <button class="btn btn-primary" @click="setTime('thisWeek')">本週</button>
                    <button class="btn btn-primary" @click="setTime('lastMonth')">上月</button>
                    <button class="btn btn-primary" @click="setTime('thisMonth')">本月</button>
                    <div class="calendar-bt pull-right">
                      <button type="button" class="btn btn-default btn-block dates-bt" @click="onGetBetDetailReport()">搜尋</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="row">
              <table class="rwd-table">
                <tr class="cf-title">
                  <th>項目</th>
                  <th>筆數</th>
                  <th>投注金額</th>
                  <th>有效投注</th>
                  <th>輸贏結果(含退水)</th>
                  <th>退水</th>
                  <th>注單</th>
                </tr>
                <tr v-for="(report, key) in reports" :key="key" v-if="betDetailType[key]">
                  <td data-th="項目">{{ $t(betDetailType[key].code) }}</td>
                  <td data-th="筆數">{{ report.totalCount }}</td>
                  <td data-th="投注金額">{{ report.betMoney | currency }}</td>
                  <td data-th="有效投注">{{ report.validBetMoney | currency }}</td>
                  <td data-th="輸贏結果(含退水)">
                    <span :style="{ color: [report.result > -1 ? 'green': 'red'] }">
                      {{ $currency(report.result, 2) }}
                    </span>
                  </td>
                  <td data-th="退水">{{ report.commission | currency }}</td>
                  <td data-th="注單">
                    <a class="btn btn-warning" @click="openByRoute({
                        name: 'credit-member-betdetail',
                        params: getBetDetailParams(key)
                      })">
                      <a>
                        <span style="color: #000;">明細</span>
                      </a>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td data-th="項目" style="color: #ffc000;">總計</td>
                  <td data-th="筆數">{{ total.totalCount }}</td>
                  <td data-th="投注金額">{{ total.betMoney | currency }}</td>
                  <td data-th="有效投注">{{ total.validBetMoney | currency }}</td>
                  <td data-th="輸贏結果(含退水)">
                    <span :style="{ color: [total.result > -1 ? 'green': 'red'] }">
                      {{ $currency(total.result, 2) }}
                    </span>
                  </td>
                  <td data-th="退水">{{ total.commission | currency }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BetDetailReport from 'src/mixins/Platform/BetDetailReport'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'

export default {
	mixins: [CheckLogin, BetDetailReport],
	data: () => ({
		timeType: 'refer_date'
	}),
	methods: {
		onTimeTypeChange(type) {
			this.timeType = type
		}
	},
	mounted() {
		$(this.$refs.timeType).dropdown()
	}
}
</script>
