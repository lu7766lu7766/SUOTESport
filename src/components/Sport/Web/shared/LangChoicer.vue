<template>
  <el-select v-model="value" @change="setLang(value)">
    <el-option v-for="slang in langs" :key="slang.langcode" :label="slang.content" :value="slang.langcode">
    </el-option>
  </el-select>
</template>

<script>
import mLang from 'src/mixins/Common/Lang'

export default {
	name: 'lang-choicer',
	mixins: [mLang],
	data() {
		return {
			value: ''
		}
	},
	mounted() {
		this.value = this.lang
	}
}
</script>