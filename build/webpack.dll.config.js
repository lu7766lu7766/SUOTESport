const path = require('path')
const webpack = require('webpack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

var resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
	// 你想要打包的模块的数组
	entry: {
		vendor: [
			'vue',
			'vuex',
			'vue-router',
			'axios',
			'lodash',
			'store',
			'vuex-i18n',
			'vuex-router-sync',
			'vue-head',
			'vue-rx',
			'rxjs/Observable',
			'rxjs/Subscription',
			'vue-axios',
			'vue-bus',
			'vue2-toast',
			'sweetalert2',
			'mathjs',
			'moment',
			'babel-polyfill',
			'ifvisible.js',
			'jquery',
			resolve('src/assets/scripts/object-traverse.min.js'),
			resolve('src/assets/scripts/object-to-formdata.min.js')
			//
			// './static/script/core.min.js',
			// './static/script/base64.js',
			// './static/script/math.min.js',
			// './static/script/moment.min.js',
			// './static/script/video.min.js',
			// './static/script/videojs-flash.min.js',
			// './static/script/videojs-contrib-hls.min.js'
		],
		jquery: [
			// css
			'sweetalert2/dist/sweetalert2.min.css',
			'vue2-toast/lib/toast.css',
			'bootstrap-select/dist/css/bootstrap-select.min.css',
			resolve('static/style/jquery.slidey.min.css'),
			// bootstrap plugin, jquery plugin',
			'webpack-jquery-ui/dialog',
			resolve('static/script/jquery.fancybox.pack.js'),
			resolve('static/script/jquery.dotdotdot.min.js'),
			resolve('static/script/jquery.slidey.js'),
			'bootstrap',
			'bootstrap/dist/js/bootstrap.min.js',
			'bootstrap-select',
			'jquery-datetimepicker/build/jquery.datetimepicker.full.min.js',
			'jquery-datetimepicker/build/jquery.datetimepicker.min.css'
		],
		langs: [
			resolve('static/codes/en.json'),
			resolve('static/codes/zh_CN.json'),
			resolve('static/codes/zh_TW.json')
		],
		// unminify: [
		// 	'vue2-hammer'
		// ]
	},
	output: {
		path: path.join(__dirname, '../static/script'), // 打包后文件输出的位置
		filename: '[name].dll.js',
		library: '[name]_library'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, '.', '[name]-manifest.json'),
			name: '[name]_library',
			context: __dirname
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery'
		}),
		// 压缩打包的文件
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// })
		new ParallelUglifyPlugin({
			uglifyJS: {}
		})
	]
}
