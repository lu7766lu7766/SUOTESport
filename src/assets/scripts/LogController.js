import Vue from 'vue'
import store from 'src/store'
import { b64EncodeUnicode } from 'lib/base64'

/**
 * 版本號
 */
class Version {
  static value = ''
}

class LogController {
  static async override() {
    /** 發佈的版本，local debug不執行 */
    if (process.env.NODE_ENV === 'production') {
      var res = await Vue.callApi('getDeployVersion') || {}
      Version.value = res.message
      this.windowError()
      this.consoleError()
    }
  }

  /**
   * 攔截 throw error
   */
  static windowError() {
    window.onerror = (msg, url, line) => {
      var newUrl = location.href.indexOf(url) > -1 ? location.href : (location.href + ', ' + url)
      this.filterAndSendLog(`url:${newUrl}`, msg, line)
      return true
    }
  }

  /**
   * 攔截 console.error
   */
  static consoleError() {
    var exErr = console.error
    var filterAndSendLog = this.filterAndSendLog
    console.error = function (msg) {
      exErr.apply(this, arguments)
      filterAndSendLog(location.href, msg)
    }
  }

  /**
   * 過濾方法
   * @param {*} url 網址
   * @param {*} msg 錯誤訊息
   * @param {*} line 錯誤行數
   */
  static filterAndSendLog(url, msg, line = '', needFilter = true) {
    // console.log(Version.value)
    if (
      /** 訊息為字串 */
      typeof msg == 'string' &&
      /** 需要過濾 */
      needFilter &&
      /** 內容不存在要排除的關鍵字 */
      !_.filter(Execept.keys, key => msg.indexOf(key) > -1).length &&
      /** 沒送出過 */
      !_.filter(Execept.hadSendMessage, pastMsg => pastMsg == msg).length
    ) {
      var userInfo = store.state.Login.userInfo
      var accountID = userInfo ? userInfo.account ? userInfo.account.p33_ant_account : '' : ''
      var message = ''
      message += 'Time: ' + new Date().Format('Y-m-d H:i:s') + '\n'
      message += 'IP: <ip>' + '\n'
      message += 'Version: ' + Version.value + '\n'
      message += 'URL: ' + url + '\n'
      message += 'Error: ' + msg + '\n'
      message += 'Browser: ' + config.browserVer + '\n'
      message += accountID ? ('AccountID: ' + accountID + '\n') : ''
      // message += line ? ('Line: ' + line + '\n') : ''
      message += '\n'
      // alert(msg)
      /** 送出訊息 */
      Vue.callApi('sendLog', {
        message: b64EncodeUnicode(message)
      })
      /** 儲存記錄，防止重複送出 */
      Execept.hadSendMessage.push(msg)
    }
  }
}

/**
 * 必須要過濾的關鍵字
 */
class Execept {
  static keys = [
    'Do not use built-in or reserved HTML elements as component id',
    '語法錯誤',
    '系統忙碌中',
    '不合法',
    '未指定的錯誤',
    '不足',
    '伺服器',
    'sbl_code',
    'parentNode',
    'vjs_getProperty',
    'getPropertyValue',
    'chunk', // Loading chunk
    'PleaseLogin',
    'Script error',
    'Syntax error',
    'TypeError',
    'getComputedStyle',
    'resizeImages',
    'Unhandled promise rejection',
    'no binaryen method succeeded',
    'VIDEOJS',
    // api error
    'API error'
    // 盤口變更
    // '400003',
    // '400048',
    // '400053',
    // '400054',
    // '400055',
    // // multiEvent
    // '250001',
    // // do-login
    // '330123'
  ]
  static hadSendMessage = []
}

export { LogController as default }