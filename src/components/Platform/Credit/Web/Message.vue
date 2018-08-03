<template>
  <section>
    <div class="banner-news">
      <div class="row">
        <div class="title">
          <h1>站內訊息</h1>
          <span>Message</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="tabbable">
                <div class="tab-content">
                  <div class="tab-pane active" id="home4">
                    <div class="row">
                      <div class="col-lg-12 csr">
                        <div class="col-md-2 csr-area">
                          <div class="col-sm-4">
                            <span class="button-checkbox">
                              <button type="button" class="btn" data-color="primary" @click="isAllChecked = !isAllChecked">
                                <i class="state-icon fa" :class="isAllChecked ? 'fa-check-square-o' : 'fa-square-o'"></i>
                                <i class="glyphicon glyphicon-ok"></i>
                              </button>
                            </span>
                          </div>
                          <div class="col-sm-8">
                            <button class="btn btn-default btn-city" type="button" @click="onDelMessages()">
                              刪除
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-12">
                        <div id="accordion" class="accordion-style1 panel-group" v-if="datas.length">
                          <div class="panel panel-default" v-for="(data, index) in datas" :key="index">
                            <div class="checkbox pull-left cb-message-1" v-if="data.nrs_is_read">
                              <label>
                                <input type="checkbox" class="del-checkbox" v-model="data.isChecked">
                              </label>
                            </div>
                            <div class="panel-heading">
                              <h4 class="panel-title">
                                <span :class="data.nrs_is_read ? 'read1' : 'message1'">
                                  {{ data.nrs_is_read ? '已讀' : '未讀' }}
                                </span>
                                <a class="accordion-toggle pointer" @click="messageToggle(index)">
                                  <i class="icon-angle-down bigger-110" data-icon-show="icon-angle-right" data-icon-hide="icon-angle-down"></i>
                                  <p class="message-date">{{ $moment(data.nct_created_at).Format('Y-m-d H:i:s') }}</p>
                                  <h3>
                                    {{ $t(data.nct_title[lang]) }}
                                  </h3>
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
                                <span class="accordion-toggle">
                                  <i class="icon-angle-down bigger-110" data-icon-show="icon-angle-right" data-icon-hide="icon-angle-down"></i>
                                  <p class="message-date"></p>
                                  <h3>無訊息存在。</h3>
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>

                        <!-- my pager start -->
                        <my-pager class="vertical-container" :total="total" :lastPage="lastPage" :page="page" @change="pageChg" />
                        <!-- my pager end -->

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
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

.del-checkbox
  width auto
</style>
