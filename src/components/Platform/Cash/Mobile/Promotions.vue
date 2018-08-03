<template>
  <section>
    <div class="reg_title">
      <span>優惠活動</span>
    </div>
    <div class="lobby-container page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <ul>
              <li v-for="(data, i) in datas">
                <router-link :to="{ name: 'cash-mobile-promotions-detail', params: { nID: data.id } }" class="activebox">
                  <div class="date">
                    {{ $moment(data.start).Format('Y-m-d H:i') }} ~ {{ $moment(data.end).Format('Y-m-d H:i') }}
                  </div>
                  <div class="event-title">{{data['name']}}</div>
                  <p>
                    <img v-if="data.file" :src="$fileHost + data.file.folder + '/' + data.file.name" alt="">
                    <img v-else src="/resource/static/platform-cash-mobile/images/active/activead1.jpg" alt="">
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- End Item -->
        </div>
        <!-- End Carousel Inner -->
      </div>
      <!-- End Carousel -->
    </div>
  </section>
</template>
  
<script>
import Promotions from 'src/mixins/Platform/Promotions'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
	mixins: [Promotions, MobilePager],
	mounted() {
		this.onGetPromotionAndPager()
		this.$bus.on('scroll.bottom', () => {
			this.onScrollBottom(async () => {
				var datas = _.cloneDeep(this.datas)
				await this.myGetPromotions()
				this.datas = _.concat(datas, this.datas)
			})
		})
	},
	destroyed() {
		this.$bus.off('scroll.bottom')
	}
}
</script>
  
  <style scoped>

</style>
