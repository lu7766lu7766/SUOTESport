<template>
  <section>
    <div class="banner-qa">
      <div class="row">
        <div class="title">
          <h1>常見問題</h1>
          <span>Q&A</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <div class="page_txtBox">
          <div class="tab_container memberTabs_container">
            <div class="panel with-nav-tabs panel-default">
              <div class="panel-heading">
                <ul class="nav nav-tabs">
                  <li class="active" @click="onCategoryChange('')">
                    <a class="pointer" data-toggle="tab">全部</a>
                  </li>
                  <li v-for="(category, index) in FAQCategorys" @click="onCategoryChange(category.id, category.title)">
                    <a class="pointer" data-toggle="tab">{{ category.title[lang] }}</a>
                  </li>
                </ul>
              </div>
              <div class="panel-body">
                <div class="tab-content">
                  <div class="tab-pane fade in active">
                    <div class="col-sm-12">
                      <div class="tabbable">
                        <div class="tab-content">
                          <div class="tab-pane active" id="home4">
                            <div class="row">
                              <div class="col-sm-12">
                                <div id="accordion" class="accordion-style1 panel-group">
                                  <div class="panel panel-default" v-for="(content, index) in FAQContents">
                                    <div class="panel-heading">
                                      <h4 class="panel-title pointer">
                                        <a class="accordion-toggle" data-parent="#accordion" data-toggle="collapse" @click="collapse('list' + index)">
                                          <i class="icon-angle-down bigger-110" data-icon-show="icon-angle-right" data-icon-hide="icon-angle-down"></i>
                                          <p class="qa-q"><img src="/resource/static/platform-credit/images/qa_q.png" alt="Q" /></p>
                                          <h4 class="qa-q-list">{{ content.title[lang] }}</h4>
                                        </a>
                                      </h4>
                                    </div>
                                    <div :ref="'list' + index" class="panel-collapse qa-page collapse">
                                      <div class="panel-body f01">
                                        <p class="qa-a"><img src="/resource/static/platform-credit/images/qa_a.png" alt="A" /></p>
                                        <div class="qa-content">
                                          <p class="f02">
                                            <span v-html="content.content[lang]"></span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- pager -->
                            <div class="row">
                              <my-pager class="vertical-container" :page="page" :lastPage="lastPage" @change="pageChg" />
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FAQ from 'src/mixins/Platform/FAQ'
export default {
	mixins: [FAQ],
	components: {
		MyPager: require('@/shared/MyPager')
	}
}
</script>

<style lang="stylus" scoped>
.f01
  word-wrap break-word
  word-break normal
  display block
</style>
