
import { LoginType } from 'src/store/module/login'
import QueryController from 'assets/scripts/QueryController'
import InterfaceController from 'lib/InterfaceController'
import RouteConf from 'src/config/RouteConf'
import Vue from 'vue'
import store from 'src/store'
import swal from 'sweetalert2'

class RouteController {
  /**
   * 取得輪詢資料
   */
  static async polling() {
    if (!store.state.Login.branch) {
      await QueryController.proccess()
      await store.dispatch(LoginType.POLLING, { req: 'checking' }) // store.dispatch('polling')
    }
  }

  /**
   * 球板進入前必須檢查登入，否則倒回平台
   */
  static async checkLogin(to, from, next) {
    await RouteController.polling()
    const isLogin = !!store.state.Login.isLogin
    if (!isLogin) {
      swal(Vue.i18n.translate('alert.pleaseLogin'))
      console.app('PleaseLogin')
      next({ path: RouteConf.$platformHost() })
    } else {
      next()
    }
  }

  /**
   * 所有頁面進入前需要經過polling確認版型
   */
  static async checkPollingAndRoute(to, from, next) {
    let layout
    const tLayout = to.path
      .split('/')
      .slice(0, 2)
      .join('/') // 因為next完location.pathname不會馬上更新，所以要用to.path來檢查，否則會進入無限循環，因此檢查會跑至少兩次，t => target

    // 小專案預設不經過polling，需要請在專案created自行執行
    const match = await InterfaceController.proccess(to, from, next)
    if (match) return
    await RouteController.polling()
    document.title = store.state.Login.title

    if ([RouteConf.sSPORT, RouteConf.sSPORT_MOBILE].indexOf(tLayout) > -1) {
      // sport
      layout = RouteConf.$sportHost()
    } else if ([RouteConf.sCURRENCY_STORE].indexOf(tLayout) > -1) {
      // 幣商
      layout = RouteConf.$currencyStoreHost()
    } else {
      // platform
      layout = RouteConf.$platformHost()
    }
    if (layout != tLayout) {
      next(layout)
    } else {
      next()
    }
  }
}

export { RouteController as default }