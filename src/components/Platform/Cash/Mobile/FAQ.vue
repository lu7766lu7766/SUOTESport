<template>
	<section>
		<div class="reg_title">
			<span>常見問題</span>
		</div>
		<div class="lobby-container page">
			<div class="container-fluid">
				<div id="custom_carousel" class="carousel slide">
					<div class="controls">
						<select class="form-control2 form-control3 my-style" @change="onCategoryChange($event.target.value)">
							<option value="">全部</option>
							<option v-for="(category, index) in FAQCategorys" :value="category.id">
								{{ category.title[lang] }}
							</option>
						</select>
					</div>
					<!-- Wrapper for slides -->
					<div class="carousel-inner newsnn">
						<div class="item active">
							<div id="qaContent">
								<ul class="accordionPart">
									<li v-for="(content, index) in FAQContents">
										<div class="qa_title">{{ content.title[lang] }}</div>
										<div class="qa_content" style="display: none;">
											<span v-html="content.content[lang]"></span>
										</div>
									</li>
								</ul>
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
import FAQ from 'src/mixins/Platform/FAQ'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
	mixins: [FAQ, MobilePager],
	components: {
		MyPager: require('@/Platform/Cash/Mobile/shared/MyPager')
	},
	methods: {
		jqInit() {
			$(function() {
				$('#qaContent ul')
					.addClass('accordionPart')
					.find('li div:nth-child(1)')
					.hover(
						function() {
							$(this).addClass('qa_title_on')
						},
						function() {
							$(this).removeClass('qa_title_on')
						}
					)
					.click(function() {
						var $qa_content = $(this).next('div.qa_content')
						if (!$qa_content.is(':visible')) {
							$('#qaContent ul li div.qa_content:visible').slideUp()
						}
						$qa_content.slideToggle()
					})
					.siblings()
					.hide()
			})
		}
	},
	watch: {
		FAQContents() {
			this.$nextTick(this.jqInit)
		}
	},
	mounted() {
		this.$bus.on('scroll.bottom', () => {
			this.onScrollBottom(async () => {
				var datas = _.cloneDeep(this.FAQContents)
				await this.onGetFAQContestList()
				this.FAQContents = _.concat(datas, this.FAQContents)
			})
		})
	},
	destroyed() {
		this.$bus.off('scroll.bottom')
	}
}
</script>

<style lang="stylus" scoped>
.qa-content
	word-wrap break-word
	word-break normal
	display block
</style>
