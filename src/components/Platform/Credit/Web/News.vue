<template>
  <section>
    <div class="banner-news">
      <div class="row">
        <div class="title">
          <h1>最新公告</h1>
          <span>News</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="tabs tabs-style-line">
          <nav>
            <ul>
              <li @click="categoryChange('')" :class="{'tab-current': '' == currentCategoryGuid}">
                <a class="pointer">
                  <span>全部</span>
                </a>
              </li>
              <li v-for="category in newsCategorys" :class="{'tab-current': category.acy_guid == currentCategoryGuid}" @click="categoryChange(category.acy_guid)">
                <a class="pointer">
                  <span>{{ category['acy_name'][lang]}}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div class="content">
          <section v-for="(data, i) in datas">
            <div class="col-lg-12" v-if="i > 0">
              <hr class="news-list-line">
            </div>
            <div class="col-lg-12 news-list" :class="{' news-list-top': data.act_top === 1}">
              <div v-if="data.act_top === 1" class="top-box">TOP</div>
              <div class="col-lg-2 col-xs-12">
                <span class="col-md-12 col-xs-6 news-tab" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</span>
              </div>
              <div class="col-lg-10 col-xs-12 news-title">
                <div class="col-md-12 col-xs-12 news-list-date">{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}</div>
                <div class="col-md-12 col-xs-12">
                  <router-link :to="{
                    name: 'credit-news-detail',
                    params: {
                      nGuid: data.act_guid,
                      nCategory: currentCategoryGuid
                    }
                  }" v-html="data['act_title'][lang]"></router-link>
                </div>

              </div>
            </div>
          </section>

          <my-pager :total="total" :lastPage="lastPage" :page="page" @change="pageChg" class="text-center" />
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
