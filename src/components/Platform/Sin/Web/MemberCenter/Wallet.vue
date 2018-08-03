<template>
  <section>
    <div class="pageslide event">
      <div class="container">
        <div class="p-title">
          會員中心
          <span>MEMBER CENTER</span>
        </div>

      </div>
    </div>
    <!--banner end-->
    <div class="breadcrumb-bg">
      <div class="container">
        <ol class="breadcrumb">
          <li>
            <router-link :to="{name: 'sin-mobile-index'}">首頁</router-link>
          </li>
          <li>會員中心</li>
        </ol>
      </div>
    </div>
    <div class="page-container member">
      <div class="container">
        <div class="row-no-padding memberbox">
          <my-menu></my-menu>
          <div class="col-md-9 flex2">
            <form class="col-md-10 col-md-offset-1 form-horizontal member_form">
              <div class="member_title clearfix">
                <span>錢包資訊</span>
              </div>
              <div class="row content">
                <div class="wallet-group" v-for="(point, code) in walletData">
                  <div class="wallet-title">
                    <span class="wallet-item">
                      <span class="fa-1x" :class="{ [getGameClass(code)]: true }"></span> {{ $t(code) }}</span>
                    <span class="wallet-quota">額度</span>
                  </div>
                  <div class="wallet-money">{{ point | currency(2) }}</div>
                </div>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import Wallet from 'src/mixins/Platform/Wallet'

export default {
	mixins: [Wallet],
	components: {
		MyMenu: require('@/Platform/Sin/Web/MemberCenter/shared/Menu')
	}
}
</script>