export default {
	props: {
		page: {
			type: Number,
			required: true
		},
		lastPage: {
			type: Number,
			required: true
		}
	},
	computed: {
		minPage() {
			return Math.floor(this.page / (this.showPages + 1)) * this.showPages + 1
		},
		pages() {
			let maxPage
			maxPage = this.minPage + this.showPages - 1
			maxPage = maxPage > this.lastPage ? this.lastPage : maxPage

			return _.range(this.minPage, maxPage + 1)
		}
	},
	methods: {
		pageChg(page) {
			this.$emit('change', page)
		}
	}
}
