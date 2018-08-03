<template>
  <div id="wrapper">
    <div class="w-currency" v-for="(data, type) in cProducts">
      <div class="c-line clearfix">
        <div class="cl-wrap c-title">

          <span class="w-icon Recommended">推薦</span>
          <div style="clear:both"></div>
          <div class="c-title-line c-title-head">
            {{ type }}
            <span class="hide">(0)</span>
            <i class=""></i>
          </div>
          <div class="c-title-line c-title-key">
            商品內容含“
            <strong></strong>”
          </div>
          <div style="clear:both"></div>

          <div class="c-title-line">
            <span class="fl-left c-title-item">賣家編號：
              <span>{{ data.seller_no }}</span>
            </span>
            <span class="fl-left c-title-item">保障服務：</span>
            <a href="javascript:;" class="w-icon safe-tag" title="賣家已繳納保證金五萬元">
              <i></i>保證金賣家</a>
            <a href="javascript:;" class="w-icon trade-time" title="賣家承諾：您付款後在 1小時內交貨 給您。超時未交貨，可立即取消交易！">
              <i></i>1小時內交貨
            </a>
          </div>

        </div>
        <div class="points-reward-exchange">
          <div class="cl-wrap c-price">
            <small>$</small>{{ data.point }}</div>
          <div class="cl-wrap c-store">
            <router-link :to="{ name: 'currency-store-buy2', query: {p: data.point, t: type} }">
              購買
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="w-currency">
      <div class="c-line clearfix">
        <div class="cl-wrap c-title">

          <span class="w-icon Recommended">自訂</span>
          <div style="clear:both"></div>
          <div class="c-title-line c-title-head">
            其他購買金額, 請自行輸入
            <span class="R">(此為一次性銀行帳號，1小時內有效)</span>
            <span class="hide">(0)</span>
            <i class=""></i>
          </div>
          <div class="c-title-line c-title-key">
            商品內容含“
            <strong></strong>”
          </div>
          <div style="clear:both"></div>

          <div class="c-title-line">
            <span class="fl-left c-title-item">保障服務：</span>
            <a href="javascript:;" class="w-icon safe-tag" title="賣家已繳納保證金五萬元">
              <i></i>保證金賣家</a>
            <a href="javascript:;" class="w-icon trade-time" title="賣家承諾：您付款後在 1小時內交貨 給您。超時未交貨，可立即取消交易！">
              <i></i>1小時內交貨
            </a>
          </div>

        </div>
        <div class="points-reward-exchange">
          <div class="cl-wrap c-price">
            <small>$</small>
            <input type="text" style="line-height:25px; font-size:25px;" size="7" v-model="myPoint" />
          </div>
          <div class="cl-wrap c-store">
            <a class="pointer" @click="checkCustomPoint()">購買</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MemberLevel from 'src/mixins/Common/MemberLevel'

export default {
	mixins: [MemberLevel],
	data: () => ({
		myPoint: 0
	}),
	methods: {
		checkCustomPoint() {
			if (this.hasMemberLevel) {
				if (this.myPoint < this.memberLevel.p99_mll_buy_min) {
					// 小於最小
					this.$swal(
						`您可購買的遊戲幣範圍${this.memberLevel.p99_mll_buy_min}~
            ${this.memberLevel.p99_mll_buy_max}, 如需購買更多的遊戲幣請洽客服。`
					)
				} else if (this.myPoint > this.memberLevel.p99_mll_buy_max) {
					// 大於最大
					this.$router.push({
						name: 'currency-store-check-account',
						query: {
							p: this.myPoint
						}
					})
				} else {
					// 在範圍內導第三方金流
					this.$router.push({
						name: 'currency-store-buy2',
						query: { p: this.myPoint }
					})
				}
			}
		}
	},
	computed: {
		currencyStore() {
			return this.$store.state.Payment.store
		},
		cProducts() {
			var res = {}
			_.forEach(this.currencyStore.p78_pfc_point_data, (data, type) => {
				if (
					this.hasMemberLevel &&
					data.point >= this.memberLevel.p99_mll_buy_min &&
					data.point <= this.memberLevel.p99_mll_buy_max
				) {
					res[type] = data
				} else if (!this.hasMemberLevel) {
					res = this.currencyStore.p78_pfc_point_data
				}
			})
			return res
		}
	}
}
</script>
