<template>
	<component :is="!isMobile? 'web':'mobile'" />
</template>

<script>
export default {
	components: {
		Web: require('@/Interface/Backup/Web'),
		Mobile: require('@/Interface/Backup/Mobile')
	},
	computed: {
		isMobile() {
			return this.$store.state.Info.isMobile
		}
	},
	created() {
		this.$store.commit('setDataInit')
	}
}
</script>

<style lang="stylus" scoped>
.side-box1
	position fixed
</style>
