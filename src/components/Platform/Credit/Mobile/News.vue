<template>
  <section>
    <div class="title">
      <h2>最新公告</h2>
    </div>
    <div class="news-content">
      <div class="col-sm-3 nav-container">
        <div class="form-group">
          <div class="arrow-select">
            <img src="/resource/static/platform-credit-mobile/img/arrow_select.png">
          </div>
          <select class="form-control nav my-style" @change="categoryChange($event.target.value)">
            <option value="">全部</option>
            <option v-for="item in newsCategorys" :value="item.acy_guid">{{ item.acy_name[lang] }}</option>
          </select>
        </div>
      </div>
      <div class="col-sm-9">
        <div class="offer-box-content" id="tab1">
          <div class="offer-box" :class="{'offer-box-top': data.act_top === 1}" v-for="data in datas">
            <div v-if="data.act_top === 1" class="top-box">TOP</div>
            <ul>
              <li class="font-gold">
                <div class="news-category" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</div>
              </li>
              <li class="font-gray01">
                <div class="news-rd">{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}</div>
              </li>
            </ul>
            <div class="offer-title">
              <router-link :to="{ name: 'credit-mobile-news-detail', params: { nGuid: data.act_guid } }">
                <h3 class="JQellipsis">
                  <span class="font-white JQellipsis">{{ data.act_title[lang] }}</span>
                </h3>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>
  
<script>
import News from 'src/mixins/Platform/News/News-platform'
import MobilePager from 'src/mixins/Common/MobilePager'
import { mapState, mapActions } from 'vuex'
import { NewsType } from 'src/store/module/news'

export default {
	mixins: [News, MobilePager],
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

<style lang="stylus" scoped>
.offer-title
  text-align left
</style>
