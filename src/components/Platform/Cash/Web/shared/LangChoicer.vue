<template>
  <select ref='langChoicer' data-width="fit" @change="onChange($event.target.value)"></select>
</template>

<script>
import mLang from 'src/mixins/Common/Lang'

export default {
	name: 'lang-choicer',
	mixins: [mLang],
	methods: {
		onChange(value) {
			this.checkData()
			$(this.$refs.langChoicer).val(value)
			this.setLang(value)
		},
		checkData() {
			if (this.langs.length) {
				var html = ''
				_.forEach(this.langs, lang => {
					html += `<option data-content='${lang.content}' value='${lang.langcode}'>${lang.content}</option>`
				})
				$(this.$refs.langChoicer)
					.html(html)
					.selectpicker('refresh')
			} else {
				setTimeout(this.checkData, 50)
			}
		}
	},
	mounted() {
		this.checkData()
		$(this.$refs.langChoicer).selectpicker()
	}
}
</script>