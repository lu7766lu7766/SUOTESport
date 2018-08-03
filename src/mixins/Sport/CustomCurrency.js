import { mapState, mapActions } from 'vuex'
import { LoginType } from 'src/store/module/login'

export default {
	data: () => ({
		currencyTemp: [
			{ value: 10, name: '10', src: '/resource/static/sport/images/chips/chip-01.png' },
			{ value: 50, name: '50', src: '/resource/static/sport/images/chips/chip-02.png' },
			{ value: 100, name: '100', src: '/resource/static/sport/images/chips/chip-03.png' },
			{ value: 500, name: '500', src: '/resource/static/sport/images/chips/chip-04.png' },
			{ value: 1000, name: '1k', src: '/resource/static/sport/images/chips/chip-05.png' },
			{ value: 5000, name: '5k', src: '/resource/static/sport/images/chips/chip-06.png' },
			{ value: 10000, name: '10k', src: '/resource/static/sport/images/chips/chip-07.png' },
			{ value: 50000, name: '50k', src: '/resource/static/sport/images/chips/chip-08.png' },
			{ value: 100000, name: '100k', src: '/resource/static/sport/images/chips/chip-09.png' },
			{ value: 200000, name: '200k', src: '/resource/static/sport/images/chips/chip-10.png' },
		],
		datas: [],
		currencyMax: 5
	}),
	methods: {
		...mapActions(['setChips']),
		dataTrans2Store() {
			return _.reduce(this.datas, (result, data, index) => {
				result.push({
					index,
					isExists: true,
					p33_amc_denomination: data.value,
					p33_amc_name: data.name
				})
				return result
			}, [])
		},
		dataTrans2Req() {
			return _.reduce(this.datas, (result, data) => {
				result.push({
					p33_amc_denomination: data.value,
					p33_amc_name: data.name,
					p33_amc_show: 1
				})
				return result
			}, [])
		},
		storeTrans2Data() {
			return _.reduce(this.currencys, (result, oCurrency) => {
				let currency = _.find(this.currencyTemp, { value: oCurrency.p33_amc_denomination })
				if (currency) {
					result.push({
						value: currency.value,
						name: currency.name
					})
				}
				return result
			}, [])
		},
		async submit() {
			const res = await this.setChips({ chips: this.dataTrans2Req() })
			if (res.code === 0 && res.data) {
				this.$store.commit(LoginType.setCurrencys, this.dataTrans2Store())
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
		}
	},
	computed: {
		...mapState({
			currencys: state => state.Login.currencys
		})
	},
	mounted() {
		this.$dataTick(() => {
			this.datas = this.storeTrans2Data()
		})
	}
}
