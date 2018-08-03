<template>
  <section>
    <div class="reg_title">
      <span>最新公告</span>
    </div>
    <div class="lobby-container page">
      <div class="container">

        <div class="listab sabrosus list_web">
          <ul>
            <router-link tag="li" :to="{ name: 'cash-mobile-news'}">
              <a style="width: 150px;">回列表</a>
            </router-link>
          </ul>
          <div class="clear"></div>
        </div>
        <!-- listab -->
        <div class="row">
          <div class="col-md-10 col-md-offset-1">

            <div class="eventbox2" v-if="data.act_title">
              <div class="date">
                {{ $moment(data.act_display_start).Format('Y-m-d H:i') }}
                <span class="event-icon bg3" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</span>
              </div>
              <div class="event-title">{{ data.act_title[lang] }}</div>

              <div class="event-content">
                <img v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" />
                <span class="event news-content" v-html="data.act_content[lang]">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import NewsDetail from 'src/mixins/Common/News/NewsDetail'
export default {
	name: 'news-detail',
	mixins: [NewsDetail]
}
</script>

<style lang="stylus" scoped>
.news-content
  word-wrap break-word
  word-break normal
  display block
</style>

<style>
.eventbox2 img {
	width: 100%;
}
.news-content iframe {
	width: 100%;
	height: 100%;
}
</style>
