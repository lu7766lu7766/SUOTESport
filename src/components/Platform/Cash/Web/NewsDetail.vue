<template>
  <div class="page-container event">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">

          <div class="eventbox2" v-if="data && data.act_title">
            <div class="date">
              {{ $moment(data.act_display_start).Format('Y-m-d H:i') }}
              <span class="event-icon bg3" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</span>
            </div>
            <div class="event-title">{{ data.act_title[lang] }}</div>

            <div class="event-content row">
              <img style="max-width:100%" v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" />
              <span class="col-md-12" v-html="data['act_content'][lang]">
              </span>
            </div>

          </div>
        </div>
      </div>

      <div class="listab sabrosus list_web">
        <ul>
          <router-link tag="li" :to="{ name: 'cash-news'}">
            <a style="width: 150px;">回列表</a>
          </router-link>
        </ul>
        <div class="clear"></div>
      </div>
      <!-- listab -->
    </div>
  </div>
</template>
  
<script>
import NewsDetail from 'src/mixins/Common/News/NewsDetail'
export default {
	mixins: [NewsDetail]
}
</script>

<style lang="stylus" >
.container .eventbox2 .event-content span img
  max-width 100%
</style>
