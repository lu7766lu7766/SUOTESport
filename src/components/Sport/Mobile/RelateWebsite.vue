<template>
  <section>
    <div class="page_title">
      <a class="back" @click="$router.go(-1)"></a>
      <span>{{ $t('relateWebsite') }}</span>
    </div>
    <div class="main-container-bg">
      <div class="container">
        <div id="page-wrapper" style="margin-left: 0px; min-height: 288px;">

          <!-- /.row -->
          <div class="row">

            <div class="col-lg-12">
              <div class="member_content">
                <section v-for="item in relateList.getAllCategory" v-if="webList(item).length > 0">
                  <div class="link_title">{{item.p103_srwe_category[lang]}}</div>
                  <ul class="link_list">
                    <li v-for="subItem in webList(item)">
                      <div class="link_box">
                        <div class="link_logo">
                          <a :href="subItem.p103_srwd_url" target="_blank">
                            <img :src="getFileSrc(subItem)" alt="">
                          </a>
                        </div>
                        <a :href="subItem.p103_srwd_url" target="_blank">{{subItem.p103_srwd_title[lang]}}</a>
                      </div>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
            <!-- /.col-lg-4 -->

          </div>

        </div>
      </div>
      <!-- container end -->
    </div>
  </section>
</template>

<script>
import RelateWebsite from 'src/mixins/Sport/RelateWebsite'

export default {
	mixins: [RelateWebsite]
}
</script>

<style scoped>

</style>


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

.member_content
  margin-top 40px
</style>