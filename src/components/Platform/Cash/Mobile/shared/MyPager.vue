<template>
  <div class="listab sabrosus list_web" v-if="lastPage>1">
    <ul>
      <li @click="pageChg(1)" :class="{disabled: page == 1}">
        <a href="#">&nbsp;<img src="/resource/static/platform-cash-mobile/images/arrow2.png"></a>
      </li>
      <li v-if="minPage >= showPages" @click="pageChg(minPage - showPages)">
        <a>...</a>
      </li>
      <li :class="{current: page == p}" v-for="p in pages" @click="pageChg(p)">
        <a href="#">{{ p }}</a>
      </li>
      <li v-if="lastPage >= (minPage + showPages)" @click="pageChg(minPage + showPages)">
        <a>...</a>
      </li>
      <li @click="pageChg(lastPage)" :class="{disabled: page == lastPage}">
        <a href="#">&nbsp;<img src="/resource/static/platform-cash-mobile/images/arrow1.png"></a>
      </li>
    </ul>
    <div class="clear"></div>
  </div>
</template>

<script>
import Paginate from 'src/mixins/Common/Paginate'
export default {
	mixins: [Paginate],
	data: () => ({
		showPages: 5
	})
}
</script>

<style lang="stylus" scoped>
.sabrosus img
  height auto !important
</style>
