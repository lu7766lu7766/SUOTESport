<template>
  <div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav navbar-collapse">
      <ul class="nav in" id="side-menu">
        <li v-for="(data, index) in ruleList" v-if="data.p102_sre_category">
          <a v-if="data.get_rule_play_mode.length > 0" @click="collapse('collapse'+ index)" class="pointer">
            {{data.p102_sre_category[lang]}}
          </a>
          <ul :ref="'collapse' + index" v-if="data.get_rule_play_mode" class="nav nav-second-level collapse">
            <li v-for="subItem in data.get_rule_play_mode">
              <a @click="changeContent(subItem)" class="pointer">{{subItem.p102_srpm_title.zh_TW}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- /.sidebar-collapse -->
  </div>
</template>

<script>
import mLang from 'src/mixins/Common/Lang'
import mixins from 'src/mixins'
import { mapActions } from 'vuex'

export default {
	mixins: [mLang, mixins],
	data: () => ({
		ruleList: []
	}),
	methods: {
		...mapActions(['getRules']),
		changeContent(item) {
			this.$bus.$emit('ruleItem', item)
		},
		async rulesInit() {
			let res = await this.getRules()
			if (res.code === 0) {
				this.ruleList = res.data
				await this.changeContent(this.ruleList[0].get_rule_play_mode[0])
				this.collapse('collapse0')
			}
		}
	},
	mounted() {
		this.rulesInit()
	}
}
</script>
