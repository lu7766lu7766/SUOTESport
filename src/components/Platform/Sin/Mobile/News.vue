<template>
  <section>
    <div class="title">
      <h2>最新公告</h2>
    </div>
    <div class="content">
      <div class="tabs-title">
        <div class="controls">
          <select class="form-control2 form-control3" @change="categoryChange($event.target.value)">
            <option value="">全部</option>
            <option v-for="item in newsCategorys" :value="item.acy_guid">{{ item.acy_name[lang] }}</option>
          </select>
        </div>
      </div>
      <div class="offer-box" :class="{'offer-box-top': data.act_top === 1}" v-for="data in datas">
        <div v-if="data.act_top === 1" class="top-box">TOP</div>
        <ul>
          <li class="font-gold" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</li>
          <li class="font-gray01">{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}</li>
        </ul>
        <div class="offer-title">
          <router-link :to="{ name: 'sin-mobile-news-detail', params: { nGuid: data.act_guid } }">
            <h3>
              <span class="font-white">{{ data.act_title[lang] }}</span>
            </h3>
          </router-link>
        </div>
      </div>

    </div>
  </section>
</template>
  
<script>
import News from 'src/mixins/Platform/News/News-platform'
import { mapState, mapActions } from 'vuex'
import { NewsType } from 'src/store/module/news'

export default {
	mixins: [News],
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
