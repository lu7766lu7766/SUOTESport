import store from 'src/store'
// import router from 'src/router/index'
import { LoginType } from 'src/store/module/login'
import RouteConf from 'src/config/RouteConf'
import axios from 'axios'

class WebSocketTools {

  websocket = null
  token = ''
  timer = null

  tryConnectTimes = 3
  tryTimes = 0

  connectFailTimes = 0
  connectFailMaxTimes = 5

  codeConf = {
    "254401": "doNotthing",
    "254402": "doNotthing", // token error, can use this code to test
    "254403": "doNotthing",
    "254499": "logout"
  }

  connect(token) {
    if (!token) return
    if (!this.timer) clearInterval(this.timer)
    this.token = token

    new Promise((resolve, reject) => {
      if (config.webSocketHost) {
        resolve(config.webSocketHost)
      } else {
        axios.get('/resource/config.json').then(res => {
          if (res.status == 200) {
            resolve(res.data.webSocketHost)
          }
        })
      }
    }).then(wsServer => {
      var websocket = new WebSocket(wsServer + '?token=' + this.token)
      this.websocket = websocket
      this.websocket.self = this // for reConnect
      // console.log(this.websocket)
      if (!this.websocket) return
      this.websocket.self = this
      this.websocket.onopen = this.onOpen
      this.websocket.onclose = this.onClose
      this.websocket.onmessage = this.onMessage
      this.websocket.onerror = this.onError
    })
  }

  close() {
    if (!this.websocket) return
    return this.websocket.close()
  }

  onOpen(e) {
    /*
    CONNECTING  0   The connection is not yet open.
    OPEN    1   The connection is open and ready to communicate.
    CLOSING 2   The connection is in the process of closing.
    CLOSED  3   The connection is closed or couldn't be opened.
    */
    this.self.tryTimes = 0
    this.self.timer = setInterval(() => {
      this.send('live')
    }, 10 * 1000)
    // this == WebSocket
    console.log('WebSocket Connected: ' + this.readyState)
    // this.websocket.send('Hello WebSockets!')
  }

  onClose(e) {
    clearInterval(this.self.timer)
    this.self.connectFailTimes++
    console.log('WebSocket Closed: ' + this.self.connectFailTimes)
    // console.log(e)
    // this.self.reConnect()
  }

  onMessage(e) {
    try {
      var res = JSON.parse(e.data)
      var func = this.self.codeConf[res.code]
      if (func && func != 'doNotthing') {
        this.self[func]()
      } else {
        this.self.reConnect()
      }
    } catch (err) {
      console.log('WebSocket Message: ' + e.data)
    }
  }

  onError(e) {
    console.log('WebSocket Error: ')
    // console.log(e)
    this.self.reConnect()
  }

  reConnect() {
    if (store.state.Login.isLogin && this.token && this.tryTimes < this.tryConnectTimes && this.connectFailTimes < this.connectFailMaxTimes) {
      this.tryTimes++
      this.connect(this.token)
    } else {
      this.tryTimes = 0
    }
  }

  async logout() {
    var res = await store.dispatch(LoginType.LOGOUT)
    if (res) {
      location.href = location.origin + RouteConf.$platformHost()
      // router.push(RouteConf.$platformHost())
    }
  }
}

export { WebSocketTools as default }