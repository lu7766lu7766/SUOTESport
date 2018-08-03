<template>
  <section>
    <div class="yeb-side-top">
      <router-link class="link1" :to="{ name: 'cash-yebpay'}">
        <h2>目前利率
          <b style="font-size:18px;color:#ffcb0a">100%</b>
        </h2>
      </router-link>
      <div class="yeb-side-box">
        <div class="yeb-side-box-1">
          <h3>時間</h3>
          <div class="odometer-box">{{showTime}}</div>
        </div>
        <div class="yeb-side-box-1">
          <h3>您的
            <b>利息</b>金額</h3>
          <div class="odometer-box">{{income.toFixed(8)}}
            <span>點</span>
          </div>
        </div>
        <div class="yeb-side-box-1">
          <h3>您的
            <b>本金</b>金額</h3>
          <div class="odometer-box">{{wallet | currency}}
            <span>點</span>
          </div>
        </div>
      </div>
      <router-link class="link2" :to="{name: 'cash-point-transform'}">
        <h2>
          <span><img src="/resource/static/platform-cash/images/paygo.png" alt=""></span>
        </h2>
      </router-link>
    </div>
  </section>
</template>

<script>
import Yebpay from 'src/mixins/Platform/Yebpay'

export default {
	name: '',
	mixins: [Yebpay],
	methods: {
		async boxMounted() {
			await this.setMounted()
			if (this.income > 0 && this.wallet > 0) {
				this.calTime = setInterval(this.addCalculateTime, 1000)
			}
		}
	},
	async mounted() {
		this.boxMounted()

		this.$bus.on('TAMBTCange', data => {
      console.log('test')
			clearInterval(this.calTime)
			this.boxMounted()
		})
	},
	beforeDestroy: function() {
		this.$bus.$off('TAMBTCange')
	}
}
</script>

<style scoped>
.yeb-side-top {
	z-index: 1000;
}
</style>
