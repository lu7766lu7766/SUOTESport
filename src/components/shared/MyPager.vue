<template>
  <div class="page-nation" v-if="lastPage>1">
    <ul class="pagination pagination-large">
      <li @click="pageChg(1)">
        <a>«</a>
      </li>
      <li v-if="minPage >= showPages" @click="pageChg(minPage - showPages)">
        <a>...</a>
      </li>
      <li :class="{active: page==p}" v-for="p in pages" @click="pageChg(p)">
        <a>{{p}}</a>
      </li>
      <li v-if="lastPage >= (minPage + showPages)" @click="pageChg(minPage + showPages)">
        <a>...</a>
      </li>
      <li @click="pageChg(lastPage)">
        <a>»</a>
      </li>
    </ul>
    <!--total:{{total}} - value:{{value}} - lastPage:{{lastPage}}-->
  </div>
</template>

<script>
import Paginate from 'src/mixins/Common/Paginate'
export default {
	mixins: [Paginate],
	data: () => ({
		showPages: 3
	}),
	computed: {
		isMobile() {
			return this.$store.state.Info.isMobile
		}
	},
	mounted() {
		this.showPages = this.isMobile ? 5 : 10
	}
}
</script>

<style lang="stylus" scoped>
li
  cursor pointer
</style>
