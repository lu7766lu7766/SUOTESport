import InterfaceConf from 'src/config/InterfaceConf'
var branchSource = location.hostname
	.split('.')
	.splice(-2)
	.join('.')
var env = require('src/../env')
var envTxt = env.toFormal ? 'formal' : 'test'
module.exports = {
	branchSource,
	fileHost: `//${location.hostname}`,
	apiHost: `//${location.hostname}${env.host[envTxt].api.postfix}/`,
	paymentHost: `//${InterfaceConf.Host.Payment}`
}
