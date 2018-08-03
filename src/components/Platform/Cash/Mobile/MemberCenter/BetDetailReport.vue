<template>
  <section>
    <div class="reg_title">
      <span>投注明細</span>
    </div>
    <div class="lobby-container event">
      <div class="container-fluid">
        <div id="custom_carousel" class="carousel slide">

          <!-- Wrapper for slides -->

          <div class="carousel-inner betdet">
            <div class="item active">
              <div class="row datebar">

                <div class="col-xs-12">
                  <div class="form-group">
                    <label class="col-xs-2 s_title">起</label>
                    <datetimepicker class="input-group col-xs-9 date" v-model="start_time" @change="onGetBetDetailReport()" />

                  </div>
                </div>
                <div class="col-xs-12">
                  <div class="form-group">
                    <label class="col-xs-2 s_title">迄</label>
                    <datetimepicker class="input-group col-xs-9 date" v-model="stop_time" @change="onGetBetDetailReport()" />

                  </div>
                </div>
                <div class="col-xs-12">
                  <div class="form-group">
                    <div class="selectbox2">
                      <ul>
                        <li>
                          <a href="#" class="btn btn-date" @click="mySetTime('lastDay')">前一天</a>
                        </li>
                        <li>
                          <a href="#" class="btn btn-date" @click="mySetTime('afterDay')">後一天</a>
                        </li>
                        <li>
                          <a href="#" class="btn btn-date" @click="mySetTime('lastWeek')">上週</a>
                        </li>
                        <li>
                          <a href="#" class="btn btn-date" @click="mySetTime('thisWeek')">本週</a>
                        </li>
                        <li>
                          <a href="#" class="btn btn-date" @click="mySetTime('lastMonth')">上月</a>
                        </li>
                        <li>
                          <a href="#" class="btn btn-date" @click="mySetTime('thisMonth')">本月</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bet-table-box">
                <div class="div_body" v-for="(report, key) in reports" :key="key" v-if="betDetailType[key]">
                  <div class="divRow divtitle">
                    <div class="divHead">項目</div>
                    <div class="divCell">{{ $t(betDetailType[key].code) }}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">筆數</div>
                    <div class="divCell">{{ report.totalCount }}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">投注金額</div>
                    <div class="divCell">{{ report.betMoney | currency }}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">有效投注</div>
                    <div class="divCell">{{ report.validBetMoney | currency }}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">輸贏結果(含退水)</div>
                    <div class="divCell">
                      <span :class="{ [report.result< 0 ? 'color-red' : 'color-green']: true }">
                        {{ $currency(report.result, 2) }}
                      </span>
                    </div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">退水</div>
                    <div class="divCell">
                      <span class="c_green">{{ report.commission | currency }}</span>
                    </div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">注單</div>
                    <div class="divCell">&nbsp;
                      <router-link class="btn-oderlist" :to="{
                          name: 'cash-mobile-bet-detail',
                          params: getBetDetailParams(key)
                        }">明細
                      </router-link>
                    </div>
                  </div>
                </div>

                <div class="div_body total">
                  <div class="divRow divtitle">
                    <div class="divHead"></div>
                    <div class="divCell">總計</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">筆數</div>
                    <div class="divCell">{{ total.totalCount }}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">投注金額</div>
                    <div class="divCell">{{ total.betMoney | currency }}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">有效投注</div>
                    <div class="divCell">{{ total.validBetMoney | currency}}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">輸贏結果(含退水)</div>
                    <div class="divCell">
                      <span :class="{ [total.result > -1 ? 'color-green': 'color-red']: true }">
                        {{ $currency(total.result, 2) }}
                      </span>
                    </div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">退水</div>
                    <div class="divCell">
                      <span class="c_green">{{ total.commission | currency }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Item -->
        </div>
        <!-- End Carousel Inner -->
      </div>
      <!-- End Carousel -->
    </div>
  </section>
</template>

<script>
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import BetDetailReport from 'src/mixins/Platform/BetDetailReport'

export default {
	mixins: [CheckLogin, BetDetailReport],
	data: () => ({
		timeType: 'bet_time'
	})
}
</script>
