<template>
	<section>
		
		<!-- header end -->
		<div class="main-container-bg">
			<div class="container">
				<div id="page-wrapper" style="min-height: 800px;">
					<!-- /.row -->
					<div class="row">
						<div class="col-lg-12">
							<div class="panel panel-default">
								<div class="panel-heading">
									{{title}}
								</div>
								<div class="panel-body">
									<div class="trouble" v-html="content"></div>
								</div>
								<!-- /.panel-body -->
							</div>
							<!-- /.panel -->
						</div>
						<!-- /.col-lg-4 -->
					</div>
				</div>
			</div>
			<!-- container end -->
		</div>
		<!-- main-container-bg end -->
	</section>
</template>

<script>
import mLang from 'src/mixins/Common/Lang'

export default {
	mixins: [mLang],
	name: '',
	data: () => ({
		ruleItem: {}
	}),
	mounted() {
		this.$bus.$on('ruleItem', $event => {
			this.ruleItem = $event
		})
	},
	computed: {
		title() {
			return this.ruleItem.p102_srpm_title ? this.ruleItem.p102_srpm_title[this.lang] : ''
		},
		content() {
			return this.ruleItem.get_rule_content
				? _.find(this.ruleItem.get_rule_content, { p102_src_lang: this.lang }).p102_src_content
				: ''
		}
	},
	destroyed() {
		this.$bus.off('ruleItem')
	}
}
</script>

<style>
.trouble table {
	margin-left: 0 !important;
}
</style>
