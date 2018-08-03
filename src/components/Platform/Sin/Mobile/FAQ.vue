<template>
	<section>
		<div class="title">
			<h2>常見問題</h2>
		</div>
		<div class="content">
			<div class="tabs-title">
				<div class="controls">
					<select class="form-control2 form-control3" @change="onCategoryChange($event.target.value)">
						<option value="">全部</option>
						<option v-for="(category,index) in FAQCategorys" :value="category.id">{{ category.title[lang] }}</option>

					</select>
				</div>
			</div>
			<div class="tab-content">
				<div class="qa-content tab-pane fade in active">
					<div id="accordion" class="accordion-style1 panel-group" v-for="(content, index) in FAQContents">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h4 class="panel-title">
									<a class="accordion-toggle" @click="messageToggle(index)" data-parent="#accordion" data-toggle="collapse">
										<i class="icon-angle-down bigger-110" data-icon-show="icon-angle-right" data-icon-hide="icon-angle-down"></i>
										<p>Q :</p>
										<h3>{{ content.title[lang] }}</h3>
									</a>
								</h4>
							</div>
							<div :ref="'list' + index" class="panel-collapse collapse qa-page">
								<div class="panel-body f03">
									<p class="qa-answer">A :</p>
									<span v-html="content.content[lang]"></span>
								</div>
							</div>
						</div>
						<!-- <div id="qaContent">
							<ul class="accordionPart">
								<li v-for="(content, index) in FAQContents">
									<div class="qa_title">{{ content.title[lang] }}</div>
									<div class="qa_content" style="display: none;">
										<span v-html="content.content[lang]"></span>
									</div>
								</li>
							</ul>
						</div> -->
					</div>
					<!-- End Item -->
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import FAQ from 'src/mixins/Platform/FAQ'
export default {
	mixins: [FAQ],
	components: {
		MyPager: require('@/Platform/Cash/Mobile/shared/MyPager')
	},
	methods: {
		jqInit() {
			$('#qaContent ul')
				.addClass('accordionPart')
				.find('li div:nth-child(1)')
				.addClass('qa_title')
				.hover(
					function() {
						$(this).addClass('qa_title_on')
					},
					function() {
						$(this).removeClass('qa_title_on')
					}
				)
				.click(function() {
					// 當點到標題時，若答案是隱藏時則顯示它，同時隱藏其它已經展開的項目
					// 反之則隱藏
					var $qa_content = $(this).next('div.qa_content')
					if (!$qa_content.is(':visible')) {
						$('#qaContent ul li div.qa_content:visible').slideUp()
					}
					$qa_content.slideToggle()
				})
				.siblings()
				.addClass('qa_content')
				.hide()
		},
		messageToggle(index) {
			$(this.$refs['list' + index]).collapse('toggle')
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
.panel-group .panel
	border 1px solid

.panel-body
	padding 5px 15px !important
</style>
