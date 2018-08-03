<template>
  <section>
    <div class="title">
      <h2>站內訊息</h2>
    </div>
    <div class="content">
      <div class="member-content">
        <div class="delete_box_all">
          <ul>
            <li>
              <input class="styled-checkbox" id="check-all" type="checkbox" v-model="isAllChecked">
              <label for="check-all">全選</label>
            </li>
            <li>
              <a class="delete-bt" @click="onDelMessages()">刪除</a>
            </li>
          </ul>
        </div>
        <div id="accordion" class="accordion-style1 panel-group" v-if="datas.length">
          <div class="panel panel-default" v-for="(data, index) in datas" :key="index">
            <div class="panel-heading">
              <div class="delete_box" v-if="data.nrs_is_read">
                <input class="styled-checkbox" :id="'checkbox'+index" type="checkbox" v-model="data.isChecked">
                <label :for="'checkbox'+index"></label>
              </div>
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
                <img style="max-width:100%" v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" /> {{ data.nct_content[lang] }}
              </div>
            </div>

          </div>
        </div>
        <div class="no-events" v-else>無站內訊息</div>

        <!-- my pager start -->
        <!-- <my-pager :total="total" :lastPage="lastPage" :page="page" @change="pageChg" /> -->
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
#accordion .panel-heading a:before {
	content: '';
}
</style>