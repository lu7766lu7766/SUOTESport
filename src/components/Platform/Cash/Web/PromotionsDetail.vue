<template>
  <section>
    <promotion-modal :propPromotion="promotion" v-if="isLogin" />
    <div class="page-container event">
      <div class="container">
        <!-- listab -->
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <div class="activebox2">
              <div class="date">
                {{ $moment(promotion.start).Format('Y-m-d H:i') }} ~ {{ $moment(promotion.end).Format('Y-m-d H:i') }}
              </div>
              <div class="event-title">{{ promotion.name }}</div>
              <span v-if="canJoin" class="event-add">
                <a @click="showPromotionModal()" class="pointer">{{ btnName }}</a>
              </span>
              <div class="event-content">
                <p><img style="max-width:100%" v-if="promotion.file" :src="$fileHost + promotion.file.folder + '/' + promotion.file.name" /></p>
                <span v-html="promotion.content"></span>
              </div>
            </div>
          </div>
          <div class="listab sabrosus list_web">
            <ul>
              <router-link class="disabled" tag="li" :to="{ name: 'cash-promotions'}">
                <a style="width: 150px;">回列表</a>
              </router-link>
            </ul>
            <div class="clear"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import Promotion from 'src/mixins/Platform/Promotions'

export default {
	mixins: [Promotion],
	components: {
		PromotionModal: require('@/Platform/Cash/shared/PromotionModal')
	},
	mounted() {
		this.onGetPromotionDetail()
	}
}
</script>

<style lang="stylus" >
.container .activebox2 .event-content span img
  max-width 100%
</style>
