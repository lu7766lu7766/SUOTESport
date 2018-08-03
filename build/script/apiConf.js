var fs = require('fs')

var env = JSON.parse(fs.readFileSync('env.json'))
var isDev = process.argv.indexOf('-dev') > -1
var envTxt = isDev ? 'formal' : 'test'
var apiHost = env.host[envTxt].api.protocol + env.host[envTxt].api.uri + env.host[envTxt].api.postfix + '/'

module.exports = {
  env: env.host[envTxt].api,
  apiHost
}