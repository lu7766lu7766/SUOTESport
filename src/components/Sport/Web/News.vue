<template>
	<section style="width:100%">
		<div class="AD_box">
			<a><img src="/resource/static/sport/images/ad/ad.jpg" class="img-responsive"></a>
		</div>
		<div class="BO_box">
			<h1 class="sports-news">{{ $t('news') }}</h1>
			<div class="member_s_box clearfix">
				<ul class="n_item">
					<li :class="{active: tag.atg_guid == currentTagGuid}" v-for="tag in sportNewsTags" @click="tagChange(tag.atg_guid)">
						<a class="pointer">{{ tag['atg_name'][lang]}}</a>
					</li>
				</ul>

				<div class="member_content">
					<div class="panel-group-new" id="accordion">
						<div class="panel panel-news " v-for="(data, i) in datas">
							<div class="panel-heading">
								<h4 class="panel-title">
									<a data-toggle="collapse" class="pointer" @click="collapse('collapse' + i)">
										<span class="date">{{ $moment(data.act_display_start).Format('Y-m-d H:i')}}</span>
										<!-- <span class="tag">{{ getTagNameByGuid(data.act_atg_guid) }}</span>   -->
										{{ data['act_title'][lang]}}
									</a>
								</h4>
							</div>
							<div :ref="'collapse'+i" class="panel-collapse collapse" :class="{ 'in': $route.query.id == data.act_id }">
								<img v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" style="max-width: 100%" />
								<div class="panel-body news-panel-body" v-html="data['act_content'][lang].replace(/\n/g, '<br>')"></div>
							</div>
						</div>
					</div>
				</div>

				<my-pager :total="total" :lastPage="lastPage" :page="page" @change="pageChg" />
			</div>
		</div>
	</section>
</template>

<script>
import News from 'src/mixins/Common/News/News'
import { mapActions } from 'vuex'
export default {
	mixins: [News],
	data: () => ({
		currentTagGuid: ''
	}),
	methods: {
		...mapActions(['getNewsContent']),
		tagChange(guid) {
			if (guid && this.currentTagGuid != guid) {
				this.page = 1
				this.currentTagGuid = guid
				this.getContents()
			} else {
				this.$bus.emit('show.alert', {
					content: this.$t('noResult')
				})
			}
		},
		async getContents() {
			// category不用送，有要控制好運彩分類下會出現的tags即可
			var res = await this.getNewsContent({
				page: (this.page - 1) * this.perPage,
				perPage: this.perPage,
				tag: this.currentTagGuid,
				bch_guid: [this.bchGuid],
				act_bulletin: 1
			})
			if (res.code === 0) {
				this.datas = res.data.data
				this.total = res.data.totalRecord
			}
		}
	},
	computed: {
		sportNewsTags() {
			return _.filter(this.newsTags, tag => {
				return this.newsCategorys.length ? this.newsCategorys[0].acy_atg_guid.indexOf(tag.atg_guid) > -1 : false
			})
		}
	},
	mounted() {
		this.$dataTick(() => {
			this.tagChange(this.$route.query.tag || (this.sportNewsTags.length ? this.sportNewsTags[0].atg_guid : ''))
		})
	}
}
</script>

<style lang="stylus">
.news-panel-body span
	display inline-block
</style>
