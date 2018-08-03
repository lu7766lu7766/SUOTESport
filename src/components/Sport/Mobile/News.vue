<template>
	<section>
		<div class="page_title">
			<span>{{ $t('news') }}</span>
		</div>
		<main class="page-container news">
			<div class="container">

				<div class="row">
					<div class="col-md-10 col-md-offset-1 newslist">
						<ul>
							<li v-for="(data, i) in datas">
								<router-link class="eventbox" :to="{
                    name: 'sport-mobile-news-detail',
                    params: { nGuid: data.act_guid }
                  }">
									<span class="event-icon bg1" :style="{'background-color': data.atg_color}">{{ getTagNameByGuid(data.act_atg_guid) }}</span>

									<div class="date">{{ $moment(data.act_display_start).Format('Y-m-d H:i') }}</div>
									<div class="event-title" v-html="data['act_title'][lang]"></div>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	</section>
</template>

<script>
import News from 'src/mixins/Platform/News/News-platform'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
	name: 'news',
	mixins: [News, MobilePager],
	mounted() {
		this.$bus.emit('show.footer')
		this.$bus.on('scroll.bottom', () => {
			this.onScrollBottom(
				async () => {
					var datas = _.cloneDeep(this.datas)
					await this.getContents()
					this.datas = _.concat(datas, this.datas)
				},
				this,
				$('main')
			)
		})
	},
	destroyed() {
		this.$bus.off('scroll.bottom')
	}
}
</script>
