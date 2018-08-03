<template>
  <section>
    <div class="title">
      <h2>投注明細</h2>
    </div>
    <div class="bet-content">
      <div class="container">
        <div class="row">
          <!--行事曆搜尋-->
          <div class="dates-wrapper group">
            <div class="row">
              <div class="col-xs-6 field clearfix date-range-start date-wrapper">
                <div class="dates-title-L">起</div>
                <datetimepicker class="input dates-L" v-model="start_time" :icon="false" />

              </div>
              <div class="col-xs-6 field clearfix date-range-start date-wrapper">
                <div class="dates-title-R">迄</div>
                <datetimepicker class="input dates-R" v-model="stop_time" :icon="false" />

              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 details-bt">
                <button class="btn btn-primary" @click="setTime('lastDay')">前一天</button>
                <button class="btn btn-primary" @click="setTime('afterDay')">後一天</button>
                <button class="btn btn-primary" @click="setTime('lastWeek')">上週</button>
                <button class="btn btn-primary" @click="setTime('thisWeek')">本週</button>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <button type="button" class="btn btn-default dates-bt" @click="onGetBetDetailReport()">搜尋</button>
              </div>
            </div>
          </div>
          <!---->
        </div>
        <div class="row">
          <table class="table table-bordered" v-for="(report, key) in reports" :key="key" v-if="betDetailType[key]">
            <tbody>
              <tr class="bordered-header">
                <td>項目</td>
                <td>{{ $t(betDetailType[key].code) }}</td>
              </tr>
              <tr>
                <td>筆數</td>
                <td>{{ report.totalCount }}</td>
              </tr>
              <tr>
                <td>投注金額</td>
                <td>{{ report.betMoney | currency }}</td>
              </tr>
              <tr>
                <td>有效投注</td>
                <td>{{ report.validBetMoney | currency }}</td>
              </tr>
              <tr>
                <td>輸贏結果(含退水)</td>
                <td>
                  <span :style="{ color: [report.result < 0 ? 'red': 'green'] }">
                    {{ $currency(report.result, 2) }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>退水</td>
                <td>{{ report.commission | currency }}</td>
              </tr>
              <tr>
                <td>注單</td>
                <td>
                  <router-link class="btn btn-warning" :to="{
                      name: 'sin-mobile-bet-detail',
                      params: getBetDetailParams(key)
                    }">
                    <span style="color: #000;">明細</span>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <tbody>
              <tr class="bordered-header">
                <td>項目</td>
                <td>總計</td>
              </tr>
              <tr>
                <td>筆數</td>
                <td>{{ total.totalCount }}</td>
              </tr>
              <tr>
                <td>投注金額</td>
                <td>{{ total.betMoney | currency }}</td>
              </tr>
              <tr>
                <td>有效投注</td>
                <td>{{ total.validBetMoney | currency}}</td>
              </tr>
              <tr>
                <td>輸贏結果(含退水)</td>
                <td>
                  <span :style="{ color: [total.result < 0 ? 'red': 'green'] }">
                    {{ $currency(total.result, 2) }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>退水</td>
                <td>{{ total.commission | currency }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import BetDetailReport from 'src/mixins/Platform/BetDetailReport'

export default {
	mixins: [CheckLogin, BetDetailReport]
}
</script>
