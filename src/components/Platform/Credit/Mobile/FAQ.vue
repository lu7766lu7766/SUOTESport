<template>
	<section>
		<div class="title">
			<h2>常見問題</h2>
		</div>
		<div class="container" v-if="FAQCategorys.length">
			<div class="qa-content">
				<div class="col-sm-3 nav-container">
					<div class="form-group">
						<div class="arrow-select">
							<img src="/resource/static/platform-credit-mobile/img/arrow_select.png">
						</div>
						<select class="form-control nav my-style" @change="onCategoryChange($event.target.value)">
							<option value="">全部</option>
							<option v-for="(category,index) in FAQCategorys" :value="category.id">{{ category.title[lang] }}</option>
						</select>
					</div>
				</div>
				<div class="col-sm-9">
					<div class="tab-pane" id="qatab" v-for="(content, index) in FAQContents">
						<div id="accordion" class="accordion-style1 panel-group">
							<div class="panel panel-default">
								<div class="panel-heading qa-question">
									<div class="panel-title">
										<a class="accordion-toggle" @click="collapse('list' + index)">
											<i class="icon-angle-down bigger-110" data-icon-show="icon-angle-right" data-icon-hide="icon-angle-down"></i>
											<h3>Q :</h3>
											<h4>{{ content.title[lang] }}</h4>
										</a>
									</div>
								</div>
								<div :ref="'list'+index" class="panel-collapse collapse qa-page">
									<div class="panel-body f03">
										<p class="qa-answer">A :</p>
										<span v-html="content.content[lang]"></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import FAQ from 'src/mixins/Platform/FAQ'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
	mixins: [FAQ, MobilePager],
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
