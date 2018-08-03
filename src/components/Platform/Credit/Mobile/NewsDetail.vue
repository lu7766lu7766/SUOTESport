<template>
	<section>
		<div class="title">
			<h2>最新公告</h2>
		</div>
		<div class="news-content">
			<div class="font-back">
				<router-link :to="{ name: 'credit-mobile-news' }">
					<span class="icon-reback"></span> 回列表
				</router-link>
			</div>
			<div class="news-inside" v-if="data.act_title">
				<div class="in-news">
					<div class="news-category" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</div>
					<span>{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}</span>
				</div>
				<h3>{{ data.act_title[lang]}}</h3>
				<hr>
				<div class="news-page">
					<img v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" />
					<p v-html="data.act_content[lang]">
					</p>
				</div>
			</div>
		</div>
		<div class="space"></div>
	</section>
</template>
  
<script>
import { mapActions } from 'vuex'
import NewsDetail from 'src/mixins/Common/News/NewsDetail'

export default {
	mixins: [NewsDetail]
}
</script>
  
<style scoped>
.space {
	margin-top: 60px;
}
.news-content iframe {
	width: 100%;
	height: 100%;
}
</style>

<style lang="stylus" scoped>
.inside
	word-wrap break-word
	word-break normal
	display block
</style>
