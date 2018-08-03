<template>
  <section>
    <div class="title">
      <h2>錢包資訊</h2>
    </div>
    <div class="content">
      <div class="wallet-group" v-for="(point, code) in walletData">
        <div class="wallet-title">
          <span class="wallet-item">
            <span class="fa-2x" :class="{ [getGameClass(code)]: true }"></span> {{ $t(code) }}</span>
          <span class="wallet-quota">額度</span>
        </div>
        <div class="wallet-money">{{ point | currency(2) }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import Wallet from 'src/mixins/Platform/Wallet'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import CheckGame from 'src/mixins/Platform/CheckGame'

export default {
	mixins: [Wallet, CheckLogin, CheckGame]
}
</script>

<style scoped>

</style>