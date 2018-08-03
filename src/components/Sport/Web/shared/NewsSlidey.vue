<template>
	<div ref="slidey" style="display:none;">
		<ul v-if="news.length">
			<li v-for="(perNews, i) in news">
				<img v-if="perNews.files_name" :src="$fileHost + perNews.files_folder + '/' + perNews.files_name" />
				<img v-else :src="'/resource/static/sport/images/ad/' + (i % 5 + 1) + '.jpg'" alt="" />
				<router-link tag="p" class="title" :to="{ name: 'sport-news', query: {id:perNews.id, tag: perNews.tag }}">{{ perNews.title }}</router-link>
				<router-link tag="p" class="description" :to="{ name: 'sport-news', query: { id:perNews.id, tag: perNews.tag }}">{{ removeHTMLTag(perNews.content) }}</router-link>
			</li>
		</ul>
		<ul v-else>
			<li>
				<img src="/resource/static/sport/images/ad/1.jpg" alt="" />
				<p class="title">{{ $t('noMessage') }}</p>
				<p class="description">{{ $t('noMessage') }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
import mixins from 'src/mixins'
import { mapState, mapActions } from 'vuex'
// import /resource/static/sport/dist/css/jquery.slidey.min.css'

export default {
	name: 'news-slidey',
	mixins: [mixins],
	data() {
		return {
			$newsSlidey: null,
			$copyNewsSlidey: null,
			sourceNews: [],
			timer: null
		}
	},
	methods: {
		...mapActions(['getNewsContent']),
		jqInit() {
			const listCount = this.isMobile ? 3 : 4
			this.$copyNewsSlidey.slidey({
				interval: 13000,
				listCount,
				showList: this.news.length > 0
			})
			$('.slidey-list-description').dotdotdot()
			if (this.sourceNews.length) {
				this.$copyNewsSlidey
					.find('.slidey-overlay')
					.addClass('pointer')
					.on('click', () => {
						// 點選直接連結到news頁
						this.$router.push({
							name: 'sport-news',
							query: {
								id: this.sourceNews[$('.slidey-active').index()].act_id,
								tag: this.sourceNews[$('.slidey-active').index()].act_atg_guid // 高亮的按鈕的index()
							}
						})
					})
				this.$copyNewsSlidey.find('.slidey-list-description').css({ width: '100%', 'padding-right': '10px' })
				$.each(this.$copyNewsSlidey.find('.slidey-list-title'), (i, td) => {
					var $td = $(td)
					$td.html(`<div style="overflow: hidden; height: 31px">${$td.html()}</div>`)
				})
			}
			this.checkOverflow()
		},
		jqReset() {
			this.jqDestory()
			$('.cloneNewsSlidey').remove()
			this.$copyNewsSlidey = this.$newsSlidey.clone().insertAfter(this.$newsSlidey)
			this.$copyNewsSlidey[0].className = 'cloneNewsSlidey'
			this.jqInit()
		},
		jqDestory() {
			if (this.$copyNewsSlidey) {
				this.$copyNewsSlidey.find('.slidey-overlay').off('click') // 移除偵聽
			}
			clearInterval(this.timer)
		},
		async getContents() {
			if (!(this.newsCategorys && this.newsCategorys.length)) return
			var res = await this.getNewsContent({
				category: this.newsCategorys[0].acy_guid,
				bch_guid: [this.branch.p32_bch_guid],
				act_bulletin: 1,
				is_top: 1
			})
			if (res.code === 0) {
				this.sourceNews = res.data.data
				this.$emit('update:newsLen', this.sourceNews.length)
			}
		},
		checkOverflow() {
			this.timer = setInterval(() => {
				var $element = this.$copyNewsSlidey.find('.slidey-overlay-description')
				this.isOverflow($element[0]) ? $element.addClass('overflow') : $element.removeClass('overflow')
			}, 150)
		},
		isOverflow(element) {
			return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
		},
		removeHTMLTag(html) {
			return $('<div></div>')
				.html(html)
				.text()
		}
	},
	computed: {
		...mapState({
			newsCategorys: state => state.News.categorys
		}),
		news() {
			// mixins/Common/News/News methods getNewsProccess 部分邏輯一致
			let res = []
			_.forEach(this.sourceNews, perNews => {
				res.push({
					title: perNews.act_title[this.$i18n.locale()],
					content: perNews.act_content[this.$i18n.locale()],
					files_folder: perNews.files_folder,
					files_name: perNews.files_name,
					id: perNews.act_id,
					tag: perNews.act_atg_guid
				})
			})

			this.$nextTick(this.jqReset)
			return res
		}
	},
	created() {
		require('static/script/jquery.slidey.js')
		require('static/script/jquery.dotdotdot.min.js')
		require('static/style/jquery.slidey.min.css')
	},
	async mounted() {
		/** 若再出現 .size() is not function，記得改成.length */
		this.$newsSlidey = $(this.$refs.slidey)
		this.$dataTick(() => {
			this.getContents()
		})
	},
	beforeDestroy() {
		this.jqDestory()
	}
}
</script>

<style lang="stylus">
.slidey-overlay-description
	position relative
	line-height 1.5em
	height 3.4em
	overflow hidden

.cloneNewsSlidey .slidey-row .slidey-overlay .slidey-overlay-description.overflow
	padding-right 8px

.slidey-overlay-description.overflow:after
	content '...'
	position absolute
	bottom 0
	right 0
</style>
