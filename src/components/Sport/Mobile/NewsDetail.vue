<template>
	<section>
		<div class="page_title">
			<span>{{ $t('news') }}</span>
		</div>
		<main class="page-container news">
			<div class="container">

				<div class="listab sabrosus list_web">
					<ul>

						<li class="">
							<router-link style="width: 150px;" :to="{ name: 'sport-mobile-news' }">{{ $t('back') }}</router-link>
						</li>

					</ul>
					<div class="clear"></div>
				</div>
				<!-- listab -->
				<div class="row" v-if="data.act_title">
					<div class="col-md-10 col-md-offset-1">

						<div class="eventbox2">
							<span class="event-icon bg1" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</span>

							<div class="date">{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}</div>
							<div class="event-title" v-html="data.act_title[lang]"></div>

							<div class="event-content">
								<img v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" style="width: 100%" />
								<div v-html="data.act_content[lang]"></div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</main>

	</section>
</template>

<script>
import NewsDetail from 'src/mixins/Common/News/NewsDetail'

export default {
	name: 'news',
	mixins: [NewsDetail],
	mounted() {
		this.$bus.emit('show.footer')
		this.$dataTick(async () => {
			await this.getContents()
		})
	}
}
</script>
