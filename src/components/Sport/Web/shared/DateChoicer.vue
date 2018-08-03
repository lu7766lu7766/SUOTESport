<template>
	<div class="panel-heading" id="game-heading">
		<ul class="nav nav-tabs">
			<li :class="{active: startTime == ''}" @click="onDateChange('')">
				<a>{{$t('all')}}</a>
			</li>
			<li v-for="i in [0, 1, 2, 3, 4, 5, 6]" :class="{active: startTime == getAddDayTime(i)}" @click="onDateChange(getAddDayTime(i))">
				<a>{{$moment().AddDay(i).Format( $t('dateFormat') )}}</a>
			</li>
		</ul>
	</div>
</template>

<script>
import SportIndex from 'src/mixins/Sport/SportIndex'
export default {
	name: 'date-choicer',
	mixins: [SportIndex],
	props: {
		startTime: {
			required: true
		}
	},
	methods: {
		onDateChange(time) {
			this.$emit('change', time)
		}
	}
}
</script>

<style lang="stylus" scoped>
#game-heading li
	cursor pointer
</style>
