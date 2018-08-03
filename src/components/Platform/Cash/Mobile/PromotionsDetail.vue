<template>
  <section>
    <div class="reg_title">
      <span>優惠活動</span>
    </div>
    <promotion-modal :propPromotion="promotion" v-if="isLogin" />
    <div class="lobby-container page">
      <div class="container">
        <div class="listab sabrosus list_web">
          <ul>
            <router-link tag="li" :to="{ name: 'cash-mobile-promotions'}">
              <a style="width: 150px;">回列表</a>
            </router-link>
          </ul>
          <div class="clear"></div>
        </div>
        <!-- listab -->
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <div class="activebox2">
              <div class="date">
                {{ $moment(promotion.start).Format('Y-m-d H:i') }} - {{ $moment(promotion.end).Format('Y-m-d H:i') }}
              </div>
              <div class="event-title">{{ promotion.name }}</div>
              <span v-if="canJoin" class="event-add">
                <a @click="showPromotionModal()">{{ btnName }}</a>
              </span>
              <div class="event-content">
                <p><img v-if="promotion.file" :src="$fileHost + promotion.file.folder + '/' + promotion.file.name" /></p>
                <span v-html="promotion.content"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>
  
<script>
import Promotions from 'src/mixins/Platform/Promotions'

export default {
	mixins: [Promotions],
	components: {
		PromotionModal: require('@/Platform/Cash/shared/PromotionModal')
	},
	mounted() {
		this.onGetPromotionDetail()
	}
}
</script>
  
<style scoped>

</style>