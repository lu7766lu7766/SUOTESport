const SLASH = '/'
const PLATFORM_CASH = 'platform-cash'
const PLATFORM_CASH_MOBILE = 'platform-cash-mobile'
const PLATFORM_CREDIT = 'platform-credit'
const PLATFORM_CREDIT_MOBILE = 'platform-credit-mobile'
const PLATFORM_SIN = 'platform-sin'
const PLATFORM_SIN_MOBILE = 'platform-sin-mobile'
const SPORT = 'sport'
const SPORT_MOBILE = 'sport-mobile'
const CURRENCY_STORE = 'currency-store'
const INTERFACE = 'interface'
const PLATFORM_PENDING = 'pending'

const { isMobile } = config
const mobileCode = isMobile ? '_MOBILE' : ''

import store from 'src/store'

class RouteConf {
	// 系統更新中
	static PLATFORM_PENDING = PLATFORM_PENDING
	static sPLATFORM_PENDING = SLASH + PLATFORM_PENDING

	// 現金平台
	static PLATFORM_CASH = PLATFORM_CASH
	static sPLATFORM_CASH = SLASH + PLATFORM_CASH

	// 現金手機平台
	static PLATFORM_CASH_MOBILE = PLATFORM_CASH_MOBILE
	static sPLATFORM_CASH_MOBILE = SLASH + PLATFORM_CASH_MOBILE

	// 信用平台
	static PLATFORM_CREDIT = PLATFORM_CREDIT
	static sPLATFORM_CREDIT = SLASH + PLATFORM_CREDIT

	// 信用手機平台
	static PLATFORM_CREDIT_MOBILE = PLATFORM_CREDIT_MOBILE
	static sPLATFORM_CREDIT_MOBILE = SLASH + PLATFORM_CREDIT_MOBILE

	// 聚鑫平台
	static PLATFORM_SIN = PLATFORM_SIN
	static sPLATFORM_SIN = SLASH + PLATFORM_SIN

	// 聚鑫手機平台
	static PLATFORM_SIN_MOBILE = PLATFORM_SIN_MOBILE
	static sPLATFORM_SIN_MOBILE = SLASH + PLATFORM_SIN_MOBILE

	// 運彩
	static SPORT = SPORT
	static sSPORT = SLASH + SPORT

	// 運彩手機
	static SPORT_MOBILE = SPORT_MOBILE
	static sSPORT_MOBILE = SLASH + SPORT_MOBILE

	// 小專案
	static INTERFACE = INTERFACE
	static sINTERFACE = SLASH + INTERFACE

	// 幣商平台
	static CURRENCY_STORE = CURRENCY_STORE
	static sCURRENCY_STORE = SLASH + CURRENCY_STORE

	/** 平台版型  */
	static platformSwitch = {
		TEST: RouteConf.sPLATFORM_CASH,
		TEST_MOBILE: RouteConf.sPLATFORM_CASH_MOBILE,
		CASH: RouteConf.sPLATFORM_CASH,
		CASH_MOBILE: RouteConf.sPLATFORM_CASH_MOBILE,
		CREDIT: RouteConf.sPLATFORM_CREDIT,
		CREDIT_MOBILE: RouteConf.sPLATFORM_CREDIT_MOBILE,
		SIN: RouteConf.sPLATFORM_SIN,
		SIN_MOBILE: RouteConf.sPLATFORM_SIN_MOBILE,
		PENDING: RouteConf.sPLATFORM_PENDING,
		PENDING_MOBILE: RouteConf.sPLATFORM_PENDING
	}

	/** 運彩版型  */
	static sportSwitch = {
		SPORT: RouteConf.sSPORT,
		SPORT_MOBILE: RouteConf.sSPORT_MOBILE
	}

	/** 幣商版型  */
	static currencyStoreSwitch = {
		CURRENCY_STORE: RouteConf.sCURRENCY_STORE
	}

	/**
	 * 版型代碼
	 * ps.要polling完才會有
	 * export
	 */
	static tmeCode() {
		const branch = store.state.Login.branch
		if (branch && branch.p41_theme) {
			return branch.p41_theme.p41_tme_code
		}
		return 'PENDING'
	}

	/**
	 * 用版型代碼取得正確的route
	 * @param {*版型代碼} tme_code
	 */
	static tmeCode2Path(tme_code) {
		return RouteConf.platformSwitch[tme_code + mobileCode]
	}

	/**
	 * 取得平台route
	 * export
	 */
	static $platformHost() {
		return RouteConf.tmeCode2Path(RouteConf.tmeCode())
	}

	/**
	 * 目前沒有設計多版型，因此寫死
	 * @param {*版型代碼} sport_code
	 */
	static sportCode() { return 'SPORT' }
	static sportCode2Path(sport_code) {
		return RouteConf.sportSwitch[sport_code + mobileCode]
	}

	/**
	 * 取得球板route
	 * export
	 */
	static $sportHost() {
		return RouteConf.sportCode2Path(RouteConf.sportCode())
	}

	/**
	 * 幣商版型
	 * @param {*版型代碼} currency_store_code
	 */
	static currencyStoreCode() { return 'CURRENCY_STORE' }
	static currencyStoreCode2Path(currency_store_code) {
		return RouteConf.currencyStoreSwitch[currency_store_code]
	}

	/**
	 * 幣商route
	 * export
	 */
	static $currencyStoreHost() {
		return RouteConf.currencyStoreCode2Path(RouteConf.currencyStoreCode())
	}
}
export { RouteConf as default }



