import { mapActions } from 'vuex'
import BankList from 'src/config/BankList.json'
import FileController from 'lib/FileController';

export default {
	components: {
		MyPager: () => import('@/shared/MyPager')
	},
	data: () => ({
		BankList,
		myBankList: [],
		searchData: {},
		imgId: '',
		uploading: false,
		searchData: {
			p91_blt_code: BankList[0].code
		},
		errorMsg: {}
	}),
	methods: {
		...mapActions(['getBankList', 'postBetBank', 'uploadBankPhoto']),
		async postBankData() {
			if (this.myPassBanks.length >= 5) {
				this.$bus.emit('show.alert', {
					content: '會員銀行帳號設定已經超過五筆'
				})
			} else {
				this.searchData.files_guid = this.imgId
				let res = await this.postBetBank(this.searchData)
				if (res.code === 0 && res.data) {
					this.$bus.emit('show.alert', {
						content: '新增成功'
					})
					this.getMyBank()
					this.errorMsg = {}
					this.searchData = {}
				} else if (res.code === 300006) {
					this.errorMsg = res.text
					this.$bus.emit('show.alert', {
						content: '新增失敗'
					})
				} else {
					this.$bus.emit('show.alert', {
						content: res.text.common
					})
				}
			}
		},
		async onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files

			if (!files.length) {
				return
			}

			var isOverSize = !FileController.checkFileSize({
				file: files[0],
				sizeLimit: 5 * 1024 * 1024, // 5M
			})
			if (isOverSize) {
				this.$bus.emit('show.alert', {
					content: '上傳檔案超過5MB'
				})
				return
			}

			this.uploading = true
			var formData = new FormData(document.getElementById('imgUpload'))

			var res = await this.uploadBankPhoto(formData)
			if (res.code === 0) {
				this.imgId = res.data.files.files_guid
			}
			this.uploading = false
		},
		getBankName(code) {
			let res = _.findIndex(this.BankList, { code: code.toString() })
			return res > -1 ? this.BankList[res].name : ''
		},
		async getMyBank() {
			var res = await this.getBankList()
			if (res.code === 0) {
				this.myBankList = res.data
			}
		}
	},
	computed: {
		myPassBanks() {
			return _.filter(this.myBankList, { p91_blt_status: 3 })
		},
		hasPassBank() {
			return !!this.myPassBanks.length
		}
	}
}
