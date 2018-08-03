<template>
  <div class="listab sabrosus list_web" v-if="lastPage>1">
    <ul>
      <li class="disabled pointer" @click="pageChg(1)">
        <a>&nbsp;<img src="/resource/static/platform-cash/images/arrow2.png" /></a>
      </li>
      <li v-if="minPage >= showPages" @click="pageChg(minPage - showPages)">
        <a>...</a>
      </li>
      <li class="pointer" :class="{current: page==p}" v-for="p in pages" @click="pageChg(p)">
        <a>{{p}}</a>
      </li>
      <li v-if="lastPage >= (minPage + showPages)" @click="pageChg(minPage + showPages)">
        <a>...</a>
      </li>
      <li class="pointer" @click="pageChg(lastPage)">
        <a>&nbsp;<img src="/resource/static/platform-cash/images/arrow1.png" /></a>
      </li>
    </ul>
    <div class="clear"></div>
    <!--total:{{total}} - value:{{value}} - lastPage:{{lastPage}}-->
  </div>
</template>

<script>
import Paginate from 'src/mixins/Common/Paginate'
export default {
	mixins: [Paginate],
	data: () => ({
		showPages: 10
	})
}
</script>
