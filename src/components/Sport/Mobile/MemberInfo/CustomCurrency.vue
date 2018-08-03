<template>
  <section>
    <div class="page_title">
      <a class="back" @click="$router.go(-1)"></a>
      <span>{{ $t('customChips') }}</span>
    </div>
    <main class="page-container currencysetting">
      <div class="container">
        <div class="clearfix">

          <div class="member_content currency">
            <div class="alert alert-currency" style="margin-left:1%;margin-right:1%;">
              <strong>
                <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
              </strong> {{ $t('label.customCurrencyTitle') }}
            </div>
            <button type="button" class="btn submit_btn" @click="submit()">{{ $t('enter') }}</button>
            <label for="code" class="col-md-2 col-md-offset-1 control-label"></label>
            <div class="form-group">
              <span v-for="(temp, index) in currencyTemp" :key="index">
                <input type="checkbox" name="radio" :id="'radio-'+(index+1)" v-model="datas" :value="{ 
                    name: temp.name, value: temp.value 
                  }" :disabled="datas.length >= currencyMax && !datas.find(data => data.name == temp.name)">
                <label :title="$currency(temp.value)" :for="'radio-'+(index+1)">
                  <img :src="temp.src" alt="">
                  <span>{{ $currency(temp.value) }}</span>
                </label>
              </span>

            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import CustomCurrency from 'src/mixins/Sport/CustomCurrency'
//sport & sport-mobile 版型分開，要改記得改兩邊
export default {
	mixins: [CustomCurrency],
	mounted() {
		this.$bus.emit('hide.footer')
	}
}
</script>
