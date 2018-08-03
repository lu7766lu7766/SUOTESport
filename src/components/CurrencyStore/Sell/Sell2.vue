<template>
  <section>
    <div class="col-md-12">
      <h1 class="page-title margin-top-clear text-center">託售訂單成立</h1>
      <div class="bonusinfobox">
        <p class="bonusinfo text-center">金額(元)</p>
        <p class="bonusinfo3 text-center">{{ result.p77_por_order_point }}</p>
      </div>
      <div class="space20"></div>
    </div>
    <div class="col-md-12">
      <router-link class="btn submit_btn pointer" :to="{
          name: 'currency-store-sell1'
        }">確 定</router-link>
    </div>
  </section>
</template>

<script>
export default {
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
	}
}
</script>
