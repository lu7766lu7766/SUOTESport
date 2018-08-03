<template>
  <section>
    <div class="details-header">
      <div class="container-fluid">
        <div class="row details-title">
          <h1>{{ $t(betDetailType[reportType].code) }}</h1>
        </div>
      </div>
    </div>
    <div class="details-body">

      <!-- sport -->
      <div class="container-fluid" v-if="betDetailType[reportType].code == betDetailType.sport.code">
        <div class="row">
          <div class="col-lg-12" v-for="detail in details" :key="detail.number">
            <table class="table1">
              <tr class="table1-header">
                <td colspan="2">注單編號：{{ detail.number }}</td>
              </tr>
              <tr class="table1-header1">
                <td>
                  <span class="table-times-L">{{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}</span>
                </td>
                <td>
                  <span class="table-times-R">投注目標</span>
                </td>
              </tr>
              <tr class="table1-body1">
                <td colspan="2">
                  <span class="font-gold1">投注內容</span>
                </td>
              </tr>
              <tr class="table1-body2">
                <td colspan="2">
                  <div class="col-md-6 col-sm-12" v-for="target in detail.targets_info">
                    <div>
                      <span class="bt02">
                        <span class="font-gold1">類型：</span>{{ $t(target.category) }}</span>
                      <span class="bt02">
                        <span class="font-gold1">玩法：</span>{{ $t(target.game) + '-' + $t(target.play) }}</span>
                    </div>
                    <div class="betting-01">
                      <span class="bt01">{{ $t(target.game) }}</span>
                    </div>
                    <div class="credit-bet-detail" v-html="getBetListTitle({
                          stmList: target.bet_info.vs,
                          spy_code: target.play,
                          handicapStmCode: target.bet_info.master,
                          isSoccer: isSoccerByScyCode(target.category),
                          fraction: target.bet_info.fraction,
                          percent: target.bet_info.percent,
                          vs_score: target.vs_score
                        })">
                    </div>
                    <div class="betting-02">
                      <span>{{ $t(target.bet_info.target) }}</span>
                      <span class="green">{{ target.bet_info.odds }}</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="table1-body2">
                <td>
                  <span class="font-gold1">投注金額:</span>
                  <span class="font-white">{{ detail.cash | currency }}</span>
                </td>
                <td>
                  <div class="col-md-6">
                    <span class="font-gold1">輸贏結果(含退水):</span>
                    <span :class="{[detail.result < 0 || detail.status == 'received' ? 'red' : 'green']: true}">
                      {{ detail.status == 'received' ? '未結帳' : $currency(detail.result, 2) }}
                    </span>
                  </div>
                  <div class="col-md-6">
                    <span class="font-gold1">退水:</span>
                    <span>{{ detail.commission }}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <my-pager class="text-center" :page="page" :lastPage="lastPage" @change="pageChg" />
      </div>

      <!-- outer game -->
      <div class="container-fluid" v-else>
        <div class="row">
          <div class="col-lg-12" v-for="detail in details">
            <table class="table1">
              <tr class="table1-header">
                <td colspan="2">注單編號：{{ detail.number }}</td>
              </tr>
              <tr class="table1-header1">
                <td>
                  <span class="table-times-L">{{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}</span>
                </td>
                <td>
                  <span class="table-times-R">投注目標</span>
                </td>
              </tr>
              <tr class="table1-body1">
                <td colspan="2">
                  <span class="font-gold1">投注內容</span>
                </td>
              </tr>
              <tr class="table1-body2">
                <td colspan="2">
                  <div>
                    <span class="bt02">
                      <span class="font-gold1">類型：</span>
                      {{ detail.game_type ? $t(betDetailType[reportType].gameType[detail.game_type]) : '-' }}
                    </span>
                    <span class="bt02">
                      <span class="font-gold1">玩法：</span>
                      {{ detail.play_type ? $t(betDetailType[reportType].playType[detail.play_type]) : '-' }}
                    </span>
                  </div>
                  <section v-if="detail.game_result">
                    <span v-html="detail.game_result"></span>
                    <hr>
                  </section>
                  <span class="color1" v-html="detail.context"></span>
                </td>
              </tr>
              <tr class="table1-body2">
                <td>
                  <span class="font-gold1">投注金額:</span>
                  <span class="font-white">{{ detail.cash | currency }}</span>
                </td>
                <td>
                  <div class="col-md-6">
                    <span class="font-gold1">輸贏結果(含退水):</span>
                    <span :class="{[detail.result < 0 ? 'red' : 'green']: true}">
                      {{ $currency(detail.result, 2) }}
                    </span>
                  </div>
                  <div class="col-md-6">
                    <span class="font-gold1">退水:</span>
                    <span>{{ detail.commission }}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <my-pager class="text-center" :page="page" :lastPage="lastPage" @change="pageChg" />
      </div>
    </div>
  </section>
</template>

<script>
import Loading from 'src/mixins/Common/Check/Loading'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import BetDetail from 'src/mixins/Platform/BetDetail'

export default {
	mixins: [Loading, CheckLogin, BetDetail],
	components: {
		MyPager: require('@/shared/MyPager')
	},
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/sport-mobile/images/favicon.png',
				sizes: '16x16',
				type: 'image/png'
			},
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/bootstrap/css/bootstrap.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-credit/css/style.css' }
		]
	}
}
</script>

<style lang="stylus" scoped>
.credit-bet-detail 
  padding-left 30% 
  text-align left
</style>
