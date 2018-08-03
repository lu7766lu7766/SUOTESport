<template>
  <div class="page-container member">
    <div class="container">
      <div class="row-no-padding memberbox">
        <div class="col-md-3 flex1 meber-left">
          <div class="faq-top">常見問題</div>
          <div class="faq-menu">
            <ul>
              <li :class="{ active: cCategoryID == '' }" class="pointer" @click="onCategoryChange('')">
                <a>全部</a>
              </li>
              <li v-for="category in FAQCategorys" :class="{ active: cCategoryID == category.id }" class="pointer" @click="onCategoryChange(category.id)">
                <a>{{ category.title[lang] }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9 flex2">
          <form class="col-md-10 col-md-offset-1 form-horizontal member_form">
            <div class="member_title clearfix">
              <span v-if="cCategoryID != ''">{{ FAQTitle[lang] }}</span>
              <span v-else>全部</span>
            </div>
            <div id="qaContent">
              <ul class="accordionPart">
                <li v-for="content in FAQContents">
                  <div class="qa_title pointer">{{ content.title[lang] }}</div>
                  <div class="qa_content" style="display: block;">
                    <span v-html="content.content[lang]"></span>
                  </div>
                </li>
              </ul>
            </div>
          </form>
          <my-pager :page="page" :lastPage="lastPage" @change="pageChg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FAQ from 'src/mixins/Platform/FAQ'
export default {
	mixins: [FAQ],
	components: {
		MyPager: require('@/Platform/Cash/Web/shared/MyPager')
	},
	methods: {
		jqInit() {
			$('#qaContent ul')
				.addClass('accordionPart')
				.find('li div:nth-child(1)')
				.hover(
					function() {
						$(this).addClass('qa_title_on')
					},
					function() {
						$(this).removeClass('qa_title_on')
					}
				)
				.off('click')
				.on('click', function() {
					var $qa_content = $(this).next('div.qa_content')
					if (!$qa_content.is(':visible')) {
						$('#qaContent ul li div.qa_content:visible').slideUp()
					}
					$qa_content.slideToggle()
				})
				.siblings()
				.hide()
		}
	},
	watch: {
		FAQContents() {
			this.$nextTick(this.jqInit)
		}
	}
}
</script>