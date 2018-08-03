<template>
  <div class="page-container event">

    <div class="container">
      <div class="tab_box">
        <ul class="tab_list">
          <li>
            <a :class="{'select': '' == currentCategoryGuid}" class="pointer" @click="categoryChange('')">全部</a>
          </li>
          <li v-for="category in newsCategorys">
            <a :class="{'select': category.acy_guid == currentCategoryGuid}" class="pointer" @click="categoryChange(category.acy_guid)">
              {{ category['acy_name'][lang] }}
            </a>
          </li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <ul>
            <li v-for="(data, i) in datas">
              <router-link class="eventbox" :class="{ 'top-hot': data.act_top }" data-top="TOP" :to="{ 
                name: 'cash-news-detail',
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
      <!-- listab -->
      <div class="row">
        <my-pager :page="page" :lastPage="lastPage" @change="pageChg" />
      </div>
    </div>
  </div>
</template>

<script>
import News from 'src/mixins/Platform/News/News-platform'

export default {
	name: 'event',
	mixins: [News],
	components: {
		MyPager: require('@/Platform/Cash/Web/shared/MyPager')
	}
}
</script>
