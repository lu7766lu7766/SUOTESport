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
                    <!-- page-title end -->
                    <div class="bonusinfobox">
                      <h1 class="page-title2 margin-top-clear text-center">您可儲值一次性帳戶,
                        <span class="R2">儲值完畢請洽客服</span>
                      </h1>
                      <h1 class="page-title2 margin-top-clear text-center">並且
                        <span class="R2">提供購買金額與帳戶後五碼, 以利核對</span>
                      </h1>
                    </div>
                    <div class="bonusinfobox">
                      <p class="bonusinfo text-center">銀行代碼：</p>
                      <p class="bonusinfo4 text-center">{{ getBankName(paymentBank.BankCode) }} ({{ paymentBank.BankCode }})</p>
                    </div>
                    <div class="bonusinfobox">
                      <p class="bonusinfo text-center">銀行帳號：</p>
                      <p class="bonusinfo4 text-center">{{ paymentBank.BankNumber }}</p>
                    </div>
                    <div class="bonusinfobox">
                      <p class="bonusinfo text-center">銀行戶名：</p>
                      <p class="bonusinfo4 text-center">{{ paymentBank.BankName }}</p>
                    </div>
                    <div class="bonusinfobox">
                      <p class="bonusinfo text-center">金額：</p>
                      <p class="bonusinfo4 text-center">{{ paymentBank.TotalAmount }}</p>
                    </div>
                    <div class="space20"></div>
                    <p class="bonusinfo-imp text-center">注意：請務必使用「綁定」的銀行進行存款，否則將無法轉換點數</p>
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
import { mapState } from 'vuex'
import Bank from 'src/mixins/Platform/Bank'

export default {
	name: '',
	mixins: [Bank],
	computed: {
		...mapState({
			paymentBank: state => state.Payment.paymentBank
		})
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
