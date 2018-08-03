<template>
  <section>
    <div class="title">
      <h2>站內訊息</h2>
    </div>
    <div class="content">
      <div class="csr">
        <div class="csr-area">
          <div class="csr-check">
            <span class="button-checkbox">
              <a @click="isAllChecked = !isAllChecked">
                <button type="button" class="btn" data-color="primary">
                  <i class="glyphicon glyphicon-ok" :class="isAllChecked? 'red': ''"></i>
                </button>
              </a>
            </span>
          </div>
          <div class="csr-dropdown">
            <div class="dropdown">
              <button class="btn btn-default btn-city dropdown-toggle" type="button" @click="onDelMessages()">
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="member-content">
        <div id="accordion" class="accordion-style1 panel-group" v-if="datas.length">
          <div class="panel panel-default" v-for="(data, index) in datas" :key="index">

            <div class="checkbox pull-left cb-message" v-if="data.nrs_is_read">
              <label>
                <input type="checkbox" v-model="data.isChecked">
              </label>
            </div>

            <div class="panel-heading">
              <h4 class="panel-title">
                <span :class="data.nrs_is_read ? 'read1' : 'message1'">
                  {{ data.nrs_is_read ? '已讀' : '未讀' }}
                </span>
                <a class="accordion-toggle" @click="messageToggle(index)">
                  <i class="icon-angle-down bigger-110" data-icon-show="icon-angle-right" data-icon-hide="icon-angle-down"></i>
                  <p>{{ $moment(data.nct_created_at).Format('Y-m-d H:i:s') }}</p>
                  <h3>{{ $t(data.nct_title[lang]) }}</h3>
                </a>
              </h4>
            </div>

            <div class="panel-collapse" v-show="data.isShowContent">
              <div class="panel-body f01">
                <img style="max-width:100%" v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" /> <br> {{ data.nct_content[lang] }}
              </div>
            </div>
          </div>
        </div>
        <div id="accordion" class="accordion-style1 panel-group" v-else>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <!--<span class="message1">未讀</span>-->
                <a class="accordion-toggle" href="" data-parent="#accordion" data-toggle="collapse">
                  <i class="icon-angle-down bigger-110" data-icon-show="icon-angle-right" data-icon-hide="icon-angle-down"></i>
                  <p></p>
                  <h3>無訊息存在</h3>
                </a>
              </h4>
            </div>
          </div>
        </div>

        <!-- my pager start -->
        <!-- my pager end -->
      </div>
    </div>
  </section>
</template>
  
<script>
import Message from 'src/mixins/Platform/Message'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
	name: 'credit-message',
	mixins: [Message, CheckLogin, MobilePager],
	mounted() {
		this.$bus.on('scroll.bottom', () => {
			this.onScrollBottom(async () => {
				var datas = _.cloneDeep(this.datas)
				await this.getDatas()
				this.datas = _.concat(datas, this.datas)
			})
		})
	},
	destroyed() {
		this.$bus.off('scroll.bottom')
	}
}
</script>
  
<style scoped>
.panel,
.panel:last-child {
	margin: 10px 0 !important;
	background: none;
	box-shadow: none;
	border: 1px solid #b38b12;
}
.panel-body {
	background: none;
	padding: 15px 10px !important;
}
.panel-heading {
	padding: 10px 15px;
}

#accordion .panel-heading a:before {
	content: '';
}
</style>