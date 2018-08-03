<template>
	<section>
		<div class="trade"></div>
		<div class="row">
			<div class="col-lg-12">
				<div class="form-group">
					<label class="col-md-2 col-md-offset-1 control-label">銀行帳戶</label>
					<div class="col-md-7">
						<select class="form-control2" v-model="cBank" v-if="hasPassBank">
							<option v-for="account in myPassBanks" :value="account">
								{{ account.p91_blt_name }} {{ account.p91_blt_code }}-{{ account.p91_blt_number }}
							</option>
						</select>
						<select class="form-control2" v-else>
							<option>查無銀行帳戶</option>
						</select>
					</div>
				</div>

				<div class="space20"></div>
			</div>
		</div>
		<a class="btn submit_btn next-step" @click="submitToStep3" :disabled="isSubmit">下一步</a>
	</section>
</template>

<script>
import { mapActions } from 'vuex'
import { PaymentType } from 'src/store/module/payment'
import Bank from 'src/mixins/Platform/Bank'

export default {
	mixins: [Bank],
	data: () => ({
		cBank: {},
		bankAccounts: [],
		isSubmit: false,
		customPoint: 0,
		bankData: {}
	}),
	methods: {
		...mapActions(['postSavePointByBank', 'getBank']),
		async submitToStep3() {
			if (this.isSubmit) return
			if (!this.cBank.p91_blt_guid) {
				this.$swal('查無銀帳號，請重新提交審核')
				return
			}
			var point = this.$route.query.p

			this.isSubmit = true
			var res = await this.postSavePointByBank({
				pfc_guid: this.bankData[0].p78_pfc_guid,
				point,
				payment_method: 'BANK_CARD',
				payment_type: 'BANK_CARD',
				member_blt_id: this.cBank.p91_blt_id
			})
			if (res.code === 0) {
				this.$store.commit(PaymentType.SetPaymentBank, res.data.order.payment_flow.p78_pfi_info)

				this.$router.push({
					name: 'currency-store-special-account'
				})
			} else {
				this.$swal(res.message)
			}
		}
	},
	computed: {
		cStore() {
			return this.$store.state.Payment.store
		},
		userInfo() {
			return this.$store.state.Login.userInfo
		},
		accountID() {
			return this.userInfo && this.userInfo.account ? this.userInfo.account.p33_ant_id : ''
		},
		surplus() {
			return this.userInfo && this.userInfo.surplus ? this.userInfo.surplus : 0
		},
		cProduct() {
			var res = {}
			_.forEach(this.cStore.p78_pfc_point_data, (data, type) => {
				if (
					this.hasMemberLevel &&
					data.point >= this.memberLevel.p99_mll_sell_min &&
					data.point <= this.memberLevel.p99_mll_sell_max
				) {
					res[type] = data
				} else if (!this.hasMemberLevel) {
					res = this.cStore.p78_pfc_point_data
				}
			})
			return res
		}
	},
	watch: {
		cStore(newVal) {
			this.initCType()
		}
	},
	async created() {
		this.bankData = (await this.getBank()).data
		await this.getMyBank()
		if (this.hasPassBank) {
			this.cBank = this.myPassBanks[0]
		}
	}
}
</script>

<style lang="stylus" scoped>
.btn.submit_btn[disabled]
	background #dcdcdc
	color #a7a7a7
	cursor no-drop

.form-control2
	padding 3px 30px 3px 12px
</style>
