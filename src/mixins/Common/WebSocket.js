import WebSocketTools from 'lib/WebSocketTools'

export default {
  data: () => ({
    webSocket: new WebSocketTools()
  }),
  methods: {
    webSocketConnect() {
      this.webSocket.connect(this.webSocketToken)
    },
    webSocketClose() {
      this.webSocket.close()
    }
  },
  computed: {
    webSocketToken() {
      return this.$store.state.Login.webSocketToken
    }
  }
}