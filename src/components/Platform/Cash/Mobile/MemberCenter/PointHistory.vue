<template>
  <section>
    <div class="reg_title">
      <span>點數歷程</span>
    </div>
    <div class="lobby-container event">
      <div class="container-fluid">
        <div id="custom_carousel" class="carousel slide">
          <div class="carousel-inner betdet">
            <div class="clearfix datebar">
              <div class="col-xs-6" style="padding-right: 3px">
                <div class="form-group">
                  <label class="col-xs-2 s_title">起</label>
                  <datetimepicker class="input-group col-xs-9 date" v-model="start" />
                </div>
              </div>
              <div class="col-xs-6" style="padding-left: 3px">
                <div class="form-group">
                  <label class="col-xs-2 s_title">迄</label>
                  <datetimepicker class="input-group col-xs-9 date" v-model="end" />
                </div>
              </div>
              <div class="col-xs-6" style="padding-right: 3px">
                <div class="form-group">
                  <label class="col-xs-2 s_title"></label>
                  <div class="col-xs-9" style="padding: 0px;">
                    <select class="selectpicker form-control" multiple ref="cOption" @change="onOptionChange()">
                      <option v-for="option in optionList" :value="option">{{ $t(option) }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-xs-6" style="padding-left: 3px">
                <div class="form-group">
                  <label class="col-xs-2 s_title"></label>
                  <div class="input-group col-xs-9">
                    <input type="button" value="搜 尋" class="btn btn-pharaoh" @click="onGetPointHistoryAndPager()">
                  </div>
                </div>
              </div>
            </div>
            <table class="member_table order-box" cellpadding="0" v-for="data in datas">
              <tbody>
                <tr>
                  <td data-th="時間">{{ $moment(data.time).Format('Y-m-d H:i') }}</td>
                  <td class="pt-box" data-th="目標">{{ $t(data.wallet_type) }}</td>
                  <td class="order-pt" data-th="類型">{{ $t(data.operation_type) }}</td>
                  <td class="pt-box" data-th="原始遊戲幣">{{ data.origin_coin | currency }}</td>
                  <td data-th="操作遊戲幣">
                    <span :class="{ 
                      'color-green': data.operation_coin >= 0, 
                      'color-red': data.operation_coin < 0
                      }">{{ data.operation_coin | currency }}</span>
                  </td>
                  <td data-th="操作後遊戲幣">{{ data.final_coin | currency }}</td>
                  <td data-th="狀態">
                    <span class="processed">已完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PointHistory from 'src/mixins/Platform/Payment/PointHistory'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
	mixins: [PointHistory, MobilePager],
	mounted() {
		this.$bus.on('scroll.bottom', () => {
			this.onScrollBottom(async () => {
				var datas = _.cloneDeep(this.datas)
				await this.onGetPointHistory()
				this.datas = _.concat(datas, this.datas)
			})
		})
	},
	destroyed() {
		this.$bus.off('scroll.bottom')
	}
}
</script>