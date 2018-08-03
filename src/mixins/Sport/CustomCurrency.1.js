import SportIndex from 'src/mixins/Sport/SportIndex'
import { LoginType } from 'src/store/module/login'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'currency-setting',
	mixins: [SportIndex],
	data() {
		return {
			maxLength: 5,
			datas: [],
			editData: {}
		}
	},
	methods: {
		...mapActions(['setChips']),
		checkEditData() {
			if (
				this.editData.p33_amc_name &&
				this.editData.p33_amc_name != '' &&
				this.editData.p33_amc_denomination &&
				this.editData.p33_amc_denomination != ''
			) {
				return true
			}
			this.$bus.emit('show.alert', {
				type: 'mainten',
				content: this.$t('alert.nameAndMoneyCantBeEmpty')
			})
			return false
		},
		addChips() {
			if (this.checkEditData()) {
				this.editData.index = this.datas.length
				this.datas.push(_.cloneDeep(this.editData))
				this.editData = {}
			}
		},
		editChips(data) {
			this.editData = _.cloneDeep(data)
		},
		storeChips() {
			if (this.checkEditData()) {
				this.datas[this.editData.index] = this.editData
				this.datas[this.editData.index].isDirty = true
				this.editData = {}
			}
		},
		delChips(data) {
			this.datas.splice(this.datas.indexOf(data), 1)
		},
		async submit() {
			let transData = { chips: [] }
			_.forEach(this.datas, data => {
				transData.chips.push({
					p33_amc_denomination: data.p33_amc_denomination,
					p33_amc_name: data.p33_amc_name,
					p33_amc_show: 1
				})
			})
			const res = await this.setChips(transData)

			if (res.data) {
				_.forEach(this.datas, data => {
					data.isDirty = false
				})
				this.$store.commit(LoginType.setCurrencys, _.cloneDeep(this.datas))
				this.$bus.emit('show.alert', {
					type: 'mainten',
					content: this.$t('alert.updateSucc')
				})
			} else {
				this.$bus.emit('show.alert', {
					type: 'mainten',
					content: this.$t('alert.updateFail')
				})
			}
		},
		initData() {
			this.datas = _.cloneDeep(this.$store.state.Login.currencys)
			_.forEach(this.datas, data => {
				data.isDirty = false
			})
		}
	},
	computed: {
		...mapState({
			currencys: state => state.Login.currencys
		})
	},
	created() {
		if (!this.currencys.length) {
			this.$watchAsObservable('currencys').subscribe(x => {
				this.initData()
			})
		} else {
			this.initData()
		}
	},
	beforeDestroy() {
		let canLeave = true
		_.forEach(this.datas, data => {
			if (data.isDirty) {
				canLeave = false
				return false
			}
		})
		if (!canLeave) {
			var res = confirm(this.$t('confirm.changeNotSubmit'))
			if (res) {
				this.submit()
			}
		}
		return false
	}
}
