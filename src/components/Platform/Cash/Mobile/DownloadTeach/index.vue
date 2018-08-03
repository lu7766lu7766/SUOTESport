<template>
  <div class="page-container memberlogin">
    <div class="modall" id="login_dialog">
      <component :is="type" />
    </div>
  </div>
</template>
  
<script>
import Download from 'src/mixins/Platform/Download'

export default {
	mixins: [Download],
	components: {
		Platform: require('@/Platform/Cash/Mobile/DownloadTeach/Platform'),
		PHALE: require('@/Platform/Cash/Mobile/DownloadTeach/PHALE'),
		PHAST: require('@/Platform/Cash/Mobile/DownloadTeach/PHAST')
	}
}
</script>