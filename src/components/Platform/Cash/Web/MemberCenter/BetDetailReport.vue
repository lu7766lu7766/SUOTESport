<template>
  <form class="col-md-10 col-md-offset-1 form-horizontal member_form">
    <div class="member_title clearfix">
      <span>投注明細</span>
    </div>
    <div id="myTabContent" class="tab-content">
      <div class="tab-pane fade in active" id="tabSport">
        <!-- search start -->
        <div class="row datebar">

          <div class="col-md-5 col-md-offset-1">
            <div class="form-group">
              <label class="col-md-2 s_title">起</label>
              <datetimepicker class="col-md-9 date" v-model="start_time" />

            </div>
          </div>
          <div class="col-md-5">
            <div class="form-group">
              <label class="col-md-2 s_title">迄</label>
              <datetimepicker class="col-md-9 date" v-model="stop_time" />

            </div>
          </div>

          <div class="col-md-6 col-md-offset-2">
            <div class="form-group">
              <div class="selectbox2">
                <ul class="pull-left">
                  <li>
                    <a href="#" class="btn btn-date" @click="setTime('lastDay')">前一天</a>
                  </li>
                  <li>
                    <a href="#" class="btn btn-date" @click="setTime('afterDay')">後一天</a>
                  </li>
                  <li>
                    <a href="#" class="btn btn-date" @click="setTime('lastWeek')">上週</a>
                  </li>
                  <li>
                    <a href="#" class="btn btn-date" @click="setTime('thisWeek')">本週</a>
                  </li>
                  <li>
                    <a href="#" class="btn btn-date" @click="setTime('lastMonth')">上月</a>
                  </li>
                  <li>
                    <a href="#" class="btn btn-date" @click="setTime('thisMonth')">本月</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-2">
            <input type="button" value="搜 尋" class="btn btn-pharaoh" @click="onGetBetDetailReport()">
          </div>

        </div>
        <!-- search end -->

        <!-- report start -->
        <div class="panel-group-news" id="accordion">
          <div class="panel panel-default">
            <div class="panel-body2">
              <table class="member_table member_record" cellpadding="0">
                <tbody>
                  <tr>
                    <th width="16%">項目</th>
                    <th width="9%">筆數</th>
                    <th width="18%">投注金額</th>
                    <th width="18%">有效投注</th>
                    <th width="18%">輸贏結果(含退水)</th>
                    <th width="10%">退水</th>
                    <th width="9%">注單</th>
                  </tr>
                  <tr>
                    <tr v-for="(report, key) in reports" :key="key" v-if="betDetailType[key]">
                      <td data-th="項目">
                        {{ $t(betDetailType[key].code) }}
                      </td>
                      <td data-th="項目">
                        {{ report.totalCount }}
                      </td>
                      <td data-th="投注金額">
                        {{ report.betMoney | currency }}
                      </td>
                      <td data-th="有效投注">
                        {{ report.validBetMoney | currency }}
                      </td>
                      <td data-th="輸贏結果(含退水)">
                        <span :class="{ [report.result < 0 ? 'color-red' : 'color-green']: true }">
                          {{ $currency(report.result, 2) }}
                        </span>
                      </td>
                      <td data-th="退水">
                        <span class="color-green">
                          {{ report.commission | currency }}
                        </span>
                      </td>
                      <td data-th="注單">
                        <button class="btn-oderlist" type="button" @click="openByRoute({
                          name: 'cash-bet-detail',
                          params: getBetDetailParams(key)
                        })" target="_blank">明細
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td data-th="項目" style="color: #ffc000;">總計</td>
                      <td data-th="筆數">{{ total.totalCount }}</td>
                      <td data-th="投注金額">{{ total.betMoney | currency }}</td>
                      <td data-th="有效投注">{{ total.validBetMoney | currency }}</td>
                      <td data-th="輸贏結果(含退水)">
                        <span :class="{ [total.result < 0 ? 'color-red' : 'color-green']: true }">
                          {{ $currency(total.result, 2) }}
                        </span>
                      </td>
                      <td data-th="退水">
                        <span class="color-green">{{ total.commission | currency }}</span>
                      </td>
                      <td></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- report end -->

      </div>
    </div>
  </form>
</template>

<script>
import BetDetailReport from 'src/mixins/Platform/BetDetailReport'

export default {
	mixins: [BetDetailReport],
	data: () => ({
		timeType: 'bet_time'
	})
}
</script>

<style lang="stylus" scoped>
.btn-oderlist
  font-size 0.6em
  padding 6px 8px
  line-height 100%
  color #fff
  float left !important
  background-color #4CAF50
  border-color #4caf4f
</style>
