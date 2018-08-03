<template>
  <form class="col-md-10 col-md-offset-1 form-horizontal member_form">
    <div class="member_title clearfix">
      <span>遊戲幣轉移</span>
      <ul id="myTab" class="nav nav-tabs tab_list pull-right">
        <li class="active">
          <a href="#tab1" data-toggle="tab">遊戲幣轉移</a>
        </li>
        <li class="clearfix">
          <a href="#tab2" data-toggle="tab">轉移記錄</a>
        </li>
      </ul>
    </div>

    <div id="myTabContent" class="tab-content">

      <div class="tab-pane fade in active" id="tab1">
        <table class="member_table member_transfer" style="margin-bottom: 20px;border: 2px solid #ffec3b;" cellpadding="0">
          <tbody>
            <tr>
              <th width="50%" style="background-color: #ffeb3b;">{{ $t('e_wallet') }}</th>
              <th width="50%" style="background-color: #ffcb0a;">總點數</th>
            </tr>
            <tr>
              <td :data-th="$t('e_wallet')">{{ surplus | currency(2) }}</td>
              <td data-th="總點數">{{ getTotalPoint(userPoint) | currency(2) }}</td>
            </tr>
          </tbody>
        </table>
        <table class="member_table member_transfer" cellpadding="0">
          <tbody v-for="line in rows">
            <tr>
              <th width="25%" v-for="code in get4Code(line)">{{ $t(code) }}</th>
            </tr>
            <tr>
              <td v-for="code in get4Code(line)">
                <span v-if="code === 'TAMBT'">{{ wallet + income | currency(2) }}</span>
                <span v-else>{{ userPoint[code] | currency(2) }}</span>
                <button class="btn-return" type="button" :disabled="isSubmit" v-if="userPoint[code]" @click="trans2EWallet(code)">轉回</button>
              </td>
            </tr>
          </tbody>
        </table>
        <form class="form-horizontal member_form">
          <div class="row" v-if="checkYeb">
            <h3 class="yeb-title">餘額寶</h3>
            <div class="col-md-6">
              <div class="yeb-save">
                <i>
                  <img src="/resource/static/platform-cash/images/y_icon4.png" alt="">
                </i>
                <h3>今日可存：
                  <span class="num">{{ allow | currency }}</span>
                  <small>點</small>
                </h3>
              </div>
            </div>
            <div class="col-md-6">
              <div class="yeb-save">
                <i>
                  <img src="/resource/static/platform-cash/images/y_icon3.png" alt="">
                </i>
                <h3>今日已存：
                  <span class="num">{{ already | currency }}</span>
                  <small>點</small>
                </h3>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-2 col-md-offset-1 control-label">轉出</label>
            <div class="col-md-9">
              <select class="form-control2" v-model="source">
                <option v-for="(point, code) in getCurrentUserPointOrder(userPoint)" :value="code">{{ $t(code) }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-2 col-md-offset-1 control-label">轉入</label>

            <div class="col-md-9">
              <select class="form-control2" v-model="target">
                <option v-for="(point, code) in gamesFilter" :value="code">{{ $t(code) }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="price" class="col-md-2 col-md-offset-1 control-label">遊戲幣</label>
            <div class="col-md-9">
              <!-- <input type="text" class="form-control2" id="price" v-model.number="point"> -->
              <my-numeric class="form-control2" v-model.number="point" />
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-9 col-md-offset-3">
              <button type="button" class="btn submit_btn" :disabled="isSubmit" @click="onSubmit">送出</button>
            </div>
          </div>
          <div class="form-group">
            <label for="code" class="col-md-2 col-md-offset-1 control-label"></label>
            <div class="col-md-9 meber-impt">
              <p class="imp">遊戲幣轉移注意事項：：</p>
              <p>1.為加速您的服務，申請遊戲幣轉移時，務必先關閉您的遊戲。</p>
              <p>2.若無您欲轉移之遊戲館，請洽詢線上客服。</p>
              <p>3.過於頻繁的轉移動作，系統將自動濾除。</p>
            </div>
          </div>
        </form>
      </div>

      <div class="tab-pane fade in" id="tab2">

        <div class="row datebar">
          <div class="col-md-5">
            <div class="form-group">
              <label class="col-md-2 s_title">起</label>
              <datetimepicker class="input-group col-md-8 date" v-model="item.start_time" />
            </div>
          </div>
          <div class="col-md-5">
            <div class="form-group">
              <label class="col-md-3 s_title">~ 迄</label>
              <datetimepicker class="input-group col-md-8 date" v-model="item.end_time" />
            </div>
          </div>
          <div class="col-sm-2">
            <input type="button" @click="onMyGetData()" value="搜 尋" class="btn btn-pharaoh">
          </div>
        </div>

        <table class="member_table member_record" cellpadding="0" v-if="item.total">
          <tbody>
            <tr>
              <th>注單編號</th>
              <th>來源</th>
              <th>目的</th>
              <th>時間</th>
              <th>遊戲幣</th>
              <th>狀態</th>
            </tr>
            <tr v-for="data in item.datas">
              <td data-th="注單編號">{{ data.p77_por_id.PadLeft(10) }}</td>
              <td data-th="來源">{{ $t(data.p77_por_source) }}</td>
              <td data-th="目的">{{ $t(data.p77_por_destination) }}</td>
              <td data-th="時間">{{ $moment(data.p77_por_created_at).Format('Y-m-d h:i:s') }}</td>
              <td data-th="遊戲幣">{{ data.p77_por_order_point | currency(2)}}</td>
              <td data-th="狀態">
                <span v-if="data.p77_por_order_status === 0" class="noneprocessed">未處理</span>
                <span v-if="data.p77_por_order_status === 1" class="noneprocessed">已初審</span>
                <span v-if="data.p77_por_order_status === 2" class="processed">已完成</span>
                <span v-if="data.p77_por_order_status === 8" class="noneprocessed">失敗</span>
                <span v-if="data.p77_por_order_status === 9" class="noneprocessed">取消</span>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="member_table member_record" cellpadding="0" v-else>
          <tbody>
            <tr>
              <td>暫無交易資料</td>
            </tr>
          </tbody>
        </table>
        <my-pager :lastPage="item.lastPage" :page="item.page" @change="pageChg" />
        <!-- listab -->

      </div>
    </div>
  </form>
</template>

<script>
import PointTransform from 'src/mixins/Platform/Payment/PointTransform'
import TransformRecord from 'src/mixins/Platform/Payment/TransformRecord-PointTransform'
import CheckGame from 'src/mixins/Platform/CheckGame'
import Yebpay from 'src/mixins/Platform/Yebpay'

export default {
	mixins: [PointTransform, TransformRecord, CheckGame, Yebpay],
	components: {
		MyPager: require('@/Platform/Cash/Mobile/shared/MyPager'),
		MyNumeric: require('@/shared/MyNumeric')
	},
	methods: {
		get4Code(line) {
			var res = []
			_.forEach(_.range(4), i => {
				res.push(this.codeList[line * 4 + i])
			})
			return res
		}
	},
	created() {
		this.setMounted()
	},
	computed: {
		codeList() {
			return _.keys(this.getHeaderUserPoint(this.userPoint))
		},
		rows() {
			return _.range(Math.ceil(this.codeList.length / 4))
		}
	}
}
</script>

<style scoped>
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
</style>