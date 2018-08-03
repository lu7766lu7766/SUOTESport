<template>
	<section style="width:100%">
		<div class="AD_box">
			<news-slidey :newsLen.sync="newsLen" />
		</div>
		<!-- AD_box ed -->
		<div class="BO_box">
			<div :style="{ height: 99.33 * newsLen + 'px' }" v-if="isMobile && newsLen"></div>
			<hot-game />
		</div>
	</section>
	<!-- col-md-11 ed -->
</template>

<script>
import mixins from 'src/mixins'
export default {
	mixins: [mixins],
	data: () => ({
		newsLen: 0
	}),
	components: {
		NewsSlidey: require('@/Sport/Web/shared/NewsSlidey'),
		HotGame: require('@/Sport/Web/shared/HotGame')
	}
}
</script>