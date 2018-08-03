<template>
  <section>
    <div class="reg_title">
      <span>{{ $t(betDetailType[reportType].code) }}</span>
    </div>
    <div class="lobby-container event">
      <div class="container-fluid">
        <div id="custom_carousel" class="carousel slide">

          <div class="controls">
            <a @click="$router.go(-1)" class="btn-back">回列表</a>
          </div>
          <!-- Wrapper for slides -->

          <div class="carousel-inner betdet">
            <div class="item active">

              <!-- sport -->
              <div class="bet-table-box" v-if="betDetailType[reportType].code == betDetailType.sport.code">
                <div class="div_body" v-for="detail in details" :key="detail.number">
                  <div class="divRow divtitle">
                    <div class="divHead">注單編號</div>
                    <div class="divCell">
                      {{ detail.number }}<br>
                      {{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}
                    </div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">類型</div>
                    <div class="divCell">
                      {{ detail.type=='normal' 
                          ? $t(detail.targets_info[0].category) 
                          : $t(detail.type) }}
                    </div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">玩法</div>
                    <div class="divCell">
                      {{ detail.type=='normal' 
                        ? ($t(detail.targets_info[0].game) + '-' + $t(detail.targets_info[0].play)) 
                        : '-' }}
                    </div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">投注內容</div>
                    <div class="divCell">
                      <section v-for="(target, index) in detail.targets_info" :key="index">
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
                    </div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">投注金額</div>
                    <div class="divCell">{{ detail.cash | currency }}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">輸贏結果(含退水)</div>
                    <div class="divCell">
                      <span :class="{[detail.result < 0 || detail.status == 'received' ? 'noneprocessed': 'processed']: true}">
                        {{ detail.status == 'received' ? '未結帳' : $currency(detail.result, 2) }}
                      </span>
                    </div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">退水</div>
                    <div class="divCell">
                      <span class="processed">
                        {{ detail.commission }}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              <!-- outer game -->
              <div class="bet-table-box" v-else>
                <div class="div_body" v-for="detail in details" :key="detail.number">
                  <div class="divRow divtitle">
                    <div class="divHead">注單編號</div>
                    <div class="divCell">
                      {{ detail.number }}<br>{{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}
                    </div>
                  </div>

                  <div class="divRow">
                    <div class="divHead">類型</div>
                    <div class="divCell">{{ detail.game_type ? $t(betDetailType[reportType].gameType[detail.game_type]) : '-' }}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">玩法</div>
                    <div class="divCell">{{ detail.play_type ? $t(betDetailType[reportType].playType[detail.play_type]) : '-' }}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">投注內容</div>
                    <div class="divCell">
                      <section v-if="detail.game_result">
                        <span v-html="detail.game_result"></span>
                        <hr>
                      </section>
                      <span class="color1" v-html="detail.context"></span>
                    </div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">投注金額</div>
                    <div class="divCell">{{ detail.cash | currency }}</div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">輸贏結果(含退水)</div>
                    <div class="divCell">
                      <span :class="{[detail.result < 0 ? 'noneprocessed': 'processed']: true}">
                        {{ $currency(detail.result, 2) }}
                      </span>
                    </div>
                  </div>
                  <div class="divRow">
                    <div class="divHead">退水</div>
                    <div class="divCell">
                      <span class="processed">
                        {{ detail.commission }}
                      </span>
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
import BetDetail from 'src/mixins/Platform/BetDetail'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
	name: 'bet-detail',
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
