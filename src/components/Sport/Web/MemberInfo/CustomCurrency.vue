<template>
  <section>
    <div class="member_content">
      <div class="alert alert-currency" style="margin-left:5px;margin-right:5px;">
        <strong>
          <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
        </strong> {{ $t('label.customCurrencyTitle') }}
      </div>
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

    <div class="form-group2">
      <div class="row">
        <div class="col-md-18 text-center">
          <a class="btn btn-ok" href="#" role="button" @click="submit()">{{ $t('enter') }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CustomCurrency from 'src/mixins/Sport/CustomCurrency'

export default {
	mixins: [CustomCurrency]
}
</script>

<style lang="stylus" scoped>
.control-label
  text-align right
</style>
