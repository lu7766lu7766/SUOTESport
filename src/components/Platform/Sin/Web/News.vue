<template>
  <section>
    <!--banner start-->
    <div class="pageslide event">
      <div class="container">
        <div class="p-title">
          最新公告
          <span>NEWS</span>
        </div>

      </div>
    </div>
    <!--banner end-->
    <div class="breadcrumb-bg">
      <div class="container">
        <ol class="breadcrumb">
          <li>
            <router-link :to="{name: 'sin-index'}">首頁</router-link>
          </li>
          <li>最新公告</li>
        </ol>
      </div>
    </div>

    <div class="container">
      <div class="tab_box">
        <ul class="tab_list">
          <li @click="categoryChange('')">
            <a class="pointer" :class="{'select': '' == currentCategoryGuid}">全部</a>
          </li>
          <li v-for="category in newsCategorys" @click="categoryChange(category.acy_guid)">
            <a class="pointer" :class="{'select': category.acy_guid == currentCategoryGuid}">
              <span>{{ category['acy_name'][lang]}}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <ul>
            <li v-for="(data, i) in datas">
              <router-link class="eventbox" :to="{
                    name: 'sin-news-detail',
                    params: {
                      nGuid: data.act_guid,
                      nCategory: currentCategoryGuid
                    }
                  }">

                <div class=" date ">{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}
                  <span class="event-icon bg4" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</span>
                </div>
                <div class="event-title" v-html="data['act_title'][lang]"></div>

              </router-link>
            </li>
          </ul>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
import news from 'src/mixins/Platform/News/News-platform'

export default {
	mixins: [news]
}
</script>
