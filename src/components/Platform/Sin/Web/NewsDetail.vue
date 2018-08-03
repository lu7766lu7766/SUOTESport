<template>
	<section>
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
					<li>
						<router-link :to="{name: 'sin-news'}">最新公告</router-link>
					</li>
				</ol>
			</div>
		</div>

		<div class="page-container event">

			<div class="container">

				<div class="row">
					<div class="col-md-10 col-md-offset-1">

						<div class="eventbox2">
							<div class="date">{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}
								<span class="event-icon bg3" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</span>
							</div>
							<div class="event-title" v-html="data.act_title[lang]"></div>

							<div class="event-content">
								<p><img v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" width="460" height="307" alt="" /></p>
								<span v-html="data['act_content'][lang]"></span>
							</div>
						</div>

					</div>

				</div>

				<div class="listab sabrosus list_web">
					<ul>
						<li class="disabled">
							<a href="#">&nbsp;<img src="/resource/static/platform-sin/images/arrow2.png" /></a>
						</li>
						<li class="">
							<router-link style="width: 150px;" :to="{ name: 'sin-news' }">
								回列表
							</router-link>
						</li>

						<li>
							<a href="#">&nbsp;<img src="/resource/static/platform-sin/images/arrow1.png" /></a>
						</li>
					</ul>
					<div class="clear"></div>
				</div>
				<!-- listab -->
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
