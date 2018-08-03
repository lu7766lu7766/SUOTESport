<template>
  <section>
    <div class="banner-money">
      <div class="row">
        <div class="title">
          <h1>錢包資訊</h1>
          <span>Wallet</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row content">
        <div class="wallet-group" v-for="(point, code) in walletData">
          <div class="wallet-title">
            <span class="wallet-item">
              <span class="fa-2x" :class="{ [getGameClass(code)]: true }"></span> {{ $t(code) }}</span>
            <span class="wallet-quota">額度</span>
          </div>
          <div class="wallet-money">{{ point | currency(2) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Wallet from 'src/mixins/Platform/Wallet'
import CheckGame from 'src/mixins/Platform/CheckGame'

export default {
	mixins: [Wallet, CheckGame]
}
</script>