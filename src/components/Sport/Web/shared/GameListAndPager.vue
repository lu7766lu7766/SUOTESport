<template>
	<section style="width:100%;">
		<div class="alliance-group" v-if="setsPagerModel && setsPagerModel.total">
			<game-list-sport :sets="setsPagerModel.data" />

			<my-pager :total="setsPagerModel.total" :lastPage="setsPagerModel.last_page" :page="page" @change="pageChg" />

			<!--{{page}}-->
		</div>
		<div v-else class="alliance-group">
			<div class="g_list-box">
				<div class="norace">
					{{ $t('noEvent') }}
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		page: {
			type: Number,
			required: true
		},
		setsPagerModel: {
			type: Object,
			required: true
		}
	},
	components: {
		MyPager: require('@/shared/MyPager'),
		GameListSport: require('@/Sport/Web/shared/GameListSport')
	},
	methods: {
		pageChg(page) {
			this.$emit('pageChg', page)
		}
	}
}
</script>

<style scoped>
.no_padding {
	padding: 0;
	margin: 0;
}
</style>