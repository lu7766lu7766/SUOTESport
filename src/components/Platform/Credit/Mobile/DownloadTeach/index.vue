<template>
  <section>
    <div class="title">
      <h2>App下載說明</h2>
    </div>
    <div class="content">
      <div class="font-back">
        <a @click="$router.go(-2)">
          <span class="icon-reback"></span> 回上頁</a>
      </div>
      <component :is="type" />
    </div>
  </section>

</template>

<script>
import Download from 'src/mixins/Platform/Download'

export default {
	mixins: [Download],
	components: {
		Platform: require('@/Platform/Credit/Mobile/DownloadTeach/Platform'),
		PHALE: require('@/Platform/Credit/Mobile/DownloadTeach/PHALE'),
		PHAST: require('@/Platform/Credit/Mobile/DownloadTeach/PHAST')
	}
}
</script>
