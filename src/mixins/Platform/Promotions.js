import { mapActions } from 'vuex'

export default {
	data: () => ({
		page: 1,
		total: 0,
		perPage: 20, // default:20, max:50
		datas: [],
		promotion: {},
		remark: ''
	}),
	methods: {
		...mapActions(['getPromotions', 'getPromotionTotal', 'joinPromotions', 'getPromotionDetail']),

		getReqData() {
			return {
				perpage: this.perPage,
				page: this.page
			}
		},
		async myGetPromotions() {
			let res = await this.getPromotions(this.getReqData())
			if (res.code === 0) {
				this.datas = res.data
			}
		},
		async myGetPromotionTotal() {
			let res = await this.getPromotionTotal(this.getReqData())
			if (res.code === 0) {
				this.total = res.data
			}
		},
		async onGetPromotionAndPager() {
			await this.axios.all([this.myGetPromotions(), this.myGetPromotionTotal()])
		},

		async onGetPromotionDetail() {
			let res = await this.getPromotionDetail({ id: this.nID })
			if (res.code === 0) {
				this.promotion = res.data
			}
		},
		showPromotionModal() {
			if (this.promotion.participate_status === 0) {
				$('#promotionModal').modal('show')
			}
		},
		async onJoinPromotions() {
			$('#promotionModal').modal('hide')
			let res = await this.joinPromotions({ id: this.nID, remark: this.remark })
			if (res.code === 0) {
				this.$bus.emit('show.alert', { content: '參加成功' })
				this.$router.go(-1)
			} else {
				this.$bus.emit('show.alert', { content: '參加失敗' })
			}
		},

		pageChg(page) {
			this.page = page
			this.myGetPromotions()
		}
	},
	computed: {
		nID() {
			return this.$route.params.nID
		},
		lastPage() {
			return Math.ceil(this.total / this.perPage)
		},
		isLogin() {
			return this.$store.state.Login.isLogin
		},
		canJoin() {
			var now = this.$moment().GetTime()
			return (
				this.isLogin &&
				now >= this.promotion.start &&
				now <= this.promotion.end &&
				this.promotion.verify_type === 'manual' &&
				this.promotion.effective_time > 0
			)
		},
		btnName() {
			switch (this.promotion.participate_status) {
				case 0:
					return '參加活動'
					break
				case 1:
					return '請您耐心等候審核'
					break
				case 2:
					return '您參加的次數已達上限'
					break
			}
		}
	}
}
