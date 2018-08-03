<template>
  <section>
    <div class="details-header">
      <div class="container-fluid">
        <div class="row details-title">
          <h4>{{ $t(betDetailType[reportType].code) }}</h4>
          <div class="details-return">
            <a @click="$router.go(-2)">
              <i class="fa fa-reply" aria-hidden="true"></i> 回列表</a>
          </div>
        </div>
      </div>
    </div>
    <div class="details-content">
      <div class="container">

        <!-- sport -->
        <div class="row" v-if="betDetailType[reportType].code == betDetailType.sport.code">
          <table class="table1" v-for="detail in details">
            <tr class="table1-header">
              <td colspan="2">注單編號：{{ detail.number }}</td>
            </tr>
            <tr class="table1-header1">
              <td>
                <span style="color: #fff;">{{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}</span>
              </td>
              <td>
                <span class="table-times-R">投注目標</span>
              </td>
            </tr>
            <tr class="table1-body2">
              <td>
                <span class="font-gold1">類型</span>
              </td>
              <td>{{ detail.type=='normal' 
                      ? $t(detail.targets_info[0].category) 
                      : $t(detail.type) }}</td>
            </tr>
            <tr class="table1-body2">
              <td>
                <span class="font-gold1">玩法</span>
              </td>
              <td>{{ detail.type=='normal' 
                      ? ($t(detail.targets_info[0].game) + '-' + $t(detail.targets_info[0].play)) 
                      : '-' }}</td>
            </tr>
            <tr class="table1-body1">
              <td>
                <span class="font-gold1">投注金額</span>
              </td>
              <td>{{ detail.cash | currency }}</td>
            </tr>
            <tr class="table1-body2">
              <td>
                <span class="font-gold1">輸贏結果(含退水)</span>
              </td>
              <td>
                <span :style="{ color: (detail.result < 0 || detail.status == 'received') ? 'red' : 'green' }">
                  {{ detail.status == 'received' ? '未結帳' : $currency(detail.result, 2) }}
                </span>
              </td>
            </tr>
            <tr class="table1-body1">
              <td>
                <span class="font-gold1">退水</span>
              </td>
              <td>{{ detail.commission }}</td>
            </tr>
            <tr class="table1-body1">
              <td colspan="2">
                <span class="font-gold1">投注內容</span>
              </td>
            </tr>
            <tr class="table1-body2">
              <td colspan="2">
                <section v-for="target in detail.targets_info">
                  {{ $t(target.category) }} - {{ $t(target.game) }} - {{ $t(target.play) }}
                  <br>
                  <span v-html="getBetListTitle({
                      stmList: target.bet_info.vs,
                      spy_code: target.play,
                      handicapStmCode: target.bet_info.master,
                      isSoccer: isSoccerByScyCode(target.category),
                      fraction: target.bet_info.fraction,
                      percent: target.bet_info.percent,
                      vs_score: target.vs_score
                    })">
                  </span>
                  <hr>
                  <span class="color1">{{ $t(target.bet_info.target) + ' ' + target.bet_info.odds }}</span>
                  <hr>
                </section>
              </td>
            </tr>
          </table>
        </div>

        <!-- outer game -->
        <div class="row" v-else>
          <table class="table1">
            <tr class="table1-header">
              <td colspan="2">注單編號：{{ detail.number }}</td>
            </tr>
            <tr class="table1-header1">
              <td>
                <span style="color: #fff;">{{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}</span>
              </td>
              <td>
                <span class="table-times-R">投注目標</span>
              </td>
            </tr>
            <tr class="table1-body2">
              <td>
                <span class="font-gold1">類型</span>
              </td>
              <td>{{ detail.game_type ? $t(betDetailType[reportType].gameType[detail.game_type]) : '-' }}</td>
            </tr>
            <tr class="table1-body2">
              <td>
                <span class="font-gold1">玩法</span>
              </td>
              <td>{{ detail.play_type ? $t(betDetailType[reportType].playType[detail.play_type]) : '-' }}</td>
            </tr>
            <tr class="table1-body1">
              <td>
                <span class="font-gold1">投注金額</span>
              </td>
              <td>{{ detail.cash | currency }}</td>
            </tr>
            <tr class="table1-body2">
              <td>
                <span class="font-gold1">輸贏結果(含退水)</span>
              </td>
              <td>
                <span :style="{ color: detail.result < 0 ? 'red' : 'green' }">
                  {{ $currency(detail.result, 2) }}
                </span>
              </td>
            </tr>
            <tr class="table1-body1">
              <td>
                <span class="font-gold1">退水</span>
              </td>
              <td>{{ detail.commission }}</td>
            </tr>
            <tr class="table1-body1">
              <td colspan="2">
                <span class="font-gold1">投注內容</span>
              </td>
            </tr>
            <tr class="table1-body2">
              <td colspan="2">
                <section v-if="detail.game_result">
                  <span v-html="detail.game_result"></span>
                  <hr>
                </section>
                <span class="color1" v-html="detail.context"></span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BetDetail from 'src/mixins/Platform/BetDetail'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
	mixins: [BetDetail, CheckLogin, MobilePager],
	mounted() {
		this.$bus.on('scroll.bottom', () => {
			this.onScrollBottom(async () => {
				var datas = _.cloneDeep(this.details)
				await this.onGetBetDetail()
				this.details = _.concat(datas, this.details)
			})
		})
	},
	destroyed() {
		this.$bus.off('scroll.bottom')
	}
}
</script>

<style lang="stylus" scoped>
.table-times-L 
  margin-left 0
</style>
