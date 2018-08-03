<template>
	<div class="input-group">
		<input ref="picker" @focus="canChange ? '' : $event.currentTarget.blur();" type="text" :value="value" :class="className" @input="updateVal($event.target.value)" />
		<span class="input-group-addon" v-if="icon" @click="showPicker">
			<span class="glyphicon glyphicon-calendar"></span>
		</span>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'datepicker'
		},
		className: {
			type: String,
			default: 'form-control'
		},
		icon: {
			type: Boolean,
			default: true
		},
		dateConn: {
			type: String,
			default: '-'
		},
		canChange: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		updateVal(val) {
			this.$emit('input', val)
			// other way this.$emit('change',newVal), parent @change="function (val) { model = val}"
		},
		onChange(val) {
			this.$emit('change', val)
		},
		showPicker() {
			$(this.$refs.picker).datetimepicker('show')
		}
	},
	mounted() {
		require('~/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js')
		require('~/jquery-datetimepicker/build/jquery.datetimepicker.min.css')
		let option = {
			theme: 'dark',
			closeOnDateSelect: true,
			onChangeDateTime: function(dp, $input) {
				this.updateVal($input.val())
				if (this.value != $input.val()) {
					this.onChange($input.val())
				}
			}.bind(this),
			onShow: (dp, $input) => {
				var waitPickerShow = new Promise((resolve, reject) => {
					var timer = setInterval(() => {
						var $picker = $('.xdsoft_datetimepicker:visible')
						if ($picker.length) {
							resolve($picker)
							clearInterval(timer)
						}
					}, 1)
				})
				waitPickerShow.then($picker => {
					// 不用雙反向包起來不知為，何判斷會失效
					if (!!(parseInt($picker.css('left')) < 0)) {
						$picker.css({ left: 0 })
					}
				})
			}
		}

		if (this.type == 'datetimepicker') {
			option['format'] = `Y${this.dateConn}m${this.dateConn}d H:i`
		} else if (this.type == 'datepicker') {
			option['timepicker'] = false
			option['format'] = `Y${this.dateConn}m${this.dateConn}d`
		} else if (this.type == 'timepicker') {
			option['datepicker'] = false
			option['format'] = 'H:i'
		}

		$.datetimepicker.setLocale('zh-TW')
		this.$nextTick(() => {
			$(this.$refs.picker).datetimepicker(option)
		})
	}
}
</script>
