<template>
  <section>
    <div class="pageslide about">
      <div class="container">
        <div class="p-title">
          會員中心
          <span>MEMBER CENTER</span>
        </div>
      </div>
    </div>

    <div class="breadcrumb-bg">
      <div class="container">
        <ol class="breadcrumb">
          <li>
            <a href="#">首頁</a>
          </li>
          <li>會員中心</li>
        </ol>
      </div>
    </div>

    <div class="page-container member">
      <div class="container">
        <div class="row-no-padding memberbox">
          <my-menu></my-menu>

          <div class="col-md-9 flex2">
            <form class="col-md-10 col-md-offset-1 form-horizontal member_form">
              <div class="member_title clearfix">
                <span>投注明細</span>

              </div>
              <div id="myTabContent" class="tab-content">

                <div class="tab-pane fade in active" id="tab1">
                  <div class="row datebar">
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="col-md-2 s_title">起</label>
                        <datetimepicker class="input-group col-md-9 date" v-model="start_time" />

                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="col-md-2 s_title">迄</label>
                        <datetimepicker class="input-group col-md-9 date" v-model="stop_time" />

                      </div>
                    </div>
                    <div class="col-md-4">
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
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <input type="button" value="搜 尋" class="btn btn-pharaoh" @click="onGetBetDetailReport()">
                    </div>

                  </div>
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
                      <tr v-for="(report, key) in reports" :key="key" v-if="betDetailType[key]">
                        <td data-th="項目">{{ $t(betDetailType[key].code) }}</td>
                        <td data-th="項目">{{ report.totalCount }}</td>
                        <td data-th="投注金額">{{ report.betMoney | currency }}</td>
                        <td data-th="有效投注">{{ report.validBetMoney | currency }}</td>
                        <td data-th="輸贏結果(含退水)">
                          <span :style="{ color: [report.result < 0 ? 'red': 'green'] }">
                            {{ $currency(report.result, 2) }}
                          </span>
                        </td>
                        <td data-th="退水">{{ report.commission | currency }}</td>
                        <td data-th="注單">
                          <a class="btn btn-warning" @click="openByRoute({
                              name: 'sin-member-betdetail',
                              params: getBetDetailParams(key)
                            })">
                            <a>
                              <span style="color: #000;">明細</span>
                            </a>
                          </a>
                        </td>
                      </tr>
                      <tr class="total">
                        <td data-th="項目" style="color: #ffc000;">總計</td>
                        <td data-th="筆數">{{ total.totalCount }}</td>
                        <td data-th="投注金額">{{ total.betMoney | currency }}</td>
                        <td data-th="有效投注">{{ total.validBetMoney | currency }}</td>
                        <td data-th="輸贏結果(含退水)">
                          <span :style="{ color: [total.result < 0 ? 'red': 'green'] }">
                            {{ $currency(total.result, 2) }}
                          </span>
                        </td>
                        <td data-th="退水">{{ total.commission | currency }}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--tab2-->
              </div>
            </form>
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
	components: {
		MyMenu: require('@/Platform/Sin/Web/MemberCenter/shared/Menu')
	}
}
</script>
