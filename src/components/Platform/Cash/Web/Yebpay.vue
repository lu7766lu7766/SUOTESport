<template>
  <section>
    <div class="page-container about">
      <div class="container">
        <div class="yeb-bg">
          <div class="yeb-rate">
            <span class="percent1">18%</span>
            <span class="percent2">{{interest}}
              <b>%</b>
            </span>
          </div>
          <div class="yeb-actime">
            <p>截止至</p>
            <p>2018 / 09 / 30 23:59:59</p>
          </div>
          <div class="yeb-time">{{ yebpayData.showTime ? yebpayData.showTime : showTime }}</div>
          <div class="yeb-interest">{{ yebpayData.income ? yebpayData.income : income }}</div>
          <div class="yeb-capital">{{ wallet | currency}}</div>
        </div>
        <ul id="myyebTab" class="nav nav-tabs yeb_list">
          <li class="active clearfix">
            <a href="#tab2" data-toggle="tab">馬上行動</a>
          </li>
          <li class="">
            <a href="#tab3" data-toggle="tab">異動明細查詢</a>
          </li>
          <li class="">
            <a href="#tab1" data-toggle="tab">餘額寶說明</a>
          </li>
        </ul>
        <div id="myyebTabContent" class="tab-content">

          <div class="tab-pane fade" id="tab1">
            <div class="row">
              <div class="col-md-6 text-right">
                <img src="/resource/static/platform-cash/images/yeb-ex-img3.png" alt="" />
              </div>
              <div class="col-md-6 yeb-ex-box">
                <h1>亞洲首創，餘額寶錢包</h1>
                <p>本平台為了回饋玩家，躺著也賺利息
                  <br> 獨創每日利息『秒秒返利』的餘額寶錢包。
                </p>
              </div>
            </div>
            <hr class="yeb-line">
            <div class="row">
              <div class="col-md-6 yeb-ex-box2">
                <h1>壓碼量越多，返息越豐厚</h1>
                <p>會員獨享高利息，輕鬆玩，每日儲! 讓您荷包賺飽飽。</p>
              </div>
              <div class="col-md-6 text-left">
                <img src="/resource/static/platform-cash/images/yeb-ex-img1.png" alt="" />
              </div>
            </div>
            <hr class="yeb-line">
            <div class="row">
              <div class="col-md-6 text-right">
                <img src="/resource/static/platform-cash/images/yeb-ex-img4.png" alt="" />
              </div>
              <div class="col-md-6 yeb-ex-box">
                <h1>秒秒返利，靈活存取</h1>
                <p>餘額寶使用靈活度高，讓您存放的遊戲幣24小時 調度自如，隨取隨用，利滾利增值您的錢包。
                </p>
              </div>
            </div>
            <ul id="myyebTab2" class="nav nav-tabs yeb_list2">
              <li class="active">
                <a href="#yeb1" data-toggle="tab">規則</a>
              </li>
              <li class="">
                <a href="#yeb2" data-toggle="tab">昨日流水量</a>
              </li>
              <li class="">
                <a href="#yeb3" data-toggle="tab">今日可存</a>
              </li>
              <li class="clearfix">
                <a href="#yeb4" data-toggle="tab">餘額寶額度</a>
              </li>
            </ul>
            <div id="myyebTabContent2" class="tab-content">
              <div class="tab-pane fade in active" id="yeb1">
                <p> 1. 轉點至餘額寶請到【
                  <router-link :to="{name: 'cash-point-transform'}">遊戲幣轉移</router-link>】操作</p>

                <p>2. 餘額寶本金+利息(以整數為主)於隔日凌晨00點，返回主錢包，小數部分於次日累加於餘額寶本金內利滾利。</p>
                <p>3. 今日已存不能超過今日可存(等於昨日流水量)。</p>
                <p>4. 經過時間 = 目前時間 - 上次算利息時間
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;計算年利率 = 年利率 * 經過時間
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;換算秒利率 = 計算年利率 / 31536000(一年秒數的總和)
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;本次利息 = 錢包金額 * 秒利率</p>
                <div class="yebbox yebbox2">
                  <div class="yebtitle">
                    <i><img src="images/y_icon1.png" alt=""></i>
                    <h3>算算餘額寶幫你淨賺多少？</h3>
                    <p>昨日收益：
                      <span class="color-org">{{yesterday_income}}</span> 點; 目前利率：
                      <span class="color-org" style="font-size: 20px">{{interest}}%</span>
                    </p>
                  </div>
                  <br>
                  <div class="form-group clearfix">
                    <div class="col-md-8">
                      <input type="number" v-model="yepayCaculate" class="form-control2 yeb-form" id="yebpay">
                    </div>
                    <div class="col-md-4">
                      <button class="yeb_btn" @click="caculate">計算收益</button>
                    </div>
                  </div>
                  <h5>
                    <t style="font-size:28px;">1年</t>
                    <t style="font-size:20px;">收益</t>：
                    <span class="color-org lead">{{ yearYepayResult | currency }}</span> 點 ; 1天收益：
                    <span class="color-org lead">{{ yepayResult | currency }}</span> 點
                  </h5>
                </div>
                <p>
                  <span class="color-org">範例 :</span>
                  <br> 昨日流水量為10,000，今日可存最高則為10,000
                  <br> 假設今日存了10,000，利息從轉入10,000時開始計。
                  <br>
                  <span class="color-org">計息方式為</span>
                  <br> 10,000* 18% / 31,536,000 (365天24小時60分鐘*60秒) =0.00005707(每秒增息金額)</p>
                <p>● [
                  <span class="color-blue">存入</span> ] 若是再續存3,000，之前本金10,000這邊會先結算 假設10,000已生息為 0.015，接著從0.015開始以13,000的每秒增息多少往上增加。
                  <br> ● [
                  <span class="color-blue">提出</span> ] 若當日存入10,000，轉出3,000會在10,000那邊結算，再以剩餘7,000每秒可得的利息往上增加。
                  <br> ● [
                  <span class="color-blue">結算</span> ] 直至隔天的00:00:00 會將本金+利息 整數的部分自動轉至主錢包，若剩餘 0.0005,則會從 下次存入時再由 0.0005開始往上增加。</p>
              </div>
              <!--yeb1-->
              <div class="tab-pane fade" id="yeb2">
                在本遊戲平台前一日的下注總額(昨日流水量)，包含前一日體育博彩、真人視訊、彩球、黃金期權 電子遊戲、3D電子遊戲、彩票等各項遊戲的下注總額稱之。

              </div>
              <div class="tab-pane fade" id="yeb3">
                昨日總下注額為本公司回饋會員的存入餘額寶錢包的總額，在公司平台玩得越多，公司反饋越多， 高額利息秒秒返給會員，讓會員的荷包可以賺息滿滿。

              </div>
              <div class="tab-pane fade" id="yeb4">
                會員可在餘額寶的專屬錢包裡，清楚的查詢今日可存入的金額及已存入的總額，並可知道存入後 所產生的高利息反饋金額，會員可以無時無刻的想存入返利或取出來遊戲使用都相當靈活。

              </div>
            </div>
          </div>
          <!-- tab1 -->

          <div class="tab-pane fade" id="tab3">
            <div class="row datebar">

              <div class="col-md-3">
                <div class="form-group">
                  <label class="col-md-2 s_title">起</label>

                  <div class="input-group col-md-9 date" id="datetimepicker1">
                    <datetimepicker v-model="start_time" />
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">

                  <label class="col-md-2 s_title">迄</label>

                  <div class="input-group col-md-9 date" id="datetimepicker1">
                    <datetimepicker v-model="stop_time" />
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <div class="selectbox2">
                    <ul class="pull-left">
                      <li>
                        <a class="btn btn-date pointer" data-toggle="button" @click="setTime('lastDay')">前一天</a>
                      </li>
                      <li>
                        <a class="btn btn-date pointer" data-toggle="button" @click="setTime('afterDay')">後一天</a>
                      </li>
                      <li>
                        <a class="btn btn-date pointer" data-toggle="button" @click="setTime('lastWeek')">上週</a>
                      </li>
                      <li>
                        <a class="btn btn-date pointer" data-toggle="button" @click="setTime('thisWeek')">本週</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <input type="button" @click="getTAMBTInfoData()" value="搜 尋" class="btn btn-pharaoh">
              </div>

            </div>
            <table class="member_table member_record" cellpadding="0">
              <tbody>
                <tr>
                  <th width="20%">計息區間</th>
                  <th width="15%">計息本金</th>
                  <th width="15%">產生利息</th>
                  <th width="15%">點數異動</th>
                  <th width="20%">利息餘額</th>
                  <th width="15%">備註</th>
                </tr>
                <!-- <tr>
                  <td data-th="異動日期">
                    {{ currentData.created_timestamp ? $moment(currentData.created_timestamp).Format('Y/m/d - H:i:s') : ''}}
                  </td>
                  <td data-th="原始本金">
                    {{ currentData.wallet | currency }}
                  </td>
                  <td data-th="異動金額">
                    -
                  </td>
                  <td data-th="已存入時間">
                    {{ showTime }}
                    <span class="color-blue">( 生息中 )</span>
                  </td>
                  <td data-th="已產生利息">
                    <span class="color-green">1,000</span>
                  </td>
                </tr> -->
                <tr v-for="item in historyList.datas">
                  <td data-th="異動日期">
                    {{ item.income_data[0] ? $moment(item.income_data[0].last_compute).Format('Y/m/d - H:i:s') + ' ~ ' : ''}} {{ $moment(item.created_timestamp).Format('Y/m/d - H:i:s') }}
                  </td>
                  <td data-th="計息本金">
                    {{ item.before_value | currency(0,true) }}
                  </td>
                  <td data-th="產生利息">
                    <span class="color-green">
                      {{ item.get_income | currency(0,true)}}
                    </span>
                  </td>
                  <td data-th="點數異動">
                    <span :class="item.value >= 0  ? 'color-green' : 'color-red'">
                      {{item.value | currency(0,true)}}
                    </span>
                  </td>
                  <td data-th="利息餘額">
                    {{item.income}}
                  </td>
                  <td data-th="備註">
                    {{transType(item.type, item.get_income)}}
                  </td>
                </tr>
                <tr v-if="historyList.datas.length === 0">
                  <td style="text-align:center;" colspan="6">查無資料</td>
                </tr>
              </tbody>
            </table>
            <my-pager :page="page" :lastPage="lastPage" @change="pageChg" />
          </div>
          <!--tab3-->

          <div class="tab-pane fade in active" id="tab2">
            <div class="row">
              <div class="col-md-6">
                <div class="yebbox">
                  <div class="yebtitle">
                    <i>
                      <img src="/resource/static/platform-cash/images/y_icon1.png" alt="" />
                    </i>
                    <h3>算算餘額寶幫你淨賺多少？</h3>
                    <p>昨日收益：
                      <span class="color-org">{{yesterday_income}}</span> 點; 目前利率：
                      <span class="color-org" style="font-size: 20px">{{interest}}%</span>
                    </p>
                  </div>
                  <div class="form-group clearfix">
                    <div class="col-md-8">
                      <input type="number" v-model="yepayCaculate" class="form-control2 yeb-form" id="yebpay">
                    </div>
                    <div class="col-md-4">
                      <button class="yeb_btn" @click="caculate">計算收益</button>
                    </div>
                  </div>
                  <h5>
                    <t style="font-size:28px;">1年</t>
                    <t style="font-size:20px;">收益</t>：
                    <span class="color-org lead">{{ yearYepayResult | currency }}</span> 點 ; 1天收益：
                    <span class="color-org lead">{{ yepayResult | currency }}</span> 點</h5>
                  <p>備註：參照昨日收益計算，數據來源：皇璽會。貨幣基金不等同於銀行 存款，過往業績不預示其未來表現，市場有風險，投資需謹慎。</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="yebbox">
                  <div class="yebtitle">
                    <i>
                      <img src="/resource/static/platform-cash/images/y_icon2.png" alt="" />
                    </i>
                    <h3>想賺錢，立即開始！</h3>
                    <p>詳細步驟</p>
                  </div>
                  <ul class="yeb-run-down">
                    <li>
                      <img src="/resource/static/platform-cash/images/yeb-rd1.png" alt="" />
                      <p>餘額寶真名</p>
                    </li>
                    <li class="next"></li>
                    <router-link tag="li" :to="{name: 'cash-point-transform'}">
                      <img src="/resource/static/platform-cash/images/yeb-rd2.png" alt="" />
                      <p>
                        遊戲幣轉移
                      </p>
                    </router-link>
                    <li class="next"></li>
                    <li>
                      <img src="/resource/static/platform-cash/images/yeb-rd3.png" alt="" />
                      <p>坐享收益</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="yeb-save">
                  <i>
                    <img src="/resource/static/platform-cash/images/y_icon4.png" alt="" />
                  </i>
                  <h3>今日可存：
                    <span class="num">{{allow | currency}}</span>
                    <small>點</small>
                  </h3>
                </div>
              </div>
              <div class="col-md-5">
                <div class="yeb-save">
                  <i>
                    <img src="/resource/static/platform-cash/images/y_icon3.png" alt="" />
                  </i>
                  <h3>今日已存：
                    <span class="num">{{already | currency}}</span>
                    <small>點</small>
                  </h3>
                </div>
              </div>
              <div class="col-md-3 gosave">
                <div class="form-group">
                  <router-link :to="{name: 'cash-point-transform'}">
                    <button class="yeb_btn2">立即生息</button>
                  </router-link>
                </div>
              </div>
            </div>
            <hr class="yeb-line">
            <div class="row yeb-saveform">
              <!-- <div class="col-md-3 col-md-offset-1"> 
					  <div class="form-group row">
							<label class="col-md-3 control-label">轉出</label>
							<div class="col-md-9">
								<select class=" form-control2">
									<option>主錢包</option>
								</select>
							</div>
					   </div>
					</div> -->
              <!-- <div class="col-md-3"> 
					   <div class="form-group row">
							<label class="col-md-3 control-label">轉入</label>
							<div class="col-md-9">
								<select class=" form-control2">
									<option>餘額寶</option>
								</select>
							</div>
						</div>
					</div> -->

            </div>
          </div>
          <!-- tab2 -->
        </div>

      </div>
    </div>

  </section>
</template>

<script>
import Yebpay from 'src/mixins/Platform/Yebpay'

export default {
	name: '',
	mixins: [Yebpay],
	data: () => ({
		yebpayData: {}
	}),
	created() {
		this.setTime('Today')
		this.setMounted()
		this.$bus.on('yebpayCaculate', data => {
			this.yebpayData = data
		})
		this.getTAMBTInfoData()
	}
}
</script>

<style scoped>
.yeb-time {
	font-size: 36px;
}

h1 small,
h2 small,
h3 small,
h4 small,
h5 small,
h6 small,
.h1 small,
.h2 small,
.h3 small,
.h4 small,
.h5 small,
.h6 small,
h1 .small,
h2 .small,
h3 .small,
h4 .small,
h5 .small,
h6 .small,
.h1 .small,
.h2 .small,
.h3 .small,
.h4 .small,
.h5 .small,
.h6 .small {
	color: #fff;
}

p {
	color: #fff;
}

.yeb-rate .percent2 b {
	position: absolute;
	right: -70px;
}
</style>
