<template>
  <div class="page-container member">
    <div class="container">
      <div class="row-no-padding memberbox">
        <div class="col-md-3 flex1 meber-left">
          <div class="meber-top">
            <span></span>
          </div>
          <div class="meber-menu">
            <ul>
              <router-link :to="{ name: 'cash-base-info' }" tag="li" active-class="active" exact>
                <a class="pointer">
                  <i></i> 個人資料</a>
              </router-link>
              <router-link :to="{ name: 'cash-currency-transaction' }" tag="li" active-class="active" exact>
                <a class="pointer">
                  <i></i> 遊戲幣交易</a>
              </router-link>
              <router-link :to="{ name: 'cash-point-transform' }" tag="li" active-class="active" exact>
                <a class="pointer">
                  <i></i> 遊戲幣轉移</a>
              </router-link>
              <router-link :to="{ name: 'cash-bet-detail-report' }" tag="li" active-class="active" exact>
                <a class="pointer">
                  <i></i> 投注明細</a>
              </router-link>
              <router-link :to="{ name: 'cash-point-history' }" tag="li" active-class="active" exact>
                <a class="pointer">
                  <i></i> 點數歷程</a>
              </router-link>
            </ul>
          </div>
        </div>
        <div class="col-md-9 flex2">
          <router-view transition="slide"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
export default {
	name: 'member-center',
	mixins: [CheckLogin]
}
</script>
