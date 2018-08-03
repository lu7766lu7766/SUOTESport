<template>
	<section>
		<input v-if="isFocus" ref="number" :class="classNames" type="number" pattern="\d*" :value="value" @input="$emit('input', $event.target.value)" @blur="isFocus = false" @change="onChange" />
		<input v-else ref="text" type="text" :class="classNames" :value="display" @click="isFocus = true" @focus="$event.target.blur()" />
	</section>
</template>

<script>
export default {
	data: () => ({
		classNames: [],
		isFocus: false
	}),
	props: {
		value: {
			type: Number,
			required: true
		},
		percent: {
			type: Number,
			default: 0
		},
		event: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		isFocus(val) {
			this.$nextTick(() => {
				val ? this.$refs.number.select() : this.$refs.text.focus()
			})
		}
	},
	computed: {
		display() {
			return this.$currency(this.value, this.percent)
		}
	},
	methods: {
		onChange(e) {
			if (this.event) {
				this.$emit('change', e)
			} else {
				this.$emit('change')
			}
		}
	},
	mounted() {
		this.classNames = this.$el.className.split(' ')
		this.$el.className = ''
	}
}
</script>
