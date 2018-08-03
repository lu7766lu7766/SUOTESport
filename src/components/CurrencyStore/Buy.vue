<template>
  <section>
    <section class="grid-container section points-transfer-landing">
      <div class="points-transfer-landing-intro">
        <h2 class="points-transfer-landing-intro-title">
          {{ title }}
        </h2>
      </div>
      <alert1 :memberLevel="memberLevel" v-if="$route.name == 'currency-store-buy1'" />
      <alert3 v-if="$route.name == 'currency-store-buy3'" />

    </section>
    <div id="content" class="container clearfix">
      <div id="rightContent" class="right-content">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
import MemberLevel from 'src/mixins/Common/MemberLevel'

export default {
	mixins: [MemberLevel],
	data: () => ({
		title: '遊戲幣購買'
	}),
	components: {
		alert1: {
			props: ['memberLevel'],
			template: `
      <div class="alert alert-warning" role="alert">
        新進會員提醒:每日可
        <t class="R">購買3次</t>遊戲幣(
        <t class="R">每次間隔30分鐘，每次上限{{ memberLevel.p99_mll_buy_max }}點 </t>)<br> 【第三方平台儲值，將依會員活耀度放寬購買點數額度限制】
        <br> ※ 若有大額儲值需求，請點下方自訂欄位並輸入欲購買點數索取一次性帳戶。
      </div>
      `
		},
		alert3: {
			template: `
      <div class="alert alert-warning" role="alert">
        因ATM或WebATM,是透過交易平台收購，<br>
        匯款成功後<t class="R">30-60分鐘</t>直接入點，敬請您耐心等候。
      </div>
      `
		}
	},
	created() {
		this.$bus.on('show.title', title => (this.title = title))
	},
	destroyed() {
		this.$bus.off('show.title')
	}
}
</script>

