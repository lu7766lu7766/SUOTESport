<template>
  <form class="col-md-10 col-md-offset-1 form-horizontal member_form">
    <div class="member_title clearfix">
      <span>遊戲幣交易</span>
    </div>
    <div class="wizard">

      <form role="form">
        <div class="tab-content">
          <div class="tab-pane active" role="tabpanel" id="step1">
            <h1 class="page-title margin-top-clear">選擇幣商</h1>

            <div class="form-group">
              <div class="row clearfix">
                <div class="col-md-12">
                  <router-link class="stor-banner" :to="{ name: 'cash-point-transform' }">
                    <img class="img-responsive" src="/resource/static/platform-cash/images/banner.png" alt="">
                  </router-link>
                </div>
              </div>
              <form class="form-horizontal" role="form">
                <div clasvs="row clearfix">
                  <div style="padding-bottom: 15px;" class="col-md-4 col-xs-12" v-for="store in currencyStores">
                    <a class="coinbt" v-if="hasPassBank" @click="openCurrencyStoreLink(store.p78_pfc_guid)">
                      <img src="/resource/static/platform-cash/images/currency.jpg" class="img-responsive img-radio">
                      <span>{{ store.p78_pfc_name }}</span>
                    </a>
                    <a class="coinbt" v-else @click="hasNoBank2BaseInfo({ name: 'cash-base-info' })">
                      <img src="/resource/static/platform-cash/images/currency.jpg" class="img-responsive img-radio">
                      <span>{{ store.p78_pfc_name }}</span>
                    </a>
                  </div>
                </div>
              </form>

            </div>
            <div class="form-group">
              <label for="code" class="col-md-2 col-md-offset-1 control-label"></label>
              <div class="col-md-9 meber-impt">
                <p class="imp">注意事項：</p>
                <span class="upload-info">
                  1. 皇璽會娛樂城僅提供娛樂性質，禁止兌換現金。
                  <br> 2. 遊戲幣收購及託售請至以上配合平台進行交易。
                </span>
              </div>
            </div>
            <div class="space20"></div>

          </div>
        </div>
      </form>
    </div>

  </form>
</template>

<script>
import CurrencyStore from 'src/mixins/Platform/Payment/CurrencyTransaction'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'

export default {
	mixins: [CurrencyStore, CheckLogin]
}
</script>