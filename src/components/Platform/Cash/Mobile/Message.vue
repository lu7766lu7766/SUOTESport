<template>
  <section>
    <div class="reg_title">
      <span>站內訊息</span>
    </div>
    <div class="lobby-container event">
      <div class="container">
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
        <div class="panel-group-new" id="accordion" v-if="datas.length">
          <div class="panel panel-news" v-for="(data, index) in datas" :key="index">
            <div class="panel-heading">

              <div class="delete_box" v-if="data.nrs_is_read">
                <input class="styled-checkbox" type="checkbox" :id="'checkbox' + index" v-model="data.isChecked">
                <label :for="'checkbox' + index"></label>
              </div>

              <h4 class="panel-title">
                <a class="collapsed" @click="messageToggle(index)">
                  <span :class="{tagok: !data.nrs_is_read, tag: data.nrs_is_read}">
                    {{ data.nrs_is_read ? '已讀' : '未讀' }}
                  </span>
                  <span class="date">{{ $moment(data.nct_created_at).Format('Y-m-d H:i:s') }}</span>

                  <p>{{ $t(data.nct_title[lang]) }}</p>
                </a>
              </h4>
            </div>
            <div class="panel-collapse " v-show="data.isShowContent">
              <div class="panel-body">
                <h4>{{ $t(data.nct_title[lang]) }}</h4>
                <img style="max-width:100%" v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" /> <br> {{ data.nct_content[lang] }}
              </div>
            </div>
          </div>
          <!-- <my-pager :total="total" :lastPage="lastPage" :page="page" @change="pageChg" /> -->
        </div>
        <div class="no-events" v-else>無站內訊息</div>
      </div>
    </div>
  </section>

</template>

<script>
import Message from 'src/mixins/Platform/Message'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import MobilePager from 'src/mixins/Common/MobilePager'

export default {
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