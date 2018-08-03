<template>
  <div class="page-container event">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <ul>
            <li v-for="(data, i) in datas">
              <router-link :to="{ name: 'cash-promotions-detail', params: { nID: data.id } }" class="activebox">
                <div class="listimg">
                  <img v-if="data.file" :src="$fileHost + data.file.folder + '/' + data.file.name" alt="">
                  <img v-else src="/resource/static/platform-cash/images/active/activead1.jpg" alt="">
                </div>
                <div class="listtext">
                  <div class="date">
                    {{ $moment(data.start).Format('Y-m-d H:i') }} ~ {{ $moment(data.end).Format('Y-m-d H:i') }}
                  </div>
                  <div class="event-title">{{ data['name'] }}</div>
                  <div class="event-more">
                    <span>了解詳請</span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- listab -->
      <my-pager :total="total" :lastPage="lastPage" :page="page" @change="pageChg" />
    </div>
  </div>
</template>

<script>
import Promotions from 'src/mixins/Platform/Promotions'

export default {
	name: '',
	mixins: [Promotions],
	components: {
		MyPager: require('@/Platform/Cash/Web/shared/MyPager')
	},
	mounted() {
		this.onGetPromotionAndPager()
	}
}
</script>

<style scoped>

</style>
