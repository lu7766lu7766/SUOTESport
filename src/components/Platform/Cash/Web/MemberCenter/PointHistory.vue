<template>
  <form class="col-md-10 col-md-offset-1 form-horizontal member_form">
    <div class="member_title clearfix">
      <span>點數歷程</span>

    </div>
    <div id="myTabContent" class="tab-content">

      <div class="tab-pane fade in active" id="tab1">

        <div class="row datebar">
          <div class="col-md-4">
            <div class="form-group">
              <label class="col-md-2 s_title">起</label>
              <datetimepicker class="input-group col-md-8 date" v-model="start" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="col-md-3 s_title inline">~ 迄</label>
              <datetimepicker class="input-group col-md-8 date" v-model="end" />
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <div class="col-md-12">
                <select class="selectpicker form-control" multiple ref="cOption" @change="onOptionChange()">
                  <option v-for="option in optionList" :value="option">
                    {{ $t(option) }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <input type="button" value="搜 尋" class="btn btn-pharaoh" @click="onGetPointHistoryAndPager()">
          </div>
        </div>
        <table class="member_table order-box" cellpadding="0">
          <tbody>
            <tr>
              <th width="15%">時間</th>
              <th width="15%">目標</th>
              <th width="10%">類型</th>
              <th width="15%">原始遊戲幣</th>
              <th width="15%">操作遊戲幣</th>
              <th width="15%">操作後遊戲幣</th>
              <th width="10%">狀態</th>
            </tr>
            <tr v-for="data in datas">
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
        <div class="listab sabrosus list_web">
          <my-pager :page="page" :lastPage="lastPage" @change="pageChg" />
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import PointHistory from 'src/mixins/Platform/Payment/PointHistory'
export default {
	mixins: [PointHistory],
	components: {
		MyPager: require('@/Platform/Cash/Web/shared/MyPager')
	}
}
</script>