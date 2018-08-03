<template>
	<section style="width:100%">
		<div class="AD_box">
			<a><img src="/resource/static/sport/images/ad/ad.jpg" class="img-responsive"></a>
		</div>
		<div class="BO_box">
			<h1 class="sports-info-header_header" style="border-bottom: 1px solid #dec0687a;">{{ $t('myFavorite') }}</h1>
			<div class="selectbox">
				<ul style="float: right; margin-right: 10px;">
					<li>
						<span style="color: rgb(255, 255, 255);" @click="onTimesUp">{{ showSec }}</span>
					</li>
					<li>
						<a href="#" class="myBtn btn btn-pharaoh" @click="onTimesUp" data-toggle="button">{{ $t('refresh') }}
							<i v-if="isEventLoading" class='fa fa-circle-o-notch fa-spin'></i>
						</a>
					</li>
				</ul>
				<div style="clear: both;"></div>
			</div>
			<game-list-and-pager :setsPagerModel="setsPagerModel" :page="page" v-on:pageChg="scroll2TopAndGetSep" />
		</div>
	</section>
</template>

<script>
import Favorites from 'src/mixins/Sport/Favorites'

export default {
	mixins: [Favorites],
	components: {
		GameListAndPager: require('@/Sport/Web/shared/GameListAndPager')
	},
	methods: {
		scroll2TopAndGetSep(page) {
			this.page = page
			this.getFavoriteEvents()
		}
	}
}
</script>