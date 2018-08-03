var merge = require('webpack-merge')

var baseConfig = require('./index.base')
var devConfig = require('./index.dev')
var devMobileConfig = require('./index.dev.mobile')
var prodConfig = require('./index.prod')
// iphone safari 手機版debug模式
var isDevMobile = (location.hostname.indexOf('192.168') > -1 || location.hostname.indexOf('.local') > -1) && baseConfig.isMobile

// 手機類型
var u = navigator.userAgent
var mobileType = {
	isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
	isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

/**
 * process.env.NODE_ENV 代表環境 
 * production 為打包出去, development 為本地測試
 */
var config = merge(
	mobileType,
	baseConfig,
	process.env.NODE_ENV === 'production' ? prodConfig : !isDevMobile ? devConfig : devMobileConfig,
	{
		env: process.env.NODE_ENV
	}
)

module.exports = config
