<template>
  <section>
    <live1 v-for="(source, index) in sources.live1" :key="index" :source="source" :index="index" />
    <live2 v-for="(source, index) in sources.live2" :key="index" :source="source" :index="index" />
    <live3 v-for="(source, index) in sources.live3" :key="index" :source="source" :index="index" />
  </section>
</template>

<script>
export default {
	components: {
		Live1: require('@/Sport/Web/shared/Live1'),
		Live2: require('@/Sport/Web/shared/Live2'),
		Live3: require('@/Sport/Web/shared/Live3')
	},
	data: () => ({
		sources: {
			live1: [],
			live2: [],
			live3: []
		}
	}),
	mounted() {
		this.$bus.on('show.live1', source => {
			this.sources.live1.push(source)
		})
		this.$bus.on('show.live2', source => {
			this.sources.live2.push(source)
		})
		this.$bus.on('show.live3', source => {
			this.sources.live3.push(source)
		})
		this.$bus.on('close.live1', index => {
			this.sources.splice(index, 1)
		})
		this.$bus.on('close.live2', index => {
			this.sources.splice(index, 1)
		})
		this.$bus.on('close.live3', index => {
			this.sources.splice(index, 1)
		})
	},
	destroyed() {
		this.$bus.off('show.live1')
		this.$bus.off('show.live2')
		this.$bus.off('show.live3')
		this.$bus.off('close.live1')
		this.$bus.off('close.live2')
		this.$bus.off('close.live3')
	}
}
</script>
