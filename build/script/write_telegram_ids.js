(async () => {
  var request = require('./myLib').request
  var apiConf = require('./apiConf')
  var isDev = process.argv.indexOf('-dev') > -1

  var telegramIDs = [
    '371880515' /** Jac */,
    '396723621' /** Tai */
  ]

  var res = await request(apiConf.apiHost + 'commonTools/telegram/storeMessage', {
    data: {
      message: {
        telegramIDs: JSON.stringify(telegramIDs)
      }
    }
  })

  var data,
    machine = isDev ? '測試' : '正式',
    result = (res.statusCode == 200 && (data = JSON.parse(res.body)) && data.code === 0) ? '成功' : '失敗'
  console.log(machine + `機 telegramIDs ${telegramIDs} 寫入${result}`)

})()