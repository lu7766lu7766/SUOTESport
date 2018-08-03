<template>
	<section>
		<div class="title">
			<h2>最新公告</h2>
		</div>
		<div class="content">
			<div class="font-back">
				<router-link :to="{ name: 'sin-mobile-news' }">
					<span class="icon-list2"></span> 回列表
				</router-link>
			</div>
			<div class="inside" v-if="data.act_title">
				<h3>{{ data.act_title[lang]}}</h3>
				<hr>
				<img v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" />

				<span class="news-content" v-html="data.act_content[lang]">
				</span>
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
