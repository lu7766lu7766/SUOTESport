<template>
  <section>
    <div id="content" class="container clearfix">
      <div id="rightContent" class="right-content">

        <div id="wrapper">
          <div class="w-currency">
            <div class="c-line clearfix">
              <div class="cl-wrap c-full">
                <div id="hl-common" class="clearfix" style="display: block;">
                  <div class="col-md-12">

                    <!-- page-title start -->
                    <!-- ================ -->
                    <h1 class="page-title margin-top-clear text-center">購買訂單成立</h1>
                    <!-- page-title end -->
                    <section v-if="result.order">
                      <section v-for="(info, key) in [result.order.payment_flow.p78_pfi_info]" :key="key">

                        <!-- ATM -->
                        <section v-if="info.ChoosePayment === paymentType.ATM">
                          <h1 class="page-title2 margin-top-clear text-center">您此次ATM轉帳的資訊如下</h1>
                          <div class="bonusinfobox">
                            <p class="bonusinfo text-center">銀行名稱</p>
                            <p class="bonusinfo4 text-center">{{ $t(info.ChooseSubPayment) }}</p>
                          </div>
                          <div class="bonusinfobox">
                            <p class="bonusinfo text-center">銀行代碼</p>
                            <p class="bonusinfo4 text-center">{{ info.BankCode }}</p>
                          </div>
                          <div class="bonusinfobox">
                            <p class="bonusinfo text-center">銀行帳號</p>
                            <p class="bonusinfo4 text-center">{{ info.vAccount }}</p>
                          </div>
                          <div class="bonusinfobox">
                            <p class="bonusinfo text-center">金額(元)</p>
                            <p class="bonusinfo4 text-center">{{ info.TotalAmount }}</p>
                          </div>
                          <div class="space20"></div>
                          <p class="bonusinfo text-center">截止日期:{{ info.ExpireDate }}</p>
                          <p class="bonusinfo text-center">交易序號:{{ result.order.payment_flow.p78_pfi_trade_number }}</p>
                        </section>

                        <!-- 超商 -->
                        <section v-if="info.ChoosePayment === paymentType.CVS">
                          <p class="page-title2 margin-top-clear text-center">您此次超商繳費的資訊如下</p>
                          <div class="bonusinfobox">
                            <p class="bonusinfo text-center">{{ $t(paymentMethod[paymentType.CVS][info.PaymentType]) }}</p>
                            <p class="bonusinfo4 text-center">繳費代碼:{{ info.PaymentNo }}</p>
                          </div>
                          <div class="bonusinfobox">
                            <p class="bonusinfo text-center">金額(元)</p>
                            <p class="bonusinfo4 text-center">{{ info.TotalAmount }}</p>
                          </div>
                          <div class="space20"></div>
                          <p class="bonusinfo text-center">截止時間:{{ info.ExpireDate }}</p>
                          <p class="bonusinfo text-center">交易序號:{{ result.order.payment_flow.p78_pfi_trade_number }}</p>
                        </section>

                        <!-- 信用卡 -->
                        <section v-if="info.ChoosePayment === paymentType.Credit">
                          <p class="bonusinfo text-center">您此次信用卡繳費的資訊如下</p>
                          <div class="bonusinfobox">
                            <p class="bonusinfo text-center">金額(元)</p>
                            <p class="bonusinfo4 text-center">{{ info.TotalAmount }}</p>
                          </div>
                        </section>

                        <!-- 網路ATM -->
                        <section v-if="info.ChoosePayment === paymentType.WebATM">
                          <h1 class="page-title2 margin-top-clear text-center">您此次網路ATM轉帳的資訊如下</h1>
                          <div class="bonusinfobox">
                            <p class="bonusinfo text-center">金額(元)</p>
                            <p class="bonusinfo4 text-center">{{ info.TotalAmount }}</p>
                          </div>
                        </section>

                      </section>
                    </section>
                  </div>
                  <router-link class="btn submit_btn pointer" :to="{
                      name: 'currency-store-buy1'
                    }">確 定</router-link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PaymentConf from 'src/config/PaymentConf'
export default {
	data: () => ({
		paymentType: PaymentConf.payment_type,
		paymentMethod: PaymentConf.payment_method
	}),
	methods: {
		closeWindow() {
			window.close()
			console.app('CompletePayment')
		}
	},
	computed: {
		result() {
			return this.$store.state.Payment.result
		}
	},
	created() {
		this.$bus.emit('show.title', '購買訂單')
	}
}
</script>

<style lang="stylus" scoped>
.btn.submit_btn
  display inline-block
</style>
