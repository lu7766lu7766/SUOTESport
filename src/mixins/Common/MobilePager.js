export default {
	methods: {
		async onScrollBottom(f, item = this, $container = $(document)) {
			if (item.page < item.lastPage) {
				item.page++
				var scrollTop = $container.scrollTop()
				await f()
				this.$nextTick(() => {
					$container.scrollTop(scrollTop)
				})
			}
		}
	}
}
