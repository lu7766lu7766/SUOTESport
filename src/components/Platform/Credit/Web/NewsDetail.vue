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
		<div class="container">
			<div class="content">
				<div class="return">
					<router-link :to="{ name: 'credit-news' }">
						<span class="icon-return"></span> 回列表
					</router-link>
				</div>
				<div class="col-lg-12 news-list" v-if="data.act_title">
					<div class="col-lg-2 col-xs-12">
						<div class="col-md-12 col-xs-6 news-list-date">{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}</div>
						<div class="col-md-12 col-xs-6 news-tab" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</div>
					</div>
					<div class="col-lg-10 col-xs-12 news-title" v-html="data.act_title[lang]">
					</div>
				</div>
				<div class="col-lg-12">
					<hr class="news-list-line">
				</div>
				<div class="col-lg-12 news-content" v-if="data.act_title">
					<img v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" />
					<br>
					<span v-html="data['act_content'][lang]"></span>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import NewsDetail from 'src/mixins/Common/News/NewsDetail'
export default {
	mixins: [NewsDetail]
}
</script>

<style lang="stylus" scoped>
.news-content
	word-wrap break-word
	word-break normal
	display block

.news-tab
	min-width 80px
	width auto
	max-width 100px
</style>
