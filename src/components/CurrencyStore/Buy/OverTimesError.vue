<template>
  <section>
    <div id="wrapper">
      <div class="w-currency">
        <div class="c-line clearfix">
          <div class="cl-wrap c-full">
            <div id="hl-common" class="clearfix" style="display: block;">
              <div class="trade">購買訂單失敗</div>
              <br>
              <div class="col-md-10 col-md-offset-1">
                <div class="alert alert-danger" role="alert">
                  <p class="glyphicon glyphicon-exclamation-sign gi-3x" aria-hidden="true"></p>
                  <p style="font-size:14px;">您的收購次數過於頻繁，請至交易紀錄查詢代繳費資訊，或於30分鐘後再進行點數收購。<br>
                    <t class="R">如您有30分鐘內再次儲值需求，可於【自訂】輸入{{ this.memberLevel.p99_mll_buy_max + 1 }}以上金額，即可快速轉帳入點喔！</t>
                  </p>
                </div>
                <br>
                <router-link class="btn submit_btn next-step pointer" :to="{
                    name: 'currency-store-buy1'
                  }">確 定</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </section>
</template>

<script>
import MemberLevel from 'src/mixins/Common/MemberLevel'
export default {
	mixins: [MemberLevel]
}
</script>