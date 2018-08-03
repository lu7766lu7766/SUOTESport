import Vue from 'vue'
import SpyConf from 'src/config/SpyConf'

class SpyFactory {
	static createObj(code) {
		// return new code()
		switch (code) {
			case 'spread':
				return new spread()
				break
			case 'total':
				return new total()
				break
			case 'capot':
				return new capot()
				break
			case 'oddeven':
				return new oddeven()
				break
			case 'advantage':
				return new advantage()
				break
			case 'tie':
				return new tie()
				break
			default:
				return new SpyObj()
				break
		}
	}
}

class SpyObj {
	name = 'sourceSpyObj'
	hasHandicapList = [SpyConf.SPREAD, SpyConf.TOTAL, SpyConf.ADVANTAGE] // 讓分，大小，一輸二贏，有盤口
	hasPKList = [SpyConf.SPREAD] // // 讓分，需檢查狀態是否是pk，PK即雙方盤口皆為0，要隱藏投注目標
	notShowTeamNameList = [SpyConf.TIE, SpyConf.TOTAL, SpyConf.ODDEVEN] // 和局，大小，單雙，不顯示隊伍名稱
	hasToTransTeamNameList = ['over', 'under', 'odd', 'even'] // stmNameTrans 需要轉換隊伍名稱
	hasNoMasterSlaveList = [SpyConf.ODDEVEN, SpyConf.TOTAL] // 沒有主客隊的玩法
	hasToTransHandicapList = [SpyConf.ADVANTAGE] // //一輸二贏的盤口要顯示一輸

	master_txt = this.$t('master') + ':'
	customer_txt = this.$t('slave') + ':'

	set data(data) {
		_.forEach(data, (val, key) => {
			this[key] = _.cloneDeep(val)
		})
		if (this.stmList) {
			this.masterStmCode = this.stmList[0] // 主隊
		}
		this.setMiddle()
	}

	get percent() {
		var without = _.without(_.map(this.spos, 'percent'), 0)
		return this.spos ? (without.length ? without[0] : 0) : this.percent_txt
	}
	set percent(val) {
		this.percent_txt = val
	}
	get fraction() {
		var without = _.without(_.map(this.spos, 'fraction'), 0)
		return this.spos ? (without.length ? without[0] : 0) : this.fraction_txt
	}
	set fraction(val) {
		this.fraction_txt = val
	}

	get middle() {
		return `<br/>`
	}
	set middle(val) {
		this.middle_txt = val
	}

	constructor() {
		// if (new.target === SpyObj) {
		//   throw new TypeError("Cannot construct Abstract instances directly")
		// }
	}

	isShowTeamName() {
		return this.notShowTeamNameList.indexOf(this.name) == -1
	}

	isHasMasterSlave() {
		return this.hasNoMasterSlaveList.indexOf(this.name) == -1
	}

	isNeedCheckPK() {
		return this.hasPKList.indexOf(this.name) > -1
	}

	isShowHandicap() {
		return this.hasHandicapList.indexOf(this.name) > -1
	}

	// isPK () { // 目前似乎沒在使用
	//   return this.isNeedCheckPK() && this.fraction == 0 && this.percent == 0
	// }

	$t(code) {
		return Vue.i18n.translate(code)
	}

	getHandicap() {
		return ''
	}

	setMiddle() { } // must be overwrite
	setMiddleHandicap() {
		this.middle = ' ' + this.getHandicap() + ' '
	}
	setMiddlenormal() {
		this.middle = ' V.S '
	}

	getBetListTitle() {
		let a_res = []
		let stmList = this.isSoccer ? this.stmList : this.stmList.reverse()
		_.forEach(stmList, (stm_code, index) => {
			var score = this.vs_score ? `(${this.vs_score[stm_code]})` : ''
			var handicap = '',
				handicapTxt = `<span class="c-handicap">(${this.middle_txt})</span>`
			if (this.name == 'total') {
				if (index == 0) {
					handicap = handicapTxt
				}
			} else {
				if (stm_code == this.handicapStmCode) {
					handicap = handicapTxt
				}
			}
			a_res.push(score + this.showMasterTxt(stm_code) + this.$t(stm_code) + handicap)
		})
		return a_res.join(this.middle)
	}

	getHandicapSpoName() {
		if (this.name == 'total') {
			return 'over'
		} else if (this.isShowHandicap()) {
			return this.handicapStmCode
		}
	}

	showMasterTxt(stm_code) {
		return stm_code == this.masterStmCode ? this.master_txt : this.customer_txt
	}

	/**
	 * 足球盤口顯示
	 */
	getSocrHandicap() {
		switch (this.percent) {
			case 50:
				return `${this.fraction - 0.5}/${this.fraction}`
				break
			case 0:
				return this.fraction + ''
				break
			case -50:
				return `${this.fraction}/${this.fraction + 0.5}`
				break
			case -100:
				return `${this.fraction + 0.5}`
				break
			default:
				return this.getNormalHandicap()
				break
		}
	}
	/**
	 * 一般盤口顯示
	 */
	getNormalHandicap() {
		return '' + this.fraction + (this.percent > -1 ? '+' : '') + this.percent
	}
}

class spread extends SpyObj {
	// "讓分"
	name = SpyConf.SPREAD
	setMiddle() {
		this.setMiddleHandicap()
	}
	getHandicap() {
		if (this.isSoccer) {
			return this.getSocrHandicap()
		} else if (this.fraction === 0 && this.percent === 0) {
			return 'PK'
		} else {
			return this.getNormalHandicap()
		}
	}
}

class total extends SpyObj {
	// "大小"
	name = SpyConf.TOTAL
	setMiddle() {
		this.setMiddleHandicap()
	}
	getHandicap() {
		return this.isSoccer ? this.getSocrHandicap() : this.getNormalHandicap()
	}
}

class capot extends SpyObj {
	// "獨贏"
	name = SpyConf.CAPOT
	setMiddle() {
		this.setMiddlenormal()
	}
}

class oddeven extends SpyObj {
	// "單雙"
	name = SpyConf.ODDEVEN
	setMiddle() {
		this.setMiddlenormal()
	}
}

class advantage extends SpyObj {
	// "一輸二贏"
	name = SpyConf.ADVANTAGE
	setMiddle() {
		this.middle = ' ' + this.$t('runLine') + ' '
	}
	getHandicap() {
		return this.$t('runLine')
	}
}

class tie extends SpyObj {
	// "和局"
	name = SpyConf.TIE
	setMiddle() {
		this.setMiddlenormal()
	}
}

export { SpyFactory as default }
