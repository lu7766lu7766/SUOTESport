(async () => {
  var request = require('./myLib').request
  var apiConf = require('./apiConf')
  var isDev = process.argv.indexOf('-dev') > -1

  var fs = require('fs')
  var deployFile = JSON.parse(fs.readFileSync('deploy.json'))

  var res = await request(apiConf.apiHost + 'commonTools/telegram/storeMessage', {
    data: {
      message: {
        deployVer: deployFile.fileName
      }
    }
  })

  var data,
    machine = isDev ? '測試' : '正式',
    result = (res.statusCode == 200 && (data = JSON.parse(res.body)) && data.code === 0) ? '成功' : '失敗'
  console.log(machine + `版本號${deployFile.fileName}寫入${result}`)

})()