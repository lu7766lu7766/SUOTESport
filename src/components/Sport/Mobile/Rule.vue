<template>
  <section>
    <div class="page_title">
      <a class="back" @click="$router.go(-1)"></a>
      <span>{{ $t('rules') }}</span>
    </div>
    <main class="page-container memberinfo">
      <div class="container search">
        <div class="row">
          <div class="col-xs-6">
            <div class="form-group">
              <select name="ors_to_attr_type" class="form-control2" v-model="rulesItem">
                <option v-for="data in ruleList" :value="data">{{ data.p102_sre_category[lang] }}</option>
              </select>
            </div>
          </div>
          <div class="col-xs-6" v-if="rulesItem">
            <select name="ors_to_attr_type" class="form-control2" v-model="sub">
              <option v-for="item in rulesItem.get_rule_play_mode" :value="item">{{ item.p102_srpm_title[lang] }}</option>
            </select>
          </div>
        </div>
        <div class="row" v-if="sub">
          <div class="col-lg-12">
            <div class="panel panel-default">
              <div class="panel-heading">
                {{title}}
              </div>
              <div class="panel-body">
                <div style="overflow: scroll;" v-html="content"></div>
              </div>
              <!-- /.panel-body -->
            </div>
            <!-- /.panel -->
          </div>
          <!-- /.col-lg-4 -->
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import mLang from 'src/mixins/Common/Lang'
import mixins from 'src/mixins'
import { mapActions } from 'vuex'

export default {
	mixins: [mLang, mixins],
	data: () => ({
		ruleList: [],
		rulesItem: {},
		sub: false,
		subItem: false,
		val: false
	}),
	methods: {
		...mapActions(['getRules']),
		async rulesInit() {
			let res = await this.getRules()
			if (res.code === 0) {
				this.ruleList = res.data
				this.rulesItem = this.ruleList[0]
				this.sub = this.ruleList[0].get_rule_play_mode[0]
			}
		}
	},
	computed: {
		title() {
			return this.sub.p102_srpm_title ? this.sub.p102_srpm_title[this.lang] : ''
		},
		content() {
			return this.sub.get_rule_content
				? _.find(this.sub.get_rule_content, { p102_src_lang: this.lang }).p102_src_content
				: ''
		}
	},
	mounted() {
		this.rulesInit()
	}
}
</script>

<style lang="stylus" scoped>
.notTitle td
  background #252525
  color #FFFFFF

.notTitle:nth-child(odd) td
  background #252525 !important
  color #FFFFFF

.gamelist
  max-height 200px
  overflow-y auto

.modal-body
  padding-top 0
</style>