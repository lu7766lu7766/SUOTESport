<template>
  <section>
    <!-- <div class="login" v-if="!isLogin">
      <router-link class="btn btn-ph" :to="{ name: 'sport-mobile-login' }">{{ $t('login') }}</router-link>
    </div> -->
    <!--header end-->
    <!--banner start-->

    <div id="carousel-example-generic" class="carousel slide carousel-fade" data-ride="carousel">
      <!-- Indicators -->
      <!-- <ol class="carousel-indicators" v-if="news.length">
        <li data-target="#carousel-example-generic" :data-slide-to="i" :class="{active: i == 0}" v-for="(n, i) in news"></li>
      </ol> -->
      <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox" v-if="news.length">
        <div class="item" :class="{'active': index == 0 }" :style="{
            'background-image': `url(${perNews.files_name
              ? $fileHost + perNews.files_folder + '/' + perNews.files_name 
              : '/resource/static/sport-mobile/images/slider/slider1.png'})`
            }" v-for="(perNews, index) in news" :key="index">
          <div class="solgn">
            <div class="slidey-overlay-title">{{ perNews.title }}</div>
            <!-- <p class="slidey-overlay-description">{{ perNews.content }}</p> -->
          </div>
        </div>
      </div>
      <div class="carousel-inner" role="listbox" v-else>
        <div class="item active" :style="{
            'background-image': `url(/resource/static/sport-mobile/images/slider/slider1.png)`
          }">
          <div class="solgn">
            <h3>{{ $t('noMessage') }}</h3>
            <p>{{ $t('noMessage') }}</p>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <!--banner end-->
    <!-- news-box 跑馬燈 -->
    <news-box :content="content" />

    <main class="lobby-container not-scroll">
      <!-- class="lobby-container not-scroll" -->
      <div class="sportbt">
        <ul>
          <li v-for="(sport, index) in orderByHasEvent(sports)" :key="index" v-if="sport && isShowSbl(sport.sbl_code)" :class="{ 
              disabled: count[sport.sbl_guid].count == 0 
            }">
            <a class="bt_p" @click="setSblGuid(sport.sbl_guid)">
              <i v-for="icon in [getSportIcon(sport.sbl_code)]" :key="icon.class" :class="{ [icon.class]: true}"></i>
              {{ $t(sport.sbl_code) }} ({{ count[sport.sbl_guid].count }})
            </a>
          </li>
        </ul>
      </div>
    </main>

  </section>
</template>

<script>
import Menu from 'src/mixins/Sport/Menu'
import Broadcast from 'src/mixins/Sport/News/Broadcast-sport'
import { mapActions, mapState } from 'vuex'

export default {
	mixins: [Menu, Broadcast],
	data: () => ({
		sourceNews: []
	}),
	methods: {
		...mapActions(['getNewsContent']),
		async onGetContents() {
			// 置頂貼文
			if (!(this.newsCategorys && this.newsCategorys.length)) return
			var res = await this.getNewsContent({
				category: this.newsCategorys[0].acy_guid,
				bch_guid: [this.branch.p32_bch_guid],
				act_bulletin: 1,
				is_top: 1
			})
			if (res.code === 0) {
				this.sourceNews = res.data.data
				this.$nextTick(() => {
					$('.carousel').carousel()
				})
			}
		},
		setSblGuid(guid) {
			if (this.count[guid].count) {
				this.$bus.emit('set.sblGuid', guid)
			}
		}
	},
	computed: {
		...mapState({
			newsCategorys: state => state.News.categorys
		}),
		news() {
			// sport news-slidey 邏輯一致
			let res = []
			_.forEach(this.sourceNews, perNews => {
				res.push({
					title: perNews.act_title[this.$i18n.locale()],
					content: perNews.act_content[this.$i18n.locale()],
					files_folder: perNews.files_folder,
					files_name: perNews.files_name,
					id: perNews.act_id
				})
			})
			return res
		}
	},
	mounted() {
		this.$bus.emit('show.footer')
		this.$dataTick(() => {
			this.onGetContents()
		})
	}
}
</script>

<style lang="stylus" scoped>
.sportbt ul li a
  width 95%
  padding-bottom 95%
  height 0

.slidey-overlay-description
  position relative
  line-height 1.5em
  height 3.1em
  overflow hidden

.slidey-overlay-title
  white-space nowrap
  display inline-block
  overflow hidden
  width 100%
  text-overflow ellipsis
  color #ffd800
  font-size 15px
  margin-top 5px
  margin-bottom 3px
</style>
