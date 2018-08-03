<template>
	<section>
		<div id="content" class="container clearfix">
			<div id="rightContent" class="right-content">

				<div id="wrapper">
					<div class="w-currency">
						<div class="c-line clearfix">
							<div class="cl-wrap c-full">
								<div id="hl-common" class="clearfix" style="display: block;">
									<div class="trade">選擇購買方式</div>
									<div class="form-group">

										<div class="col-md-12 radio-box">
											<label class="radio-inline" v-for="(pType, typeKey) in paymentType" :key="typeKey" v-if="memberLevel.p99_mll_buy_type.indexOf(paymentID[typeKey]) > -1">
												<input type="radio" :value="pType" v-model="cType">{{ $t(pType) }}
												<span v-if="pType == paymentType.WebATM">(讀卡機)</span>
												<div v-else-if="pType == paymentType.ATM" class="pay-imp">帳號效期 : 申請當日(22:00-23:59申請效期至隔日)</div>
												<div v-else-if="pType == paymentType.CVS" class="pay-imp">
													代碼效期 : 申請後2小時
													<router-link :to="{ name: 'currency-store-cvs-pay-step', params: { pfc_guid: $route.params.pfc_guid } }">
														<span class="R2">( 超商繳費步驟) </span>
													</router-link>
												</div>
											</label>
										</div>
									</div>

									<section v-if="cType != paymentType.CVS">
										<div class="trade">選擇銀行</div>
										<div class="form-group">
											<div class="col-md-12 radio-box">
												<select class="form-control2" v-model="cMethod">
													<option v-for="(pMethod, key) in paymentMethod[cType]" :key="key" :value="pMethod">{{ $t(pMethod) }}</option>
												</select>
											</div>
										</div>
									</section>

									<section v-else>
										<div class="trade">選擇超商</div>
										<div class="form-group">
											<section class="cvs-container" v-for="(pMethod, key) in paymentMethod.CVS" :key="key">
												<input type="radio" :id="'radio-' + key" name="radio" :value="pMethod" v-model="cMethod">
												<label :for="'radio-' + key">
													<img v-if="key == 'CVS_IBON'" src="/resource/static/platform-cash/store/images/711-icon.png" alt="">
													<img v-else-if="key == 'CVS_FAMILY'" src="/resource/static/platform-cash/store/images/fm-icon.png" alt="">
													<img v-else-if="key == 'CVS_HILIFE'" src="/resource/static/platform-cash/store/images/hf-icon.png" alt="">
													<img v-else-if="key == 'CVS_OK'" src="/resource/static/platform-cash/store/images/ok-icon.png" alt="">
												</label>
											</section>
										</div>
									</section>

									<div class="radio-box2 alert alert-warning" role="alert">
										為配合超商代收風險控管機制，以及保障店家及消費者的權益，
										<t class="R2">第三方支付平台調整超商代碼繳費限額，單筆金額上限最高「6000」元，敬請多利用ATM及WebATM讀卡機購買點數</t>
									</div>

									<a class="btn submit_btn next-step pointer" @click="onSubmit" :disabled="isSubmit">確 定</a>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import PaymentConf from 'src/config/PaymentConf'
import MemberLevel from 'src/mixins/Common/MemberLevel'
import { mapActions } from 'vuex'
import { PaymentType } from 'src/store/module/payment'
export default {
	mixins: [MemberLevel],
	data: () => ({
		paymentID: PaymentConf.payment_id,
		// paymentType: PaymentConf.payment_type,
		paymentMethod: PaymentConf.payment_method,
		cType: '',
		cMethod: '',
		isSubmit: false
	}),
	watch: {
		cType() {
			this.cMethod = Object.keys(this.paymentMethod[this.cType])[0]
		}
	},
	methods: {
		...mapActions(['postSavePoint']),
		async onSubmit() {
			if (this.isSubmit) return
			var point = this.$route.query.p
			if (this.cType === this.paymentType.CVS && (point < 500 || point > 6000)) {
				this.$swal('超商交易金額需介於500~6000')
				return
			}
			if (
				this.hasMemberLevel &&
				(point > this.memberLevel.p99_mll_buy_max || point < this.memberLevel.p99_mll_buy_min)
			) {
				this.$swal(
					`您可購買的遊戲幣範圍${this.memberLevel.p99_mll_buy_min}~${
						this.memberLevel.p99_mll_buy_max
					}, 如需購買更多的遊戲幣請洽客服。`
				)
				return
			}

			this.isSubmit = true
			var targetWindow =
				[this.paymentType.Credit, this.paymentType.WebATM].indexOf(this.cType) > -1 ? window : null

			var res = await this.postSavePoint({
				point,
				point_type: this.$route.query.t,
				payment_type: this.cType,
				payment_method: this.cMethod,
				pfc_guid: this.$route.params.pfc_guid
			})
			if (res.code === 0) {
				this.$store.commit(PaymentType.SetResult, res.data)
				if (targetWindow) {
					var form = document.createElement('form')
					form.setAttribute('method', 'post')
					// form.setAttribute('target', '_blank')
					form.setAttribute('action', res.data.target)
					if (targetWindow.focus) {
						targetWindow.focus()
					}
					_.forEach(res.data.data, (val, name) => {
						var input = document.createElement('input')
						input.setAttribute('type', 'hidden')
						input.setAttribute('name', name)
						input.setAttribute('value', val)
						form.appendChild(input)
					})
					targetWindow.document.body.appendChild(form)
					targetWindow.document.forms[0].submit()
					/**
					 * 接金流直接關閉視窗，須待post完後
					 */
					// targetWindow.onunload = () => {
					// 	// window.parent.close()
					// 	// window.close()
					// }
					// this.$router.push({ name: 'currency-store-buy1' })
				} else {
					this.$router.push({ name: 'currency-store-buy3' })
				}
			} else {
				if (targetWindow) {
					targetWindow.close()
				}
				this.isSubmit = false
				if ([770044, 770045].indexOf(res.code) > -1) {
					this.$router.push({ name: 'currency-store-overtimes-error' })
				} else {
					this.$swal('購買失敗')
				}
			}
		}
	},
	computed: {
		paymentType() {
			return _.omitBy(PaymentConf.payment_type, (type, key) => {
				return this.$store.state.Info.isMobile && key == PaymentConf.payment_type.WebATM
			})
		}
	},
	created() {
		if (this.memberLevel.p99_mll_buy_type.length) {
			var val = this.memberLevel.p99_mll_buy_type[0]
			this.cType = this.$getKeyByValue(this.paymentID, val)
		}
		this.$bus.emit('show.title', '購買方式')
	}
}
</script>

<style lang="stylus" scoped>
.btn.submit_btn[disabled]
	background #dcdcdc
	color #a7a7a7
	cursor no-drop

.cvs-container
	display inline-block
</style>
