// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
// require('dotenv').config()
// var apiHost = process.env.APIHOST || 'http://ibet88.cc' // 'http://bets365.cc' //nelo test http://iph168.com
// var resHost = process.env.RESHOST || 'http://ibet77.cc'
var env = require('../env.json')
var envTxt = env.toFormal ? 'formal' : 'test'
var apiHost = env.host[envTxt].api.protocol + env.host[envTxt].api.uri

module.exports = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/', // 'http://sport.gz.bcebos.com/'
		productionSourceMap: true,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	},
	dev: {
		env: require('./dev.env'),
		port: 8088,
		autoOpenBrowser: true,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			[env.host[envTxt].api.postfix]: {
				target: apiHost,
				changeOrigin: true
				// pathRewrite: { // 把'/api'寫在host上就需要這段了，不然'/api'會重複兩次
				//   '^/api': '/api'
				// }
			}
			// '/resource': {
			// 	target: resHost,
			// 	changeOrigin: true
			// }
		},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false
	}
}
