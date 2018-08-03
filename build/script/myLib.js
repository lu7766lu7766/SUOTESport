var path = require('path')

var fs = require('fs')
var request = require('async-request')
var apiConf = require('./apiConf')

request = request.defaults({
  headers: {
    'X-branch-source': apiConf.env.uri
  },
  method: 'POST' // 必須大寫
})

module.exports = {
  // 根目錄
  resolve(dir) {
    return path.join(__dirname, '../..', dir)
  },
  // 取得最後一個陣列(取副檔名用)
  end(arr) {
    return arr[arr.length - 1]
  },
  request
}