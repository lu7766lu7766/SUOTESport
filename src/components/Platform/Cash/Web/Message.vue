<template>
  <div class="page-container event">

    <div class="container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="delete_box_all">
            <ul>
              <li>
                <input type="checkbox" class="styled-checkbox" id="check-all" v-model="isAllChecked">
                <label for="check-all">全選</label>
              </li>
              <li>
                <a class="delete-bt pointer" @click="onDelMessages()">刪除</a>
              </li>
            </ul>
          </div>
          <div class="panel-group-new" id="accordion" v-if="datas.length">
            <div class="panel panel-news " v-for="(data, index) in datas" :key="index">
              <div class="panel-heading">

                <div class="delete_box" v-if="data.nrs_is_read">
                  <input type="checkbox" class="styled-checkbox" :id="'checkbox' + index" v-model="data.isChecked">
                  <label :for="'checkbox' + index"></label>
                </div>

                <h4 class="panel-title">
                  <a class="collapsed pointer" @click="messageToggle(index)">
                    <span :class="{tagok: !data.nrs_is_read, tag: data.nrs_is_read}">
                      {{ data.nrs_is_read ? '已讀' : '未讀' }}
                    </span>
                    <span class="date">{{ $moment(data.nct_created_at).Format('Y-m-d H:i:s') }}</span>
                    <p>{{ $t(data.nct_title[lang]) }}</p>
                  </a>
                </h4>
              </div>

              <div class="panel-collapse" v-show="data.isShowContent">
                <div class="panel-body">
                  <img style="max-width:100%" v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" /> <br> {{ data.nct_content[lang] }}
                </div>
              </div>
            </div>

          </div>

          <div class="no-events" v-else>無站內訊息</div>
          <my-pager :lastPage="lastPage" :page="page" @change="pageChg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from 'src/mixins/Platform/Message'
export default {
	mixins: [Message],
	components: {
		MyPager: require('@/Platform/Cash/Web/shared/MyPager')
	}
}
</script>