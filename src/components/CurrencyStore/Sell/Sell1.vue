<template>
	<section>
		<div class="trade"></div>
		<div class="row">
			<div class="col-lg-12">
				<div class="form-group">
					<label class="col-md-2 col-md-offset-1 control-label">銀行帳號</label>
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

				<div class="form-group">
					<label for="price" class="col-md-2 col-md-offset-1 control-label required">遊戲幣</label>
					<div class="col-md-7">
						<select class="form-control2" v-model="cType">
							<option v-for="(data, type) in cProduct" :value="type">{{ data.point }}</option>
							<option value="custom">自訂</option>
						</select>
						<input class="form-control2" type="text" v-model.number="customPoint" v-show="cType == 'custom'" style="margin-top:10px" />
						<p class="input-info">
							<i class="fa fa-exclamation-circle" aria-hidden="true"></i> 遊戲幣值 NT1元 = 1遊戲幣
						</p>
						<p class="text-danger">
							<i class="fa fa-exclamation-circle" aria-hidden="true"></i> 為了保障客戶使用權益, 防範詐騙行為, 交易平台將會聯絡遊戲網站, 審核點數來源是否正常, 通過審核後託售訂單即成立, 請您耐心等侯, 謝謝
						</p>
					</div>
				</div>

				<div class="space20"></div>
			</div>
		</div>
		<a class="btn submit_btn next-step" @click="onSubmit" :disabled="isSubmit">下一步</a>
	</section>
</template>

<script>
import { mapActions } from 'vuex'
import { PaymentType } from 'src/store/module/payment'
import Bank from 'src/mixins/Platform/Bank'
import MemberLevel from 'src/mixins/Common/MemberLevel'
export default {
	mixins: [Bank, MemberLevel],
	data: () => ({
		cType: '',
		cBank: {},
		bankAccounts: [],
		isSubmit: false,
		customPoint: 0
	}),
	methods: {
		...mapActions(['postTreasureSell']),
		async onSubmit() {
			if (this.isSubmit) return
			if (!this.cBank.p91_blt_guid) {
				this.$swal('查無銀帳號，請重新提交審核')
				return
			}
			var point = this.cType == 'custom' ? this.customPoint : this.cStore.p78_pfc_point_data[this.cType].point
			if (point == 0) {
				this.$swal('出售金額須大於0')
				return
			}
			if (point > this.surplus) {
				this.$swal('持有金額不足')
				return
			}
			if (
				this.hasMemberLevel &&
				(point > this.memberLevel.p99_mll_sell_max || point < this.memberLevel.p99_mll_sell_min)
			) {
				this.$swal(
					`會員交易金額需介於${this.memberLevel.p99_mll_sell_min}~${this.memberLevel.p99_mll_sell_max}`
				)
				return
			}

			this.isSubmit = true
			var res = await this.postTreasureSell({
				pfc_guid: this.$route.params.pfc_guid,
				point_type: this.cType,
				point,
				member_blt_id: this.cBank.p91_blt_id
			})
			if (res.code === 0) {
				// this.$swal('託售成功')
				this.$store.commit(PaymentType.SetResult, res.data)
				this.$router.push({ name: 'currency-store-sell2' })
			} else {
				let repMsg = ''
				switch (res.code) {
					case 770048:
						repMsg = '提領單 - 會員提領額度限制'
						break
					case 770049:
						repMsg = '來源或目的的操作代碼未定義'
						break
					case 770050:
						repMsg = '設定錢包點數錯誤'
						break
					case 770051:
						repMsg = '尚有訂單處理中'
						break
					case 775001:
						repMsg = '儲值單 - 餘額寶只能和主錢包互轉'
						break
					case 777001:
						repMsg = '站內信 - 傳送錯誤'
						break
					default:
						repMsg = '託售失敗'
						break
				}
				this.isSubmit = false
				this.$swal(repMsg)
			}
		},
		initCType() {
			if (this.cProduct) {
				this.cType = Object.keys(this.cProduct)[0]
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
		this.initCType()
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
