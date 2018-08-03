<template>
  <section>
    <div v-if="advList.length" class="jk-slider">
      <div :id="cId" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators" v-if="isShowIndex">
          <li :data-target="'#' + cId" :data-slide-to="index" :class="{ 'active': index == 0 }" v-for="(item, index) in advList"></li>
        </ol>
        <div class="carousel-inner">
          <div v-for="(item, index) in advList" @click="advLink(item)" class="item pointer" :class="{ 'active': index == 0 } " :style="{ 
            'background-image': item.p84_advertising_basic.files 
              ? `url(${$fileHost}${item.p84_advertising_basic.files.files_folder}/${item.p84_advertising_basic.files.files_name})` 
              : 'url(/resource/static/platform-credit/images/slider-00.png)' 
            } ">
          </div>
        </div>
        <a class="left carousel-control" :href="'#'+ cId" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left "></span>
        </a>
        <a class="right carousel-control" :href="'#'+ cId" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right "></span>
        </a>
      </div>
    </div>
    <div v-else class="jk-slider">
      <div :id="cId" class="carousel slide carousel-fade" data-ride="carousel">
        <ol class="carousel-indicators" v-if="isShowIndex ">
          <li :data-target="'#' + cId" v-for="i in range" :class="{active: i==0 }" :data-slide-to="i"></li>
        </ol>
        <div class="carousel-inner">
          <div v-for="i in range " :class="{active: i==0 }" class="item" :style="{ 'background-image': `url(/resource/static/platform-credit/images/slider-0${i}.png)` }">
          </div>
        </div>
        <a class="left carousel-control" :href="'#'+ cId" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left "></span>
        </a>
        <a class="right carousel-control" :href="'#'+ cId" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right "></span>
        </a>
      </div>
    </div>
  </section>
</template>
  
<script>
import Advertising from 'src/mixins/Platform/News/Advertising'

export default {
	props: {
		cId: {
			type: String,
			default: 'carousel-example'
		},
		isShowIndex: {
			type: Boolean,
			default: true
		},
		interval: {
			type: Number,
			default: 5000
		}
	},
	data: () => ({
		range: _.range(3),
		timer: null
	}),
	mixins: [Advertising],
	mounted() {
		this.timer = setInterval(() => {
			$('.carousel').carousel('next')
		}, this.interval)
	},
	destroyed() {
		clearInterval(this.timer)
	}
}
</script>
