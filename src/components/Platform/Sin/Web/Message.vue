<template>
  <section>
    <div class="pageslide event">
      <div class="container">
        <div class="p-title">
          站內訊息
          <span>MESSAGE</span>
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
          <li>站內訊息</li>
        </ol>
      </div>
    </div>

    <div class="page-container event">
      <div class="container">
        <div class="row">
          <div class="col-md-10 col-md-offset-1">

            <section v-if="datas.length">
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
              <div class="panel-group-new" id="accordion">
                <div class="panel panel-news" v-for="(data, index) in datas" :key="index">
                  <div class="panel-heading">
                    <div class="delete_box" v-if="data.nrs_is_read">
                      <input class="styled-checkbox" :id="'checkbox'+index" type="checkbox" v-model="data.isChecked">
                      <label :for="'checkbox'+index"></label>
                    </div>
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#accordion" href="#collapse1" class="collapsed" aria-expanded="false" @click="messageToggle(index)">
                        <span :class="data.nrs_is_read ? 'tag': 'tagok'">{{ data.nrs_is_read ? '已讀' : '未讀' }}</span>
                        <span class="date">{{ $moment(data.nct_created_at).Format('Y-m-d H:i:s') }}</span>
                        <p>{{ $t(data.nct_title[lang]) }}</p>
                      </a>
                    </h4>
                  </div>
                  <div class="panel-collapse" v-show="data.isShowContent">
                    <div class="panel-body">
                      <img style="max-width:100%" v-if="data.files_name" :src="$fileHost + data.files_folder + '/' + data.files_name" /> {{ data.nct_content[lang] }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- my pager start -->
              <my-pager class="vertical-container listab sabrosus list_web" :lastPage="lastPage" :page="page" @change="pageChg" />
              <!-- my pager end -->
            </section>

            <div class="no-events" v-else>無站內訊息</div>

          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import Message from 'src/mixins/Platform/Message'

export default {
	name: 'credit-message',
	mixins: [Message],
	components: {
		MyPager: require('@/shared/MyPager')
	}
}
</script>

<style lang="stylus" scoped>
.isRead
  color #000
  font-weight 900

.unRead
  color #ff0000
  font-weight 900
</style>
