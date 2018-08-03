import InterfaceConf from 'src/config/InterfaceConf'
var branchSource = location.hostname
	.split('.')
	.splice(-2)
	.join('.')
var env = require('src/../env')
var envTxt = env.toFormal ? 'formal' : 'test'
module.exports = {
	branchSource,
	fileHost: `//${branchSource}`,
	apiHost: `${env.host[envTxt].api.postfix}/`,
	paymentHost: `//${env.devTitle}.${InterfaceConf.Host.Payment}:${location.port}`,
	webSocketHost: env.host[envTxt].websocket
}
