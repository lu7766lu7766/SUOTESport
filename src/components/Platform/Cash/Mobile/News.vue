<template>
  <section>
    <div class="reg_title">
      <span>最新公告</span>
    </div>
    <div class="lobby-container page">
      <div class="container-fluid">
        <div id="custom_carousel" class="carousel slide">
          <div class="controls">
            <select class="form-control2 form-control3 my-style" @change="categoryChange($event.target.value)">
              <option value="">全部</option>
              <option v-for="category in newsCategorys" :value="category.acy_guid">
                {{ category['acy_name'][lang] }}
              </option>
            </select>
          </div>
          <!-- Wrapper for slides -->
          <div class="carousel-inner newsnn">
            <div class="item active">
              <div class="row">
                <div class="col-md-10 col-md-offset-1">
                  <ul>
                    <li v-for="(data, i) in datas">
                      <router-link class="eventbox" :class="{ 'top-hot': data.act_top }" data-top="TOP" :to="{ 
                          name: 'cash-mobile-news-detail',
                          params: {
                            nGuid: data.act_guid
                          } 
                        }">
                        <div class="date">
                          {{ $moment(data.act_display_start).Format('Y-m-d H:i') }}
                          <span class="event-icon bg4" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</span>
                        </div>
                        <div class="event-title">{{data['act_title'][lang]}}</div>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <my-pager :page="page" :lastPage="lastPage" @change="pageChg" />
              </div>
            </div>
            <!-- End Item -->
          </div>
          <!-- End Carousel Inner -->
        </div>
        <!-- End Carousel -->
      </div>
    </div>
  </section>

</template>

<script>
import News from 'src/mixins/Platform/News/News-platform'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
	mixins: [News, MobilePager],
	components: {
		MyPager: require('@/Platform/Cash/Mobile/shared/MyPager')
	},
	mounted() {
		this.$bus.on('scroll.bottom', () => {
			this.onScrollBottom(async () => {
				var datas = _.cloneDeep(this.datas)
				await this.getContents()
				this.datas = _.concat(datas, this.datas)
			})
		})
	},
	destroyed() {
		this.$bus.off('scroll.bottom')
	}
}
</script>
